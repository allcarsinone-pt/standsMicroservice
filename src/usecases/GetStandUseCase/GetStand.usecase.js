
//const crypto = require('crypto')
const { Result, handleError } = require('../../util/Result')

class GetStandUseCase {
    /**
     * @description Constructor of RegisterStandUseCase
     * @param {*} standRepository a standRepository
     */
    constructor (standRepository) {
        this.standRepository = standRepository
    }

    /**
     * @param {*} registerStandDto A stand object: name, location, phone, mobilephone, schedule
     * @returns a result with a boolean success property, data property and error property
    */
    async execute(standid) {
        const withErrorHandling = handleError(async () => {
            const standAlreadyExists = await this.standRepository.getStand(standid)
            if (!standAlreadyExists) {
                return Result.failed(new Error('Stand doesn\'t exist'))
            }            
            return Result.success(standAlreadyExists.toJson())
        })
        return withErrorHandling()
    }
}

module.exports = GetStandUseCase