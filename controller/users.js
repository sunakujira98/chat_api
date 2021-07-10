const con = require('../db/connection')

exports.getUsers = async (res) => { 
  let query = "SELECT * from user";

  con.query(query, (err, recods) => {
    if (err) throw err
    console.log('Success getting data from user table: \n', recods)
    if (recods.length === 0) {
      res.status(400).send({error: 'Data not available'})
    } else {
      res.status(200).send(recods)
    }
  })
}