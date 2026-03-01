const { DataTypes } = require('sequelize');
const { validateEnv } = require('../../src/env');

validateEnv(['DB_HOST', 'DB_PORT', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'], 'Database');

const sequelize = require('../connection');

const ActiveLogin = sequelize.define(
    'ActiveLogin',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        platform: {
            type: DataTypes.STRING,
            allowNull: true
        },
        device_id: {
            type: DataTypes.STRING,
            allowNull: true
        },
        device_unique_id: {
            type: DataTypes.STRING,
            allowNull: true
        },
        device_details: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id'
            }
        }
    },
    {
        tableName: 'active_logins',
        timestamps: true,
        underscored: true
    }
);

module.exports = ActiveLogin;
