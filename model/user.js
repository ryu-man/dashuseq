const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt')

function hash(value) {
    return bcrypt.hashSync(value, 10)
}

const schema = {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,

    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            this.setDataValue('password', hash(value));
        }

    },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}
class User extends Model { }



module.exports = (db) => {
    User.init(schema, { sequelize: db, modelName: 'user', timestamps: true });
    return User 
}