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

    const conversationId = records[0]?.id
    if (!!conversationId) {
      updateReadStatus(conversationId, receiverId)
      insertMessage(conversationId, senderId, message)

      res.status(201).send({message: 'success insert message 1'})
    } else {
      const queryDetails = []
      queryDetails.push("conversations", "user_1", "user_2", senderId, receiverId)

      const sql = 'INSERT INTO ?? (??,??) VALUES (?,?)'
      const query = mysql.format(sql, queryDetails)
      
      con.query(query, (err, records) => {
        if (err) throw err
        const conversationId = records?.insertId

        updateReadStatus(conversationId, receiverId)
        insertMessage(conversationId, senderId, message)

        res.status(201).send({message: 'success insert message 2'})
      })
    }
  })
}

exports.getMessagesByConvId = (req, res) => {
  const { convId } = req.params
  let sql = "SELECT * from messages WHERE conversation_id = ?";
  let query = mysql.format(sql, convId)

  con.query(query, (err, recods) => {
    if (err) throw err
    if (recods.length === 0) {
      res.status(400).send({
        error: 'data not found'
      })
    } else {
      res.status(200).send(recods)
    }
  })
}