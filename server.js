const makeApp = require('./src/appBuilder')
//const dotenv = require('dotenv')
const InMemoryStandRepository = require('./src/repositories/InMemoryStandRepository')
//const RabbitMQAdapter = require('./src/adapters/RabbitMQAdapter')

// dotenv.config()

const app = makeApp(new InMemoryStandRepository()
//, new RabbitMQAdapter(process.env.RABBIT_MQ_URI || 'amqp://localhost:5672')
)


app.listen(process.env.SERVER_PORT || 3000, () => {
  console.log(`Server is running on http://localhost:${process.env.SERVER_PORT || 3000}/`)
})