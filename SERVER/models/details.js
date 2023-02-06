const {DataTypes} = require('sequelize')
const {sequelize} = require('../util/database')

module.exports = {
    Details: sequelize.define('details', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement:true,
            allowNull: false,
            primaryKey: true
        },
        date: DataTypes.DATE,
        time: DataTypes.TIME,
        location: DataTypes.TEXT,
        notes: DataTypes.TEXT,

    })
}