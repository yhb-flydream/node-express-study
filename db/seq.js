const { Sequelize } = require('sequelize')

const { MYSQL_CONFIG } = require('../config')

const { host, user, password, database } = MYSQL_CONFIG

module.exports = new Sequelize(database, user, password, {
  host: host,
  dialect: 'mysql',
})
