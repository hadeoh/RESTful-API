const { Router } = require('express');
const { celebrate } = require('celebrate');
const { userValidation, passwordCheck } = require('../validations/auth.validation');
const signUp = require('../controllers/auth.controller');

const router = Router();

router
  .route('/signup')
  .post(
    celebrate(userValidation.signUp, { abortEarly: false }),
    passwordCheck,
    signUp
  );

module.exports = router;