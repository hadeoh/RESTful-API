const { Joi } = require('celebrate');
const httpStatus = require('http-status');
const sendResponse = require('../helpers/response');

const postValidation = {
    post: {
      body: {
        content: Joi.string()
          .max(500)
          .required()
      }
    },
  };
  
module.exports = postValidation;