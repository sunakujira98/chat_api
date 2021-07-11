const con = require('../db/connection')

exports.getUsers = async (req, res) => { 
  let query = "SELECT * from users";

  con.query(query, (err, recods) => {
    if (err) throw err
    
    if (recods.length === 0) {
      res.status(400).send({error: 'Data not available'})
    } else {
      res.status(200).send(recods)
    }
  })
}