const { DataTypes } = require('sequelize');
const connection = require('../connection');

const StaticDropDownList = connection.define('static_drop_down_lists', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '1-countries(not used here), 2-roles, 3-apps'
    },
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        comment: '1-active, 0-inactive'
    }
}, {
    timestamps: true
});

module.exports = StaticDropDownList;
