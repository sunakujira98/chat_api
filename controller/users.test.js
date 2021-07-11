const { expect } = require('chai')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')

chai.should()
chai.use(chaiHttp)

describe('get all users', () => {
  it("should get users data", (done) => {
    chai.request(app).get('/user').end((error, response) => {
      response.should.have.status(200)
      response.body.should.be.a('array')
      done()
    })
  })
})