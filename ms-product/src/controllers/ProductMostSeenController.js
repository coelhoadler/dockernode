const conn = require('../config/db');

const knex = require('knex')({
    client: "mysql"
});

module.exports = {
    async index(req, res) {

        const {limit} = req.query;

        const query = knex('product').orderBy('ProductViews', 'desc').limit(limit || 5).offset(0);

        conn.query(query.toString(), (error, results, fields) => {
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
                        message: `No products found for the search params.`,
                        products: []
                    });
                }
            }
        });
    }
}