const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('data_wave_to_earth', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize