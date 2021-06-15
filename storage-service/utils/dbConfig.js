const dbEngine = process.env.DB_ENVIROMENT || "development"
const config = require('./db')(dbEngine)

module.exports = require('knex')(config)