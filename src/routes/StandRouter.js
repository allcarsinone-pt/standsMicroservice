const AuthServiceMiddleware = require('../middlewares/AuthServiceMiddleware')
const roles = require('../entities/Roles')
const router = require('express').Router()
router.post('/register',AuthServiceMiddleware.execute([roles.ADMIN]), async (req, res) => {
    const controller = req.app.get('RegisterStandController')
    controller.execute(req, res)
})

router.put('/edit', AuthServiceMiddleware.execute([roles.ADMIN, roles.MANAGER]), async (req, res) => {
    const controller = req.app.get('EditStandController')
    controller.execute(req, res)
})

router.delete('/delete/:standid',AuthServiceMiddleware.execute([roles.ADMIN]), async (req, res) => {
    const controller = req.app.get('DeleteStandController')
    controller.execute(req, res)
})

router.get('/location/:standid', async (req, res) => {
    const controller = req.app.get('GetStandCoordinatesController')
    controller.execute(req, res)
})

module.exports = router