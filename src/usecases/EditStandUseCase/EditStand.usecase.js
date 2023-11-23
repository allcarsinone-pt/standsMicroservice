const Stand = require('../../entities/Stand')
const { Result, handleError } = require('../../util/Result')

class EditStandUseCase {
    constructor (standRepository) {
        this.standRepository = standRepository
    }

    async execute(editStandDto) {
        const withErrorHandling = handleError(async () => {
            const standExists = await this.standRepository.findByName(editStandDto.name)
            if(!standExists) {
                return Result.failed(new Error('Stand doesnt exists'))
            }
            standExists.editStand(editStandDto) // Use the existing stand's ID
            let stand = await this.standRepository.editStand(standExists)
            return Result.success(stand.toJson())
        })
        return withErrorHandling()
    }
}

module.exports = EditStandUseCase