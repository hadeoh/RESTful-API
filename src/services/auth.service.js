const jwt = require('jsonwebtoken');
const config = require('../config');

const secret = config.env === 'production' ? config.jwtSecret : 'secret';

const issue = (payload, secs) => jwt.sign(payload, secret, { expiresIn: secs });

const verify = (token, cb) => jwt.verify(token, secret, cb);

const decode = (token)  => jwt.decode(token, secret);

module.exports = { issue, verify, decode }