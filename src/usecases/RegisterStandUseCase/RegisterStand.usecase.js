const Stand = require('../../entities/Stand')
const crypto = require('crypto')
const { Result, handleError } = require('../../util/Result')

class RegisterStandUseCase {
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
    async execute(registerStandDto) {
        const withErrorHandling = handleError(async () => {
            const standAlreadyExists = await this.standRepository.findByName(registerStandDto.name)
            if (standAlreadyExists) {
                return Result.failed(new Error('Stand already exists'))
            }
            
            const id = crypto.randomUUID()
            let stand = Stand.create(registerStandDto.name, registerStandDto.location, registerStandDto.phone, registerStandDto.mobilephone, registerStandDto.schedule, id)
            stand = await this.standRepository.create(stand)
            
            return Result.success(stand.toJson())
        })
        return withErrorHandling()
    }
}

module.exports = RegisterStandUseCase