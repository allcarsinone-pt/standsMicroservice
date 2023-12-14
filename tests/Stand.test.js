const makeApp = require('../src/appBuilder')
const Stand = require('../src/entities/Stand')
const PostgreStandRepository = require('../src/repositories/PostgreStandRepository')
const standRepository = new PostgreStandRepository('')
const app = makeApp(standRepository)
const request = require('supertest')(app)

const { GenericContainer, PullPolicy} = require('testcontainers') 


let container = new GenericContainer('postgres', 'latest')
let startedContainer

//jest.setTimeout(999999)

describe('Tests', () => {
  beforeAll(async () => {

    startedContainer = await container.withEnvironment({POSTGRES_USER: 'dss', POSTGRES_PASSWORD: 'dss', POSTGRES_DB: 'stand'}).withCopyFilesToContainer([{source:'src/database/init-database.sql', target:'/docker-entrypoint-initdb.d/init-database.sql'}]).withExposedPorts({host: 5433, container: 5432}).withPullPolicy(PullPolicy.defaultPolicy()).start()
    const port = await startedContainer.getMappedPort(5432)
    const host = await startedContainer.getHost()
    const uri = `postgres://dss:dss@${host}:${port}/stand`
    
    standRepository.baseURI = uri
    
  })
  afterAll(async () => {
    await startedContainer.stop()
  })

  describe('POST /stands/register', () => {

    it('should return 401 if token is not provided', async () => {
      const requestBody = { name: "Stand Barcelos", location: "Fragoso", phone: "961234567", mobilephone: "250123456", schedule: "1", userid: "1" }
      const response = await request.post('/stands/register').send(requestBody)
      expect(response.status).toBe(401)
      expect(response.body).toHaveProperty('error', 'Missing token')
    
    })
    it('should return 201 if stand is registered', async () => {
      const fake_token = 'Bearer 123456789'
      const requestBody = { name: "Stand Barcelos", location: "Fragoso", phone: "961234567", mobilephone: "250123456", schedule: "1", userid: "1" }
      const response = await request.post('/stands/register').send(requestBody).set('Authorization', fake_token)
      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('name', requestBody.name)
      expect(response.body).toHaveProperty('location', requestBody.location)
      expect(response.body).toHaveProperty('phone', requestBody.phone)
      expect(response.body).toHaveProperty('mobilephone', requestBody.mobilephone)
      expect(response.body).toHaveProperty('schedule', requestBody.schedule)
      expect(response.body).toHaveProperty('userid', requestBody.userid)
    })
    it('should return 400 if stand fields are missing', async () => {
      const fake_token = 'Bearer 123456789'
      const requestBody = { name: "Stand Barcelos", location: "Fragoso", phone: "", mobilephone: "250123456", schedule: "1", userid: "1" }
      const response = await request.post('/stands/register').send(requestBody).set('Authorization', fake_token)
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error', 'All fields are required. It should have name, location, phone, mobilephone, schedule and userid')
      expect(response.body).not.toHaveProperty('phone', requestBody.phone)
    })
  })


  describe('PUT /stands/edit', () => {
    it('should return 401 if token is not provided', async () => {
      const requestBody = { name: "Stand Barcelos", location: "Barcelos", phone: "961234567", mobilephone: "250123456", schedule: "1", userid: "1" }
      const response = await request.put('/stands/edit').send(requestBody)
      expect(response.status).toBe(401)
      expect(response.body).toHaveProperty('error', 'Missing token')
    })
    it('should return 200 if stand edited sucessfully', async () => {
      const fake_token = 'Bearer 123456789'
      const requestBody = { name: "Stand Barcelos", location: "Barcelos", phone: "961234567", mobilephone: "250123456", schedule: "1", userid: "1" }
      const response = await request.put('/stands/edit').send(requestBody).set('Authorization', fake_token)
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('name', requestBody.name)
      expect(response.body).toHaveProperty('location', requestBody.location)
      expect(response.body).toHaveProperty('phone', requestBody.phone)
      expect(response.body).toHaveProperty('mobilephone', requestBody.mobilephone)
      expect(response.body).toHaveProperty('schedule', requestBody.schedule)
      expect(response.body).toHaveProperty('userid', requestBody.userid)
    })
    it('should return 400 if stand fields are missing', async () => {
      const fake_token = 'Bearer 123456789'
      const requestBody = { name: "Stand Barcelos", location: "", phone: "", mobilephone: "", schedule: "", userid: "" }
      const response = await request.put('/stands/edit').send(requestBody).set('Authorization', fake_token)
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error', 'All fields are required. It should have name, location, phone, mobilephone, schedule and userid')
      expect(response.body).not.toHaveProperty('name', requestBody.name)
      expect(response.body).not.toHaveProperty('location', requestBody.location)
      expect(response.body).not.toHaveProperty('phone', requestBody.phone)
      expect(response.body).not.toHaveProperty('mobilephone', requestBody.mobilephone)
      expect(response.body).not.toHaveProperty('schedule', requestBody.schedule)
      expect(response.body).not.toHaveProperty('userid', requestBody.userid)
    })
  })

  describe('DELETE /stands/delete/{id}', () => {
    it('should return 401 if token is not provided', async () => {
      const standid = "1"
      const response = await request.delete(`/stands/delete/${standid}`)
      expect(response.status).toBe(401)
      expect(response.body).toHaveProperty('error', 'Missing token')
    })
    it('should return 204 if stand deleted sucessfully', async () => {
      const fake_token = 'Bearer 123456789'
      const standid = "1" 
      const response = await request.delete(`/stands/delete/${standid}`).set('Authorization', fake_token)
      expect(response.status).toBe(204)
      expect(response.body).toEqual({})
    })
    it('should return 404 if standid is missing', async () => {
      const standid = ""
      const response = await request.delete(`/stands/delete/${standid}`)
      expect(response.status).toBe(404)
      expect(response.body).not.toHaveProperty('standid', standid)
    })
    it('should return 400 if stand doesnt exists', async () => {
      const standid = "25"
      const fake_token = 'Bearer 123456789'
      const response = await request.delete(`/stands/delete/${standid}`).set('Authorization', fake_token)
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error', 'Stand doesnt exists')
    })
  })

})