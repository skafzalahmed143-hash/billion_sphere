'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('users', 'country', {
            type: Sequelize.STRING,
            allowNull: true
        });
        await queryInterface.addColumn('users', 'mobileotp', {
            type: Sequelize.STRING,
            allowNull: true
        });
        await queryInterface.addColumn('users', 'forgot_otp', {
            type: Sequelize.STRING,
            allowNull: true
        });
        await queryInterface.addColumn('users', 'email_otp', {
            type: Sequelize.STRING,
            allowNull: true
        });
        await queryInterface.addColumn('users', 'mobile_verified', {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            comment: '1-verified, 0-not verified'
        });
        await queryInterface.addColumn('users', 'email_verified', {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            comment: '1-verified, 0-not verified'
        });
        await queryInterface.addColumn('users', 'age', {
            type: Sequelize.INTEGER,
            defaultValue: 0
        });
        await queryInterface.addColumn('users', 'gender', {
            type: Sequelize.INTEGER,
            allowNull: true,
            comment: '1-male, 2-female'
        });
        await queryInterface.addColumn('users', 'account_status', {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            comment: '0-active, 1-user deactivated, 2-delete, 3-blocked by admin'
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('users', 'country');
        await queryInterface.removeColumn('users', 'mobileotp');
        await queryInterface.removeColumn('users', 'forgot_otp');
        await queryInterface.removeColumn('users', 'email_otp');
        await queryInterface.removeColumn('users', 'mobile_verified');
        await queryInterface.removeColumn('users', 'email_verified');
        await queryInterface.removeColumn('users', 'age');
        await queryInterface.removeColumn('users', 'gender');
        await queryInterface.removeColumn('users', 'account_status');
    }
};
