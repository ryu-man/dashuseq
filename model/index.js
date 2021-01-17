
const { Sequelize } = require("sequelize")

const sequelize = new Sequelize('postgres://user:user@localhost:5432/dashudb')

exports.User = require('./user')(sequelize)
exports.Agency = require('./agency')(sequelize)

exports.db = sequelize