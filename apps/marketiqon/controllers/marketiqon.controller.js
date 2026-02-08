const MarketiqonService = require('../services/marketiqon.service');
const { sendSuccess, sendError } = require('../../../shared/utils/response.util');

exports.getAds = async (req, res) => {
    try {
        const ads = await MarketiqonService.getAds();
        return sendSuccess(res, 'Ads fetched successfully', ads);
    } catch (error) {
        return sendError(res, 'Failed to fetch ads', error);
    }
};
