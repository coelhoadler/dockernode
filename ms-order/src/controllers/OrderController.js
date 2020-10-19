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
        conn.query(orderQuery.toQuery(), (error, order, fields) => {
            return res.json(order);
        });
    }
}