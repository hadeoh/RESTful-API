/**
 * Returns a custom error object with descriptive messages.
 * @property {Array} arr - Array of Joi validation errors.
 * @returns {Object}
 */
const JoiErrorFormatter = errors => {
    let arr = []
    errors.forEach(erMessage => {
        arr = erMessage.details;
    });
    return arr.reduce((errMessage, { path, message }) => {
        let [key] = path;
        if (!errMessage[key]) {
          errMessage[key] = message.replace(/["']/g, "");
        }
        return errMessage;
    }, {});
}
  
  
 module.exports = JoiErrorFormatter;