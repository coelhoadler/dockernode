const conn = require('../config/db');

module.exports = {
    async index(req, res) {
        return res.json({
            firstController: true
        });
    }
}