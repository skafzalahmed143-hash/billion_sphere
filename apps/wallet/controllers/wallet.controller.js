const WalletService = require('../services/wallet.service');
const { sendSuccess, sendError } = require('../../../shared/utils/response.util');

exports.getWalletDetails = async (req, res) => {
    try {
        const details = await WalletService.getWalletDetails();
        return sendSuccess(res, 'Wallet details fetched successfully', details);
    } catch (error) {
        return sendError(res, 'Failed to fetch wallet details', error);
    }
};
