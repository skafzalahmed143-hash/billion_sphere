'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            first_name: {
                type: Sequelize.STRING,
                allowNull: true
            },
            last_name: {
                type: Sequelize.STRING,
                allowNull: true
            },
            country_id: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            mobile_number: {
                type: Sequelize.STRING,
                allowNull: true
            },
            email_id: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            address: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            city: {
                type: Sequelize.STRING,
                allowNull: true
            },
            pin_code: {
                type: Sequelize.STRING,
                allowNull: true
            },
            state: {
                type: Sequelize.STRING,
                allowNull: true
            },
            category: {
                type: Sequelize.STRING,
                allowNull: true
            },
            sponser_name: {
                type: Sequelize.STRING,
                allowNull: true
            },
            reference_code: {
                type: Sequelize.STRING,
                allowNull: true,
                unique: true
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            multi_role_ids: {
                type: Sequelize.JSON,
                allowNull: true,
                defaultValue: []
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('users');
    }
};
