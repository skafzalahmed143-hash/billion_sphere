const { sendEmail } = require('./email');
const { sendSms } = require('./mobile');

const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

module.exports = {
    sendEmail,
    sendSms,
    generateOtp
};
