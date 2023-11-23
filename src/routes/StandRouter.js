const router = require('express').Router()

router.post('/register', async (req, res) => {
    const controller = req.app.get('RegisterStandController')
    controller.execute(req, res)
})

router.put('/edit', async (req, res) => {
    const controller = req.app.get('EditStandController')
    controller.execute(req, res)
})

router.delete('/delete', async (req, res) => {
    const controller = req.app.get('DeleteStandController')
    controller.execute(req, res)
})

module.exports = router