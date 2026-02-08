'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            unique_id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                unique: true
            },
            user_name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            user_email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            user_contact_number: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            user_password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            role_id: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            platform_type: {
                type: Sequelize.INTEGER,
                allowNull: false,
                comment: '1-android, 2-ios, 3-web'
            },
            device_id: {
                type: Sequelize.STRING,
                allowNull: true
            },
            device_details: {
                type: Sequelize.JSON,
                allowNull: true
            },
            device_unique_id: {
                type: Sequelize.STRING,
                allowNull: true
            },
            user_status: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                comment: '0 for active, 1 for inactive'
            },
            user_is_delete_status: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                comment: '0 for not deleted, 1 for deleted'
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('users');
    }
};
