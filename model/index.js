
const { Sequelize } = require("sequelize")

const sequelize = new Sequelize(process.env.DB_URI)

exports.User = require('./user')(sequelize)
exports.Agency = require('./agency')(sequelize)

exports.db = sequelize