const { expect } = require('chai')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')

chai.should()
chai.use(chaiHttp)

describe('User can list all messages in a conversation between them and another user. GET message/conversation/1', () => {
  it("it should throw error when a user is not a part of the conversation try to access that conversation", (done) => {
    const convId = 1
    const userId = 3

    chai.request(app).get(`/message/conversation/${convId}/${userId}`).end((error, response) => {
      console.log("resposne", response)
      response.should.have.status(400)
      response.body.should.be.a('object')
      response.body.should.be.have.property('error')
      done()
    })
  })
})

describe('User can list all messages in a conversation between them and another user. GET message/conversation/1', () => {
  it("it should necessary response", (done) => {
    const convId = 1
    const userId = 1

    chai.request(app).get(`/message/conversation/${convId}/${userId}`).end((error, response) => {
      console.log("resposne", response)
      response.should.have.status(200)
      response.body.should.be.a('array')
      done()
    })
  })
})

// this test-case required table conversation with user_1 4 and user_2 5 deleted first, also need the required message table that contains this conversation_id to be deleted
describe('User can send a message to another user (new conversation). POST message/', () => {
  it("It should success creating new conversation and new message", (done) => {
    const senderId = 4
    const receiverId = 5
    const message = "hai gan kenalan yuk"

    chai.request(app).post('/message/').set('content-type', 'application/x-www-form-urlencoded').send({
      senderId, receiverId, message
    })
    .end((err, response) => {
      response.should.have.status(201)
      response.body.should.be.a("object")
      response.body.should.be.have.property('message')
      response.body.should.be.have.property('message').eq('success insert message 2')
      done()
    })
  })
})

describe('User can send a message to another user (existing conversation). POST message/', () => {
  it("It should success creating new conversation and new message", (done) => {
    const senderId = 4
    const receiverId = 5
    const message = "gimana gan jadi mau kenalan? kok ga diread :("

    chai.request(app).post('/message/').set('content-type', 'application/x-www-form-urlencoded').send({
      senderId, receiverId, message
    })
    .end((err, response) => {
      response.should.have.status(201)
      response.body.should.be.a("object")
      response.body.should.be.have.property('message')
      response.body.should.be.have.property('message').eq('success insert message 1')
      done()
    })
  })
})

describe('User can list all their conversations (if user A has been chatting with user C & D, the list for A will shows A-C & A-D). GET conversation/user/:userId', () => {
  it("Should list all the conversations", (done) => {
    const userId = 1

    chai.request(app).get(`/conversation/user/${userId}`).end((error, response) => {
      console.log("resposne", response)
      response.should.have.status(200)
      response.body.should.be.a('array')
      done()
    })
  })
})


describe('Update message status to read (based on conversation_id) PUT /conversation/user/:userId', () => {
  it("Should list all the conversations", (done) => {
    const userId = 1
    const conversationId = 2

    chai.request(app).put(`/conversation/user/${userId}`).set('content-type', 'application/x-www-form-urlencoded').send({
      conversationId
    })
    .end((err, response) => {
      response.should.have.status(200)
      response.body.should.be.a("object")
      response.body.should.be.have.property('message')
      response.body.should.be.have.property('message').eq('successful update conversation to read')
      done()
    })
  })
})