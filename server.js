const makeApp = require('./src/appBuilder')
const dotenv = require('dotenv')
const PostgreStandRepository = require('./src/repositories/PostgreStandRepository')
const InMemoryStandRepository = require('./src/repositories/InMemoryStandRepository')

const RabbitMQAdapter = require('./src/adapters/RabbitMQAdapter')
const AxiosAuthServiceAdapter = require('./src/adapters/AxiosAuthServiceAdapter')
const ElasticLogService = require('./src/adapters/ElasticSearchAdapter')
const MockAuthServiceAdapter = require('./src/adapters/MockAuthServiceAdapter')


dotenv.config()

const app = makeApp(new PostgreStandRepository(process.env.DATABASE_URL), 
                    new ElasticLogService(process.env.ELASTIC_URI),
                    new AxiosAuthServiceAdapter(process.env.GATEWAY_URI),
                    new RabbitMQAdapter(process.env.RABBITMQ_URI))


app.listen(process.env.SERVER_PORT || 3000, () => {
  console.log(`Server is running on http://localhost:${process.env.SERVER_PORT || 3000}/`)
})