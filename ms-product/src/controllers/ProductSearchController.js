const conn = require('../config/db');

const knex = require('knex')({
    client: "mysql"
});

module.exports = {
    async index(req, res) {

        const {keyWord, productPrice, productAmount, limit, mostSeen} = req.query;

        if (!keyWord && !productPrice && !productAmount && !limit && !mostSeen) {
            return res.status(404).json({
                message: `Unpresent searching params.`,
                products: []
            });
        }

        const query = knex('Product')

        if (mostSeen) {
            query.orderBy('ProductViews', 'desc')
        }
        if (limit) {
            query.limit(limit)
        }
        if (keyWord) {
            query.where('ProductName', 'like', `%${keyWord}%`)
                .orWhere('ProductDesc', 'like', `%${keyWord}%`)
        }
        if (productPrice && !isNaN(productPrice)) {
            query.where('ProductPrice', '<', productPrice * 1.1)
                .where('ProductPrice', '>', productPrice * .9);
        }
        if (productAmount && !isNaN(productAmount)) {
            query.where('ProductAmount', '<', productAmount * 1.1)
                .where('ProductAmount', '>', productAmount * .9);
        }

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
                        message: `No products found for the searching params.`,
                        products: []
                    });
                }
            }
        });
    }
}