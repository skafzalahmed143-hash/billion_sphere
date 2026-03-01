'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('active_logins', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            platform: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            device_id: {
                type: Sequelize.STRING,
                allowNull: true
            },
            device_unique_id: {
                type: Sequelize.STRING,
                allowNull: true
            },
            device_details: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            user_id: {
                type: Sequelize.UUID,
                allowNull: true,
                references: {
                    model: 'users',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
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
        await queryInterface.dropTable('active_logins');
    }
};
