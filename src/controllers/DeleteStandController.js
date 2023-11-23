const DeleteStandUseCase = require('../usecases/DeleteStandUseCase/DeleteStand.usecase')

/**
 * @class DeleteStandController
 * @description Controller of DeleteStand 
 */

class DeleteStandController {
    /**
     * @description Constructor of DeleteStandController
     * @param {*} standRepository a standRepository
     */
    constructor (standRepository) {
        this.standRepository = standRepository
    }

    async execute(request, response) {
        let { standid } = request.body || {};
        if(!standid) {
            return response.status(400).json({ error: 'StandID is required' })
        }

        const usecase = new DeleteStandUseCase(this.standRepository)
        const stand = await usecase.execute({ standid })

        if(stand.error) {
            return response.status(400).json({ error: stand.error.message })
        }

        return response.status(201).json({ success: 'Stand deleted!' })

    }

}

module.exports = DeleteStandController