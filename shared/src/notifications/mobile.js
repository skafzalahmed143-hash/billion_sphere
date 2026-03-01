const sendSms = async (mobileNumber, message) => {
    // Static OTP for now as requested
    const staticOtp = 'BS1234';
    console.log(`[SMS Notification] Mobile: ${mobileNumber}, Message: ${message} (OTP: ${staticOtp})`);
    return { success: true, message: 'SMS sent successfully' };
};

module.exports = { sendSms };
