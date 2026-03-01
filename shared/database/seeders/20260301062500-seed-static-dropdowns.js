'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('static_drop_down_lists', [
            // Type 2: Roles
            { title: 'individual', type_id: 2, status: 1 },
            { title: 'industrialist', type_id: 2, status: 1 },
            { title: 'delivery', type_id: 2, status: 1 },
            { title: 'admin', type_id: 2, status: 1 },
            { title: 'super admin', type_id: 2, status: 1 },

            // Type 3: Apps
            { title: 'marketiqon', type_id: 3, status: 1 },
            { title: 'buyla', type_id: 3, status: 1 },
            { title: 'ledgira', type_id: 3, status: 1 },
            { title: 'tripora', type_id: 3, status: 1 },
            { title: 'foodelt', type_id: 3, status: 1 },
            { title: 'gamorax', type_id: 3, status: 1 },
            { title: 'stoxenova', type_id: 3, status: 1 },
            { title: 'crealooma', type_id: 3, status: 1 }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('static_drop_down_lists', null, {});
    }
};
