const httpStatus = require('http-status');
const sendResponse = require('../helpers/response');
const { UserQuery } = require('../queries');

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

    return res.status(httpStatus.CREATED).json(sendResponse(httpStatus.CREATED, 'success', user, null));
  } catch (err) {
    next(err);
  }
}

module.exports = signUp;