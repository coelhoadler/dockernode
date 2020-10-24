const conn = require('../config/db');
const deskProducer = require('./DeskProducer');

async function index(req, res) {
    conn.query(`SELECT * FROM Desk`, (error, results, fields) => {
        if (error) {
            return res.status(500).json({
                error
            });
        } else {
            if (results.length > 0) {
                return res.status(200).json({
                    length: results.length,
                    wishes: results
                });
            } else {
                return res.status(404).json({
                    message: `No desks yet.`
                });                    
            }
        }
    });
}

async function create(req, res) {
    const { userId, deskDesc, deskDate } = req.query;

    const deskObj = {userId, deskDesc, deskDate };
    deskProducer.sendToKafka(deskObj);

    return res.status(200).json({
        message: `Desk added successfully.`
    });    
}

module.exports = { index, create };