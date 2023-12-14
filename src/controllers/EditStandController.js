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
        let { name, location, phone, mobilephone, schedule, userid, standid } = request.body || {};
        if(!name || !location || !phone || !mobilephone || !schedule || !userid || !standid) {
            return response.status(400).json({ error: 'All fields are required. It should have name, location, phone, mobilephone, schedule, userid and standid' })
        }

        const usecase = new EditStandUseCase(this.standRepository)
        const stand = await usecase.execute({ name, location, phone, mobilephone, schedule, userid, standid })

        if(stand.error) {
            return response.status(400).json({ error: stand.error.message })
        }

        return response.status(200).json(stand.data)

    }

}

module.exports = EditStandController