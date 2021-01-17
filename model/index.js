
const { Sequelize } = require("sequelize")

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect:"postgres"
})

exports.User = require('./user')(sequelize)
exports.Agency = require('./agency')(sequelize)

exports.db = sequelize