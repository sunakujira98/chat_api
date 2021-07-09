const express = require('express')
const bodyParser = require('body-parser')
const con = require('./db/connection')

console.log("con", con)

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb'
}))

app.use(require('./router'))

con.connect((err, connection) => {
  if (err) throw err;
  console.log('mysql is connected')
})

app.listen(
  5000,
  console.log(
    `Server running on port 5000`
  ),
)
