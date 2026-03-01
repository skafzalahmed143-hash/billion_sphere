'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('countries', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            country_name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            country_code: {
                type: Sequelize.STRING,
                allowNull: false
            },
            dialing_code: {
                type: Sequelize.STRING,
                allowNull: false
            },
            currency: {
                type: Sequelize.STRING,
                allowNull: false
            },
            currency_name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            currency_symbol: {
                type: Sequelize.STRING,
                allowNull: false
            },
            emoji: {
                type: Sequelize.STRING,
                allowNull: true
            },
            flag: {
                type: Sequelize.STRING,
                allowNull: true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('countries');
    }
};
