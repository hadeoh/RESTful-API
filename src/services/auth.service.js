const jwt = require('jsonwebtoken');
const config = require('../config');

const secret = config.env === 'production' ? config.jwtSecret : 'secret';

const issue = payload => jwt.sign(payload, secret, { expiresIn: 86400 });

const verify = (token, cb) => jwt.verify(token, secret, cb);

module.exports = { issue, verify }