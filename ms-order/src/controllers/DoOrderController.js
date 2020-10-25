const conn = require('../config/db');

const knex = require('knex')({
    client: "mysql"
});

module.exports = {
    async store(req, res) {

        const { userId, productsIds } = req.query;

        const productsQuery = knex('Product')
            .whereIn('ProductId', productsIds.split(','));

        conn.query(productsQuery.toQuery(), (error, products) => {

            const prices = products.map(_ => _.ProductPrice);
            const sumPrice = prices.reduce((a, b) => a + b, 0);

            const orderQuery = knex('Orders').insert({
                OrderPayment: 'Credit card',
                OrderTax: sumPrice,
                UserId: userId
            });

            conn.query(orderQuery.toQuery(), (error, order, fields) => {

                if (error) {
                    return res.status(500).json({
                        error
                    });
                } else {
                    const orderProducts = [];
                    for (productId of productsIds) {
                        orderProducts.push({
                            OrderId: order.insertId,
                            ProductId: productId
                        });
                    }
                    console.log(orderProducts);
                    const query = knex('OrderProduct').insert(orderProducts);
                    conn.query(query.toQuery(), (error2, orderProduct) => {
                        if (error) {
                            return res.status(500).json({
                                error2
                            });
                        } else {
                            return res.status(200).json({
                                message: 'Order successfully sent.',
                                orders: orderProducts
                            });
                        }
                    });
                }

            });
        });
    }
}