require("dotenv").config();
const cloudinary = require("cloudinary");

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
const uploads = async (file) => {
    let result;
    try {
        result = await cloudinary.v2.uploader.upload(file, {});
    } catch (e) {
        console.log(e);
    }
    return result
};

module.exports = uploads;