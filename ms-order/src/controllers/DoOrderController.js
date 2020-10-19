const conn = require('../config/db');

const knex = require('knex')({
    client: "mysql"
});

module.exports = {
    async store(req, res) {

        const { userId, productsIds } = req.body;

        const productsQuery = knex('Product')
            .whereIn('ProductId', productsIds);
        conn.query(productsQuery.toQuery(), (error, products) => {

            const prices = products.map(_ => _.ProductPrice);
            const sumPrice = prices.reduce((a, b) => a + b, 0);

            const orderQuery = knex('Orders').insert({
                OrderPayment: 'Credit card',
                OrderTax: sumPrice,
                UserId: userId
            });

            conn.query(orderQuery.toQuery(), (error, order, fields) => {

                const orderProducts = [];
                for (productId of productsIds) {
                    orderProducts.push({
                        OrderId: order.insertId,
                        ProductId: productId
                    });
                }
                console.log(orderProducts);
                const query = knex('OrderProduct').insert(orderProducts);
                conn.query(query.toQuery(), (error, orderProduct) => {
                    return res.json(orderProducts);
                });
            });
        });
    }
}