const StandController = require('../controllers/StandController');
const router = require('express').Router();

const standController = new StandController();

router.post('/register', standController.registerStand);
router.put('/edit', standController.editStand);
router.delete('/delete', standController.deleteStand);

module.exports = router;