const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db.config')

class ReportTrash extends Model {}
ReportTrash.init({
    name: {
        type: DataTypes.STRING
    },
    location: {
        type: DataTypes.STRING
    },
    date: {
        type: DataTypes.STRING
    }
}, {
    sequelize, 
    modelName: 'ReportTrash'
})

module.exports = ReportTrash