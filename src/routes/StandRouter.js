const AuthServiceMiddleware = require('../middlewares/AuthServiceMiddleware')

const router = require('express').Router()
router.post('/register',AuthServiceMiddleware.execute, async (req, res) => {
    const controller = req.app.get('RegisterStandController')
    controller.execute(req, res)
})

router.put('/edit', AuthServiceMiddleware.execute, async (req, res) => {
    const controller = req.app.get('EditStandController')
    controller.execute(req, res)
})

router.delete('/delete/:standid',AuthServiceMiddleware.execute, async (req, res) => {
    const controller = req.app.get('DeleteStandController')
    controller.execute(req, res)
})

router.get('/location/:standid', async (req, res) => {
    const controller = req.app.get('GetStandCoordinatesController')
    controller.execute(req, res)
})

module.exports = router