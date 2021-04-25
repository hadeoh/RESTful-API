const httpStatus = require('http-status');
const sendResponse = require('../helpers/response');
const { UserQuery } = require('../queries');
const emailService = require('../services/email.service');
const config = require('../config');
const { comparePassword, hashPassword } = require('../services/bcrypt.service');
const { issue, decode } = require('../services/auth.service');

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
            const token = issue(user.toJSON(), 86400);
    
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

const getPasswordResetURL = (user, token) =>
  `http://localhost:${config.port}/api/v1/auth/password-reset/${user.id}/${token}`;

const requestPasswordReset = async (req, res, _next)  => {
    const { email } = req.params;
    const user = await UserQuery.findOne({ email });

    if (!user) {
        return res.status(httpStatus.FORBIDDEN).json(
            sendResponse(httpStatus.FORBIDDEN, 'No user with such email address', null, {
                issue: 'Invalid email address'
            })
        ); 
    }

    const token = issue(user.toJSON(), 3600);
    const url = getPasswordResetURL(user, token);
    const emailTemplate =  `
    <p>Hey ${user.fullName},</p>
    <p>We heard that you lost your RESTful-API password. Sorry about that!</p>
    <p>But don’t worry! You can use the following link to reset your password:</p>
    <a href=${url}>${url}</a>
    <p>If you don’t use this link within 1 hour, it will expire.</p>
    <p>Do something outside today! </p>
    <p>–Your friends at RESTful-API</p>
    `;
    const subject = '🌻 RESTful-API Password Reset 🌻';

    emailService(user.email, subject, emailTemplate);  

    return res.status(httpStatus.OK).json(
        sendResponse(httpStatus.OK, 'A reset password link has been sent to your email', null, null)
    );
}

const setNewPassword = async (req, res, _next) => {
    const { id, token } = req.params;
    const { password } = req.body;

    if (password.length < 6) {
        return res.status(httpStatus.BAD_REQUEST).json(
            sendResponse(httpStatus.BAD_REQUEST, 'Password cannot be less than six characters', null, {
                issue: 'Invalid Password'
            })
        ); 
    }

    const user = await UserQuery.findOne({ _id: id });
    user['password'] = password;
    const payload = decode(token);

    if (payload.id === user.id) {
        const hash = await hashPassword(user);
        await UserQuery.update({ password: hash }, {_id: id});
        return res.status(httpStatus.ACCEPTED).json(
            sendResponse(httpStatus.ACCEPTED, 'Password successfully changed', null, null)
        );  
    }

    return res.status(httpStatus.NOT_FOUND).json(
        sendResponse(httpStatus.NOT_FOUND, 'Invalid User', null, {
            issue: 'Invalid User'
        })
    ); 
  }

module.exports = { signUp, login, requestPasswordReset, setNewPassword };