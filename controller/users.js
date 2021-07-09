const con = require('../db/connection')

exports.getUsers = async (req, res, next) => { 
  let query = "SELECT * from user";

  con.query(query, (err, recods) => {
    if (err) throw err
    console.log('Success getting data from user table: \n', recods)
    if (recods.length === 0) {
      res.send({
        error: 'data not found'
      })
    } else {
      res.send(recods)
    }
  })
}