const Joi = require('joi');

const validationMessage = {
  "any.required": `The field {#label} is required.`,
  "string.empty": `The field {#label} cannot be empty.`,
  "string.base": `The field {#label} datatype wrong.`,
  "number.base": `The field {#label} must be a number.`,
  "number.integer": `The field {#label} must be an integer.`,
  "array.base": `The field {#label} must be an array.`,
  "array.min": `The field {#label} must contain at least one item.`,
  "string.email": `The field {#label} must be a valid email.`,
};

const errorHandling = (schema, req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: true
  });

  if (error) {
    return res.status(200).json({
      status: 0,
      message: error.details[0].message
    });
  }

  req.body = value;
  next();
};

const authValidation = {

  register: (req, res, next) => {
    const schema = Joi.object({
      first_name: Joi.string().trim().required(),
      last_name: Joi.string().trim().required(),
      country_id: Joi.number().integer().required(),
      mobile_number: Joi.string().trim().required(),
      email_id: Joi.string().email().required(),
      address: Joi.string().trim().required(),
      city: Joi.string().trim().required(),
      pin_code: Joi.string().trim().required(),
      state: Joi.string().trim().required(),
      category: Joi.string().trim().allow(),
      sponser_name: Joi.string().trim().allow('', null).optional(),
      reference_code: Joi.string().trim().allow('', null).optional(),
      password: Joi.string().min(6).required(),
      multi_role_ids: Joi.number().required(),
      platform: Joi.string().required(),
      device_id: Joi.string().required(),
      device_unique_id: Joi.string().required(),
      device_details: Joi.string().required()
    })
      .unknown(true)
      .messages(validationMessage);

    return errorHandling(schema, req, res, next);
  },

  login: (req, res, next) => {
    const schema = Joi.object({
      user_identifier: Joi.string().required(),
      type: Joi.number().valid(1, 2).required(),
      password: Joi.string().required(),
      platform: Joi.string().required(),
      device_id: Joi.string().required(),
      device_unique_id: Joi.string().required(),
      device_details: Joi.string().required(),
      multi_role_ids: Joi.number().required()
    })
      .unknown(true)
      .messages(validationMessage);

    return errorHandling(schema, req, res, next);
  },

  verifyOtp: (req, res, next) => {
    const schema = Joi.object({
      user_id: Joi.string().required(),
      type: Joi.number().valid(1, 2, 3).required(),
      otp: Joi.string().required()
    })
      .unknown(true)
      .messages(validationMessage);

    return errorHandling(schema, req, res, next);
  },

  resendOtp: (req, res, next) => {
    const schema = Joi.object({
      user_id: Joi.string().required(),
      type: Joi.number().valid(1, 2).required()
    })
      .unknown(true)
      .messages(validationMessage);

    return errorHandling(schema, req, res, next);
  },


  forgotPassword: (req, res, next) => {
    const schema = Joi.object({
      email_id: Joi.string().email().optional(),
      mobile_number: Joi.string().trim().optional()
    })
      .or('email_id', 'mobile_number')
      .unknown(true)
      .messages(validationMessage);

    return errorHandling(schema, req, res, next);
  },

  resetPassword: (req, res, next) => {
    const schema = Joi.object({
      user_id: Joi.string().required(),
      password: Joi.string().min(6).required()
    })
      .unknown(true)
      .messages(validationMessage);

    return errorHandling(schema, req, res, next);
  },

  refreshToken: (req, res, next) => {
    const schema = Joi.object({
      refresh_token: Joi.string().required()
    })
      .unknown(true)
      .messages(validationMessage);

    return errorHandling(schema, req, res, next);
  },

  getDropdowns: (req, res, next) => {
    const schema = Joi.object({
      type: Joi.number().valid(1, 2, 3).required()
    })
      .unknown(true)
      .messages(validationMessage);

    return errorHandling(schema, req, res, next);
  }

};

module.exports = authValidation;