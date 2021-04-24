const { Router } = require('express');
const { celebrate } = require('celebrate');
const { userValidation, passwordCheck } = require('../validations/auth.validation');
const { signUp, login } = require('../controllers/auth.controller');

const router = Router();

router
    .route('/signup')
    .post(
        celebrate(userValidation.signUp, { abortEarly: false }),
        passwordCheck,
        signUp
    );

router
    .route('/login')
    .post(celebrate(userValidation.login, { abortEarly: false }), login);

module.exports = router;