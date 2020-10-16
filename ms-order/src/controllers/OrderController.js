const conn = require('../config/db');

const knex = require('knex')({
    client: "mysql"
});

const DBResultHandle = require('../util/DBResultHandle');

module.exports = {
    async index(req, res) {
        const { userId } = req.params;

        const query = knex('order')
            .where('UserId', userId);

        conn.query(query.toString, (error, results, fields)=>{
            return DBResultHandle();
        });
    }
}