const conn = require('../config/db');

module.exports = {
    async index(req, res) {
        const productId = req.params.productId;
        conn.query(`SrELECT * FROM product WHERE product_id = '${productId}'`, (error, results, fields) => {
            if (error) {
                return res.status(500).json({
                   error
                });
            } else {
                if (results.length > 0) {
                    return res.status(200).json({
                        length: results.length,
                        product: results[0]
                    });
                } else {
                    return res.status(404).json({
                        message: `Product was not found.`
                    });                    
                }
            }
        });
    }
}