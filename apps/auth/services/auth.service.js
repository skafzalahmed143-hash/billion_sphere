const User = require('../models/user.model');

exports.fetchUsers = async () => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['user_password'] }
        });
        return users;
    } catch (error) {
        throw error;
    }
};
