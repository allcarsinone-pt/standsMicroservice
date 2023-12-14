class MockRabbitMQ {
    
    async sendMessages (standid, queueName = 'deleteVehicles') {
        console.log('Deleted.')
      }
    
}

module.exports = MockRabbitMQ