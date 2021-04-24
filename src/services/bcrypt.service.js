const bcrypt = require("bcryptjs");
const config = require("../config");

const hashPassword = user => {
  const hash = bcrypt.genSaltSync(config.bcryptSalt);
  return bcrypt.hash(user.password, hash);
};

const comparePassword = (password, hash) => bcrypt.compare(password, hash);

module.exports = {
    hashPassword, comparePassword
}