const { Joi } = require('celebrate');
const httpStatus = require('http-status');
const sendResponse = require('../helpers/response');

const userValidation = {
  // POST /api/v1/auth/signup
    signUp: {
        body: {
        fullName: Joi.string()
            .max(200)
            .required(),
        userName: Joi.string()
            .min(2)
            .max(200)
            .required(),
        email: Joi.string()
            .email()
            .max(200)
            .required(),
        password: Joi.string()
            .min(6)
            .max(255)
            .required(),
        confirmPassword: Joi.string().required()
        }
    },

    login: {
        body: {
          email: Joi.string().email().required(),
          password: Joi.string().required()
        }
      },
};

const passwordCheck = (req, res, next) => {
  const { password, confirmPassword } = req.body;
  const errors = {};

  if (password !== confirmPassword) {
    errors['password'] = 'Password does not match';
  }

  if (Object.keys(errors).length) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json(sendResponse(httpStatus.BAD_REQUEST, 'invalid credentials', null, errors));
  }

  next();
};

module.exports = {
    userValidation, passwordCheck
};

