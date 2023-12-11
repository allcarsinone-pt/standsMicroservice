const express = require('express')
const router = require('./routes/StandRouter')
const RegisterStandController = require('./controllers/RegisterStandController')
const EditStandController = require('./controllers/EditStandController')
const DeleteStandController = require('./controllers/DeleteStandController')
const LogMockAdapter = require('./adapters/LogMockAdapter')
const MockAuthServiceAdapter = require('./adapters/MockAuthServiceAdapter')

function makeApp(standRepository,
    logAdapter = new LogMockAdapter(), authService = new MockAuthServiceAdapter()) {
    const app = express();
    app.use(express.json());
    app.set('RegisterStandController', new RegisterStandController(standRepository, logAdapter));
    app.set('EditStandController', new EditStandController(standRepository));
    app.set('DeleteStandController', new DeleteStandController(standRepository));
    app.set('LogAdapter', logAdapter) // Log adapter: ex: rabbitmq
    app.set('AuthAdapter', authService)
    app.use('/stands', router);
    return app;
}

module.exports = makeApp