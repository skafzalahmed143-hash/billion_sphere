const { User, ActiveLogin, Country, StaticDropDownList } = require('../../../../shared/database');
const { signToken, verifyToken } = require('../../../../shared/src/jwt');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const { sendEmail, sendSms, generateOtp } = require('../../../../shared/src/notifications');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const buildTokens = (user) => {
  const payload = {
    id: user.id,
    email_id: user.email_id,
    roles: user.multi_role_ids
  };

  const accessToken = signToken(
    payload,
    process.env.JWT_SECRET || 'supersecretkey',
    '1h' // Access token valid for 1 hour
  );

  const refreshToken = signToken(
    payload,
    process.env.JWT_SECRET || 'supersecretkey',
    '30d'  // Refresh token valid for 30 days
  );

  return { accessToken, refreshToken };
};
const registerUser = async (userData) => {
  try {
    const {
      first_name,
      last_name,
      country_id,
      mobile_number,
      email_id,
      address,
      city,
      pin_code,
      state,
      category,
      sponser_name,
      reference_code,
      password,
      multi_role_ids,
      platform,
      device_id,
      device_unique_id,
      device_details
    } = userData;

    // Normalize multi_role_ids to an array
    let roles = multi_role_ids;
    if (typeof roles === 'number') {
      roles = [roles];
    } else if (!Array.isArray(roles)) {
      roles = [];
    }

    // Check existing user
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email_id }, { mobile_number }]
      }
    });

    if (existingUser) {
      return { status: 0, message: 'User with this email or mobile number already exists' };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTPs
    const emailOtp = email_id ? generateOtp() : null;
    const mobileOtp = mobile_number ? generateOtp() : null;

    // Create user
    const createdUser = await User.create({
      first_name,
      last_name,
      country_id,
      mobile_number,
      email_id,
      address,
      city,
      pin_code,
      state,
      category,
      sponser_name,
      reference_code,
      password: hashedPassword,
      multi_role_ids: roles,
      email_otp: emailOtp,
      mobileotp: mobileOtp
    });

    // Send OTPs
    if (email_id && emailOtp) {
      await sendEmail(email_id, 'Verification OTP', `Your OTP is ${emailOtp}`);
    }
    if (mobile_number && mobileOtp) {
      await sendSms(mobile_number, `Your OTP is ${mobileOtp}`);
    }

    // Create new active login record (Session)
    await ActiveLogin.create({
      user_id: createdUser.id,
      platform,
      device_id,
      device_unique_id,
      device_details
    });

    return {
      status: 1,
      message: 'User registered successfully. Please verify your account.',
      data: {
        id: createdUser.id,
        email: createdUser.email_id,
        is_approval: 0,
        name: `${createdUser.first_name} ${createdUser.last_name}`.trim(),
        contact_number: createdUser.mobile_number,
        role_id: multi_role_ids
      }
    };
  } catch (error) {
    console.error('Register Service Error:', error);
    return { status: 0, message: 'Internal server error' };
  }
};
const loginUser = async (loginData) => {
  try {
    const {
      user_identifier,
      type, // 1 for email, 2 mobile
      password,
      platform,
      device_id,
      device_unique_id,
      device_details,
      multi_role_ids: loginRoleId,
      country_id
    } = loginData;

    // Find user by email or mobile number based on type
    const query = type === 1 ? { email_id: user_identifier } : { mobile_number: user_identifier };
    const user = await User.findOne({
      where: query
    });

    if (!user) {
      return { status: 0, message: 'Invalid credentials' };
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { status: 0, message: 'Invalid credentials' };
    }

    // Role validation: check if provided multi_role_ids exists in user's multi_role_ids array
    const userRoles = user.multi_role_ids || [];
    if (!userRoles.includes(loginRoleId)) {
      return { status: 0, message: 'Unauthorized role' };
    }

    // Verification check
    const isEmailVerified = user.email_id ? user.email_verified === 1 : true;
    const isMobileVerified = user.mobile_number ? user.mobile_verified === 1 : true;

    if (!isEmailVerified || !isMobileVerified) {
      // Generate and send new OTPs
      const emailOtp = user.email_id && !isEmailVerified ? generateOtp() : null;
      const mobileOtp = user.mobile_number && !isMobileVerified ? generateOtp() : null;

      if (emailOtp) user.email_otp = emailOtp;
      if (mobileOtp) user.mobileotp = mobileOtp;
      await user.save();

      if (emailOtp) {
        await sendEmail(user.email_id, 'Verification OTP', `Your OTP is ${emailOtp}`);
      }
      if (mobileOtp) {
        await sendSms(user.mobile_number, `Your OTP is ${mobileOtp}`);
      }

      return {
        status: 0,
        message: 'Account not verified. OTP sent.',
        data: {
          id: user.id,
          email: user.email_id,
          is_approval: 0,
          name: `${user.first_name} ${user.last_name}`.trim(),
          country_id: user.country_id,
          contact_number: user.mobile_number,
          role_id: loginRoleId,
          account_status: user.account_status,
          mobile_verified: user.mobile_verified,
          email_verified: user.email_verified
        }
      };
    }

    // Session management: limit to 5 active logins
    const activeSessions = await ActiveLogin.findAll({
      where: { user_id: user.id },
      order: [['created_at', 'ASC']]
    });

    if (activeSessions.length >= 5) {
      // Remove oldest session
      const oldestSession = activeSessions[0];
      await oldestSession.destroy();
    }

    // Create new active login record
    await ActiveLogin.create({
      user_id: user.id,
      platform,
      device_id,
      device_unique_id,
      device_details
    });

    // Generate tokens
    const { accessToken, refreshToken } = buildTokens(user);

    // Specific logic for role_id 1 in response if needed (as requested by user)
    const userResponse = {
      id: user.id,
      email_id: user.email_id,
      first_name: user.first_name,
      last_name: user.last_name,
      multi_role_ids: user.multi_role_ids
    };

    // If role_id 1 is present in the roles array, we could add specific data here
    // But the user said "when login role_id also pss role id is 1 then check the arary based on that will response will give also"
    // This might mean checking if 1 is in multi_role_ids.

    return {
      status: 1,
      message: 'User Login Successful.',
      data: {
        id: user.id,
        email: user.email_id,
        is_approval: 0,
        name: `${user.first_name} ${user.last_name}`.trim(),
        country_id: user.country_id,
        contact_number: user.mobile_number,
        role_id: loginRoleId,
        account_status: user.account_status,
        mobile_verified: user.mobile_verified,
        email_verified: user.email_verified,
        access_token: accessToken,
        refresh_token: refreshToken
      }
    };
  } catch (error) {
    console.error('Login Service Error:', error);
    return { status: 0, message: 'Internal server error' };
  }
};
const getProfile = async (userId) => {
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return { status: 0, message: 'User not found' };
    }

    const userData = {
      id: user.id,
      email_id: user.email_id,
      first_name: user.first_name,
      last_name: user.last_name,
      multi_role_ids: user.multi_role_ids
    };

    // Role-based logic: if role_id 1 is present
    if (user.multi_role_ids && user.multi_role_ids.includes(1)) {
      userData.special_access = true;
      userData.role_message = 'Welcome, Administrator/Special Role 1';
      // Add more specific logic here as needed by the user
    }

    return {
      status: 1,
      message: 'Profile fetched successfully',
      data: userData
    };
  } catch (error) {
    console.error('Get Profile Service Error:', error);
    return { status: 0, message: 'Internal server error' };
  }
};
const forgotPassword = async (data) => {
  try {
    const { email_id, mobile_number } = data;
    let user;
    let type;

    if (email_id) {
      user = await User.findOne({ where: { email_id } });
      type = 1; // Email
    } else if (mobile_number) {
      user = await User.findOne({ where: { mobile_number } });
      type = 2; // Mobile
    }

    const otp = generateOtp();
    if (type === 1) {
      user.email_otp = otp;
      await user.save();
      await sendEmail(user.email_id, 'Forgot Password OTP', `Your OTP is ${otp}`);
    } else {
      user.mobileotp = otp;
      await user.save();
      await sendSms(user.mobile_number, `Your OTP is ${otp}`);
    }

    return {
      status: 1,
      message: 'OTP sent successfully',
      data: { user_id: user.id }
    };
  } catch (error) {
    console.error('Forgot Password Service Error:', error);
    return { status: 0, message: 'Internal server error' };
  }
};
const resendOtp = async (data) => {
  try {
    const { user_id, type } = data; // type: 1 for email, 2 for mobile
    const user = await User.findByPk(user_id);

    if (!user) {
      return { status: 0, message: 'User not found' };
    }

    const newOtp = generateOtp();

    if (type === 1) { // Email
      if (!user.email_id) {
        return { status: 0, message: 'Email not registered for this account' };
      }
      user.email_otp = newOtp;
      await user.save();
      await sendEmail(user.email_id, 'Verification OTP', `Your OTP is ${newOtp}`);
    } else if (type === 2) { // Mobile
      user.mobileotp = newOtp;
      await user.save();
      await sendSms(user.mobile_number, `Your OTP is ${newOtp}`);
    } else {
      return { status: 0, message: 'Invalid verification type' };
    }

    return { status: 1, message: 'OTP resent successfully' };
  } catch (error) {
    console.error('Resend OTP Service Error:', error);
    return { status: 0, message: 'Internal server error' };
  }
};
const resetPassword = async (data) => {
  try {
    const { password, user_id } = data;

    const user = await User.findByPk(user_id);
    if (!user) {
      return { status: 0, message: 'User not found' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    await user.save();

    return { status: 1, message: 'Password updated successfully' };
  } catch (error) {
    console.error('Reset Password Service Error:', error);
    return { status: 0, message: 'Internal server error' };
  }
};
const verifyOtp = async (verificationData) => {
  try {
    const { user_id, type, otp } = verificationData;
    // type: 1 - Email Registration, 2 - Mobile Registration

    const DEFAULT_OTP = 'BS1234'; // 👈 Fixed OTP

    const user = await User.findByPk(user_id);
    if (!user) {
      return { status: 0, message: 'User not found' };
    }

    // ✅ Check against DEFAULT OTP instead of DB
    if (otp !== DEFAULT_OTP) {
      return { status: 0, message: 'Invalid OTP' };
    }

    if (type === 1) { // Email Registration
      user.email_verified = 1;
      user.email_otp = null;

    } else if (type === 2) { // Mobile Registration
      user.mobile_verified = 1;
      user.mobileotp = null;

    } else {
      return { status: 0, message: 'Invalid verification type' };
    }

    await user.save();

    const typeMsg = type === 1 ? 'Email' : 'Mobile';

    // Generate tokens after successful verification
    const { accessToken, refreshToken } = buildTokens(user);

    return {
      status: 1,
      message: `${typeMsg} verified successfully`,
      data: {
        id: user.id,
        email: user.email_id,
        first_name: user.first_name,
        last_name: user.last_name,
        access_token: accessToken,
        refresh_token: refreshToken
      }
    };

  } catch (error) {
    console.error('Verify OTP Service Error:', error);
    return { status: 0, message: 'Internal server error' };
  }
};
const refreshToken = async (data) => {
  try {
    const { refresh_token } = data;
    if (!refresh_token) {
      return { status: 0, message: 'Refresh token is required' };
    }

    let decoded;
    try {
      decoded = verifyToken(refresh_token, process.env.JWT_SECRET || 'supersecretkey');
    } catch (err) {
      return { status: 0, message: 'Invalid or expired refresh token' };
    }

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return { status: 0, message: 'User not found' };
    }

    const { accessToken, refreshToken: newRefreshToken } = buildTokens(user);

    return {
      status: 1,
      message: 'Token refreshed successfully.',
      data: {
        access_token: accessToken,
        refresh_token: newRefreshToken
      }
    };
  } catch (error) {
    console.error('Refresh Token Service Error:', error);
    return { status: 0, message: 'Internal server error' };
  }
};
const getDropdowns = async (type) => {
  try {
    let data;
    if (parseInt(type) === 1) {
      data = await Country.findAll({ order: [['country_name', 'ASC']] });
    } else if ([2, 3].includes(parseInt(type))) {
      data = await StaticDropDownList.findAll({
        where: { type_id: type, status: 1 },
        order: [['id', 'ASC']]
      });
    } else {
      return { status: 0, message: 'Invalid dropdown type' };
    }

    return {
      status: 1,
      message: 'Dropdown data fetched successfully',
      data
    };
  } catch (error) {
    console.error('Get Dropdowns Service Error:', error);
    return { status: 0, message: 'Internal server error' };
  }
};
const addCountries = async () => {
  try {
    const csvFilePath = path.join(__dirname, '../../../../shared/src/staticFiles/countriesList/countrycodes.csv');
    const results = [];

    await new Promise((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', resolve)
        .on('error', reject);
    });

    if (results.length > 0) {
      // Clear existing countries to ensure fresh import
      await Country.destroy({ where: {}, truncate: true });
      await Country.bulkCreate(results);
    }

    return {
      status: 1,
      message: `${results.length} countries imported successfully`
    };
  } catch (error) {
    console.error('Add Countries Service Error:', error);
    return { status: 0, message: 'Internal server error during CSV import' };
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  verifyOtp,
  forgotPassword,
  resetPassword,
  resendOtp,
  refreshToken,
  getDropdowns,
  addCountries
};
