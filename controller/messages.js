const mysql = require('mysql')
const con = require('../db/connection')

const updateReadStatus = (conversationId, receiverId) => {
  const queryDetails = []
  queryDetails.push("messages", "is_read", true, "conversation_id", conversationId, "sender_user_id", receiverId)

  // update read status
  const sql = 'UPDATE ?? SET ?? = ? WHERE (?? = ? AND ?? = ?)'
  const query = mysql.format(sql, queryDetails)

  con.query(query, (err) => {
    if (err) throw err
  })
}

const insertMessage = (conversationId, senderId, message) => {
  const queryDetails = []
  queryDetails.push("messages", "conversation_id", "sender_user_id", "message", "is_read", conversationId, senderId, message, false)
  
  // insert the message
  const sql = 'INSERT INTO ??(??, ??, ??, ??) VALUES (?, ?, ?, ?)'
  const query = mysql.format(sql, queryDetails)

  con.query(query, (err) => {
    if (err) throw err
  })
}

exports.sendMessage = async (req, res) => { 
  const {senderId, receiverId, message} = req.body
  
  const queryDetails = []
  queryDetails.push("conversations", "user_1", senderId, "user_2", receiverId, "user_1", receiverId, "user_2", senderId)

  const sql = "SELECT id from ?? WHERE (?? = ? AND ?? = ?) OR (?? = ? AND ?? = ?)"
  const query = mysql.format(sql, queryDetails)

  con.query(query, (err, records) => {
    if (err) throw err

    var conversationId = records[0]?.id
    if (!!conversationId) {
      try {
        updateReadStatus(conversationId, receiverId)
        insertMessage(conversationId, senderId, message)

        res.status(201).send({message: 'success insert message 1'})
      } catch (error) {
        res.status(500).send({message: 'something wrong', error : error})
      }
    } else {
      const queryDetails = []
      queryDetails.push("conversations", "user_1", "user_2", senderId, receiverId)

      const sql = 'INSERT INTO ?? (??,??) VALUES (?,?)'
      const query = mysql.format(sql, queryDetails)
      
      con.query(query, (err) => {
        if (err) throw err
        try {
          updateReadStatus(conversationId, receiverId)
          insertMessage(conversationId, senderId, message)
          
          res.status(201).send({message: 'success insert message 2'})
        } catch (error) {
          res.status(500).send({message: 'something wrong', error : error})
        }
      })
    }
  })
}

exports.getMessagesByConvId = (req, res) => {
  const { convId } = req.params
  const sql = "SELECT * from messages WHERE conversation_id = ?";
  const query = mysql.format(sql, convId)

  con.query(query, (err, records) => {
    if (err) throw err
    if (records.length === 0) {
      res.status(400).send({error: 'Data not available'})
    } else {
      res.status(200).send(records)
    }
  })
}

exports.getConversationsByUserId = (req, res) => {
  const { userId } = req.params
  const sql = "SELECT c.*, u1.phone_number as phone_1, u2.phone_number as phone_2, MAX(m.send_date) as last_message_time FROM conversations c JOIN users u1 ON u1.id = c.user_1 JOIN users u2 ON u2.id = c.user_2 INNER JOIN messages m ON m.conversation_id = c.id WHERE (c.user_1 = ? OR c.user_2 = ?) GROUP BY c.id";

  const query = mysql.format(sql, [userId, userId, userId])

  con.query(query, (err, records) => {
    if (err) throw err

    if (records.length === 0) {
      res.status(400).send({error: 'Data not available'})
    } else {
      // get conversation id from the records
      const conversationId = records.map(row => row.id)

      const sql = `SELECT * FROM messages WHERE conversation_id IN (?) AND is_read = false`
      const query = mysql.format(sql, [conversationId])

      con.query(query, (err, rows) => {
        if (err) throw err

        for (let i = 0; i < records.length; i++) {
          let unreadCount = 0
          for (let j in rows) {
            if (records[i].id === rows[j].conversation_id) {
              if (userId != rows[j].sender_user_id) {
                unreadCount++
              }
            }
          }
          records[i].unread_count = unreadCount
        }

        if (rows.length === 0) {
          res.status(400).send({error: 'Data not available'})
        } else {
          res.status(200).send(records)
        }
      })
    }
  })
}

exports.readConversation = (req, res) => {
  const { userId } = req.params
  const { conversationId } = req.body

  const sql = "UPDATE messages SET is_read = true WHERE conversation_id = ? AND sender_user_id != ?";
  const queryDetails = []
  queryDetails.push(userId, conversationId)

  const query = mysql.format(sql, queryDetails)

  try {
    con.query(query, (err, records) => {
      if (err) throw err
  
      console.log("records", records)
      
      res.status(200).send({records, message : 'successful update conversation to read'})
    })
  } catch (error) {
    res.status(500).send({message: 'oops something wrong', message: error})
  }
}