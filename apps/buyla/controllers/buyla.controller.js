const BuylaService = require('../services/buyla.service');
const { sendSuccess, sendError } = require('../../../shared/utils/response.util');

exports.getProducts = async (req, res) => {
    try {
        const products = await BuylaService.getProducts();
        return sendSuccess(res, 'Products fetched successfully', products);
    } catch (error) {
        return sendError(res, 'Failed to fetch products', error);
    }
};
