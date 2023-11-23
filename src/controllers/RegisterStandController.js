const RegisterStandUseCase = require('../usecases/RegisterStandUseCase/RegisterStand.usecase')
//const LogService = require('./services/LogService')


/**
 * @class RegisterStandController
 * @description Controller of RegisterStand 
 */

class RegisterStandController {
    /**
     * @description Constructor of RegisterStandController
     * @param {*} standRepository a standRepository
     */
    constructor (standRepository, //logService
    ) {
        this.standRepository = standRepository
        //this.logService = logService
    }

    async execute(request, response) {
        let { name, location, phone, mobilephone, schedule } = request.body || {};
        if(!name || !location || !phone || !mobilephone || !schedule) {
            //await LogService.execute({from: 'StandsService', data: 'Missing fields', date: new Date(), status: 'error'}, this.logService)
            return response.status(400).json({ error: 'All fields are required. It should have name, location, phone, mobilephone and schedule' })
        }

        const usecase = new RegisterStandUseCase(this.standRepository)
        const stand = await usecase.execute({ name, location, phone, mobilephone, schedule })

        if(stand.error) {
            return response.status(400).json({ error: stand.error.message })
        }

        return response.status(201).json(stand.data)

    }

}

module.exports = RegisterStandController