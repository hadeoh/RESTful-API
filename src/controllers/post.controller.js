const httpStatus = require('http-status');
const { PostQuery } = require('../queries');
const sendResponse = require('../helpers/response');
const cloudinaryUpload = require('../config/cloudinary');
const fs = require('fs');

const publishPost = async (req, res, next) => {
    try {
        const { content } = req.body;

        const { id: user } = req.token;

        let image;
        let photo;
        if (req.file) {
            image = req.file.path;
            let result = await cloudinaryUpload(image);
            fs.unlinkSync(image);
            photo = result.url;
        }

        

        

        const post = await PostQuery.create({ content, user, photo });

        return res.json(sendResponse(httpStatus.CREATED, 'success', post, null));
    } catch (err) {
        next(err);
    }
};

module.exports = {publishPost};