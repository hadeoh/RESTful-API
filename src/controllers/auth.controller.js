const httpStatus = require('http-status');
const sendResponse = require('../helpers/response');
const { UserQuery } = require('../queries');
const emailService = require('../services/email.service');
const config = require('../config');
const { comparePassword } = require('../services/bcrypt.service');
const { issue } = require('../services/auth.service')

const signUp = async (req, res, next) => {
  try {
    const { fullName, email, userName, password } = req.body;

    const userExist = await UserQuery.findOne({
      email: { $eq: email },
      userName: { $eq: userName }
    });

    if (userExist) {
      return res.status(httpStatus.BAD_REQUEST).json(
        sendResponse(httpStatus.BAD_REQUEST, 'invalid credentials', null, {
          issue: 'email/username has been taken'
        })
      );
    }

    const user = await UserQuery.create({
      fullName,
      email,
      password,
      userName
    });

    if (process.env.NODE_ENV != 'test') {
        if (user != null) {
            let url = `http://localhost:${config.port}/api/v1/auth/login`;
            let body = `
            <p>Hey ${fullName},</p>
            <p>Congratulations on your successful registration on RESTful API</p>
            <p>You'll definitely have an amazing time here</p>
            <a href=${url}>${url}</a>
            <p>Kindly login with the link above.</p>
            <p>Do something outside today! </p>
            <p>–Your friends at RESTful</p>
            `
            emailService(email, "Successful User Registration ✔", body);
        }
    }

    return res.status(httpStatus.CREATED).json(sendResponse(httpStatus.CREATED, 'success', user, null));
  } catch (err) {
    next(err);
  }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
    
        let user = await UserQuery.findOne({email});
    
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json(
            sendResponse(httpStatus.NOT_FOUND, 'User does not exist', null, {
                error: 'User does not exist'
            })
            );
        }
    
        if (await comparePassword(password, user.password)) {
            // to issue token with the user object, convert it to JSON
            const token = issue(user.toJSON());
    
            user = { user, token };
    
            return res.json(sendResponse(httpStatus.OK, 'success', user, null));
        }
    
        return res.status(httpStatus.BAD_REQUEST).json(
            sendResponse(httpStatus.BAD_REQUEST, 'invalid email or password', null, {
            issue: 'invalid email or password'
            })
        );
    } catch (err) {
        next(err);
    }
  };

module.exports = { signUp, login };