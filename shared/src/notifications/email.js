const sendEmail = async (to, subject, body) => {
    // Static OTP for now as requested
    const staticOtp = 'BS1234';
    console.log(`[Email Notification] To: ${to}, Subject: ${subject}, Body: ${body} (OTP: ${staticOtp})`);
    return { success: true, message: 'Email sent successfully' };
};

module.exports = { sendEmail };
