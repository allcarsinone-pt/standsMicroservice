const express = require('express')
const router = require('./routes/StandRouter')
const RegisterStandController = require('./controllers/RegisterStandController')
const EditStandController = require('./controllers/EditStandController')
//const LogMockAdapter = require('./adapters/LogMockAdapter')

function makeApp(standRepository
    //, logAdapter = new LogMockAdapter()
    ) {
    const app = express();
    app.use(express.json());
    app.set('RegisterStandController', new RegisterStandController(standRepository));
    app.set('EditStandController', new EditStandController(standRepository));
    app.use('/stands', router);
    return app;
}

module.exports = makeApp