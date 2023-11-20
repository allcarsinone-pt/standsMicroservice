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
            let stand = Stand.create(editStandDto.name, editStandDto.location, editStandDto.phone, editStandDto.mobilephone, editStandDto.schedule, standExists.id) // Use the existing stand's ID
            stand = await this.standRepository.create(stand)
            return Result.success(stand.toJson())
        })
        return withErrorHandling()
    }
}

module.exports = EditStandUseCase