const Stand = require('../models/Stand');

class StandController {
    /**
    * Registers a stand.
    *
    * @param {Object} req - the request object
    * @param {Object} res - the response object
    * @return {Object} the registered stand
    */
    async registerStand(req, res) {
        try {
        const { name, location, phone, mobilephone, schedule } = req.body;
        if(!name || !location || !phone || !mobilephone || !schedule) return res.status(400).json({message: 'Dados inválidos!'});
        const stand = await Stand.registerStand(name, location, phone, mobilephone, schedule);
        return res.status(200).json(stand);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    }

    /**
    * Edit a stand.
    *
    * @param {Object} req - The request object.
    * @param {Object} res - The response object.
    * @return {Promise<Object>} The updated stand.
    */
    async editStand(req, res) {
        try {
        const { name, location, phone, mobilephone, schedule, standid } = req.body;
        if(!name || !location || !phone || !mobilephone || !schedule || !standid) return res.status(400).json({message: 'Dados inválidos!'});
        const stand = await Stand.editStand(name, location, phone, mobilephone, schedule, standid);
        return res.status(200).json(stand);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    }

    /**
    * Deletes a stand.
    *
    * @param {Object} req - The request object.
    * @param {Object} res - The response object.
    * @return {Promise} The deleted stand.
    */
    async deleteStand(req, res) {
        try {
        const { name } = req.body;
        if(!name) return res.status(400).json({message: 'Dados inválidos!'});
        const stand = await Stand.deleteStand(name);
        return res.status(200).json(stand);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = StandController;