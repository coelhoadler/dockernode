const conn = require('../config/db');
const axios = require('axios');
const ConfigurationManager = require('../config/consul/configurationManager');
const CalculateShippingService = require('../services/CalculateShippingService');
const StringSanitizer = require('../util/StringSanitizer');

const knex = require('knex')({
    client: "mysql"
});



module.exports = {
    async calculate(req, res) {
        const { userId } = req.params;
        const userQuery = knex('User').where('UserId', userId);
        conn.query(userQuery.toQuery(), (error, user) => {

            if (error) {
                return res.status(500);
            } else if (user.length === 0) {
                return res.status(404).json({
                    message: 'User not found.'
                });
            }

            user = user[0];
            const url = ConfigurationManager.ShippingCalculateUrl.replace('{cep}', StringSanitizer.SanitizeZipCode(user.UserCep));
            axios.get(url).then((result) => {
                result = result.data;
                const shippingValue = CalculateShippingService.calculateByState(result.uf);
                result.tax = shippingValue;
                result.message = 'The shipping tax to given address is R$' + result.tax;
                return res.status(200).json(result);
            });

        })

    }
}