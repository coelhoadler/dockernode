const conn = require('../config/db');

module.exports = {
    async index(req, res) {
        const category = req.params.category;
        conn.query(`SELECT * FROM product WHERE product_category = '${category}'`, (error, results, fields) => {
            if (error) {
                return res.status(500).json({
                   error
                });
            } else {
                if (results.length > 0) {
                    return res.status(200).json({
                        length: results.length,
                        products: results
                    });
                } else {
                    return res.status(404).json({
                        message: `Category "${category}" was not found.`,
                        products: []
                    });                    
                }
            }
        });
    }
}