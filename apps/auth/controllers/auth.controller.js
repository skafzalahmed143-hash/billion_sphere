const AuthService = require('../services/auth.service');
const { sendSuccess, sendError } = require('../../../shared/utils/response.util');

// Fetch all users
exports.fetchUsers = async (req, res) => {
    try {
        const users = await AuthService.fetchUsers();
        return sendSuccess(res, 'Users fetched successfully', users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return sendError(res, 'Failed to fetch users', error);
    }
};
