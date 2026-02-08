const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../database/index');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    unique_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    user_contact_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    user_password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    platform_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '1-android, 2-ios, 3-web',
        validate: {
            isIn: [[1, 2, 3]],
        },
    },
    device_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    device_details: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    device_unique_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    user_status: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: '0 for active, 1 for inactive',
    },
    user_is_delete_status: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: '0 for not deleted, 1 for deleted',
    },
}, {
    tableName: 'users',
    timestamps: true,
});

module.exports = User;
