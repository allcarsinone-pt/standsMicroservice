const RegisterStandUseCase = require('../usecases/RegisterStandUseCase/RegisterStand.usecase')


/**
 * @class RegisterStandController
 * @description Controller of RegisterStand 
 */

class RegisterStandController {
    /**
     * @description Constructor of RegisterStandController
     * @param {*} standRepository a standRepository
     */
    constructor (standRepository, logService) {
        this.standRepository = standRepository
        this.logService = logService
    }

    async execute(request, response) {

        
        let { name, location, phone, mobilephone, schedule, userid } = request.body || {};
        if(!name || !location || !phone || !mobilephone || !schedule || !userid) {
            await this.logService.execute('StandsService', `All fields are required. It should have name, location, phone, mobilephone, schedule and userid.`, 'error')
            return response.status(400).json({ error: 'All fields are required. It should have name, location, phone, mobilephone, schedule and userid.' })
        }

        const usecase = new RegisterStandUseCase(this.standRepository)
        const stand = await usecase.execute({ name, location, phone, mobilephone, schedule, userid })

        if(stand.error) {
            await this.logService.execute('StandsService',stand.error.message, 'error')
            return response.status(400).json({ error: stand.error.message })
        }

        await this.logService.execute('StandsService', `Stand ${stand.data.name}`, 'success')
        return response.status(201).json(stand.data)

    }

}

module.exports = RegisterStandController