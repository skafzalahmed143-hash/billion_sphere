const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mobile_number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email_id: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true
    },
    mobileotp: {
      type: DataTypes.STRING,
      allowNull: true
    },
    forgot_otp: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email_otp: {
      type: DataTypes.STRING,
      allowNull: true
    },
    mobile_verified: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '1-verified, 0-not verified'
    },
    email_verified: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '1-verified, 0-not verified'
    },
    age: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    gender: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '1-male, 2-female'
    },
    account_status: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '0-active, 1-user deactivated, 2-delete, 3-blocked by admin'
    }, city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pin_code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sponser_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    reference_code: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    multi_role_ids: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: []
    }
  },
  {
    tableName: 'users',
    timestamps: true,
    underscored: true
  }
);

module.exports = User;
