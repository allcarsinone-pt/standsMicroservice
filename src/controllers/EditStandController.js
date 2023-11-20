const EditStandUseCase = require('../usecases/EditStandUseCase/EditStand.usecase')

/**
 * @class EditStandController
 * @description Controller of EditStand 
 */

class EditStandController {
    /**
     * @description Constructor of EditStandController
     * @param {*} standRepository a standRepository
     */
    constructor (standRepository) {
        this.standRepository = standRepository
    }

    async execute(request, response) {
        let { name, location, phone, mobilephone, schedule } = request.body || {};
        if(!name || !location || !phone || !mobilephone || !schedule) {
            return response.status(400).json({ error: 'All fields are required' })
        }

        const usecase = new EditStandUseCase(this.standRepository)
        const user = await usecase.execute({ name, location, phone, mobilephone, schedule })

        if(user.error) {
            return response.status(400).json({ error: user.error.message })
        }

        return response.status(201).json(user.data)

    }

}

module.exports = EditStandController