const conn = require('../config/db');

const knex = require('knex')({
    client: "mysql"
});

module.exports = {
    async index(req, res) {
        const { userId } = req.params;
        const orderQuery = knex('Orders')
            .join('OrderProduct', 'OrderProduct.OrderId', 'Orders.OrderId')
            .join('Product', 'Product.ProductId', 'OrderProduct.ProductId')
            .where('Orders.UserId', userId);
        conn.query(orderQuery.toQuery(), (error, results, fields) => {

            if (error) {
                return res.status(500).json({
                    error
                });
            } else {
                if (results.length > 0) {
                    return res.status(200).json({
                        length: results.length,
                        orders: results
                    });
                } else {
                    return res.status(404).json({
                        message: `User has no orders.`,
                        orders: []
                    });                    
                }
            }
        });
    }
}