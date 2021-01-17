const { Model, DataTypes } = require('sequelize');

const schema = {
	name: DataTypes.STRING,
	wilaya: DataTypes.STRING,
	commune: DataTypes.STRING,
	address: DataTypes.STRING,
	phone: DataTypes.STRING,
	createdAt: DataTypes.DATE
}
class Agency extends Model { }



module.exports = (db) => {
	Agency.init(schema, { sequelize: db, modelName: 'agency', timestamps: true });
	return Agency
}