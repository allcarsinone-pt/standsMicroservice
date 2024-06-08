const AuthServiceMiddleware = require('../middlewares/AuthServiceMiddleware')
const roles = require('../entities/Roles')
const router = require('express').Router()
const pg = require('pg')

router.post('/', async (req, res) => {
    const controller = req.app.get('RegisterStandController')
    controller.execute(req, res)
})

router.put('/', AuthServiceMiddleware.execute([roles.ADMIN, roles.MANAGER]), async (req, res) => {
    const controller = req.app.get('EditStandController')
    controller.execute(req, res)
})

router.delete('/:standid',AuthServiceMiddleware.execute([roles.ADMIN]), async (req, res) => {
    const controller = req.app.get('DeleteStandController')
    controller.execute(req, res)
})

router.get('/location/:standid', async (req, res) => {
    const controller = req.app.get('GetStandCoordinatesController')
    controller.execute(req, res)
})

router.get("/:standid", async (req, res) => {
    try {
    const { standid } = req.params
    if(!standid) {
        return res.status(400).json({ error: 'StandID is required' })
    }
    
    const client = new pg.Client(process.env.DATABASE_URL)
    await client.connect()


    const result = await client.query(`SELECT * FROM stand WHERE standid = $1`, [standid])
    await client.end()
    if(result.rows.length === 0) {
        return res.status(404).json({ error: 'Stand not found' })
    }
    return res.status(200).json(result.rows[0])
}
    catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
    }
})

module.exports = router