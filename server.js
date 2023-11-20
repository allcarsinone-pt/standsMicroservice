const makeApp = require('./src/appBuilder')
const dotenv = require('dotenv')
const PostgreStandRepository = require('./src/repositories/PostgreStandRepository')
const InMemoryStandRepository = require('./src/repositories/InMemoryStandRepository')

//const RabbitMQAdapter = require('./src/adapters/RabbitMQAdapter')

dotenv.config()

const app = makeApp(new PostgreStandRepository(process.env.DATABASE_URL)
//, new RabbitMQAdapter(process.env.RABBIT_MQ_URI || 'amqp://localhost:5672')
)


app.listen(process.env.SERVER_PORT || 3000, () => {
  console.log(`Server is running on http://localhost:${process.env.SERVER_PORT || 3000}/`)
})