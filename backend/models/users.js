const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db.config')

class User extends Model {}
User.init({
    userName: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'Users'
})

module.exports = User