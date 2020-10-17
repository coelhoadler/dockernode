const conn = require('../config/db');

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
    const userId = req.query.userId;
    const deskDesc = req.query.deskDesc;
    const deskDate = req.query.deskDate;

    conn.query(`INSERT INTO Desk (UserId, DeskDesc, DeskDate) VALUE ('${userId}', '${deskDesc}', '${deskDate}')`, (error, results, fields) => {
        if (error) {
            return res.status(500).json({
                error
            });
        } else {
            return res.status(200).json({
                message: `Desk added successfully.`
            });
        }
    });

}

module.exports = { index, create };