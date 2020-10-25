const conn = require('../config/db');

async function index(req, res) {
    const { userId } = req.params;
    conn.query(`SELECT * FROM Wish WHERE UserId = '${userId}'`, (error, results, fields) => {
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
                    message: `User doesn't have wish list.`,
                    wishes: []
                });                    
            }
        }
    });
}

async function create(req, res) {
    const userId = req.query.userId;
    const productId = req.query.productId;

    conn.query(`INSERT INTO Wish (UserId, ProductId) VALUE ('${userId}', '${productId}')`, (error, results, fields) => {
        if (error) {
            return res.status(422).json({
                message: `User already liked this product.`
            });
        } else {
            return res.status(200).json({
                message: `Product added to your wish list.`
            });
        }
    });

}

module.exports = { index, create };