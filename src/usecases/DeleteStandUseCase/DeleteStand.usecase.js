const { json } = require('express')
const Stand = require('../../entities/Stand')
const { Result, handleError } = require('../../util/Result')

class DeleteStandUseCase {
    constructor (standRepository) {
        this.standRepository = standRepository
    }

    async execute (deleteStandDto) {
        const withErrorHandling = handleError(async () => {
            const standExists = await this.standRepository.findByID(deleteStandDto.standid)
            
            if(!standExists) {
                return Result.failed(new Error('Stand doesnt exists'))
            }
            
            const stand = await this.standRepository.deleteStand(deleteStandDto.standid)

            return Result.success(json({success: 'true'}))
        })
        return withErrorHandling()
    }
}

module.exports = DeleteStandUseCase