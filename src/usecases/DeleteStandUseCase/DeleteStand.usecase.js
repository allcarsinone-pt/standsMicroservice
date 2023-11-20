const Stand = require('../../entities/Stand')
const { Result, handleError } = require('../../util/Result')

class DeleteStandUseCase {
    constructor (standRepository) {
        this.standRepository = standRepository
    }

    async execute () {
        const withErrorHandling = handleError(async () => {
            const stand = await this.standRepository.deleteStand()
            return Result.success(stand)
        })
        return withErrorHandling()
      }
      

}