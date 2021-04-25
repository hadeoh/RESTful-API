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

const fetchPost = async (req, res, next) => {
    try {
        const { id } = req.params;

        const post = await PostQuery.findOne({ _id: id });

        if (post == null) {
            return res.status(httpStatus.NOT_FOUND).json(sendResponse(httpStatus.NOT_FOUND, 'No post with such id', null, null));
        }

        return res.json(sendResponse(httpStatus.OK, 'success', post, null));
    } catch (error) {
        next(error);
    }
}

const deletePost = async (req, res, next) => {
    try {
        const { id } = req.params;

        await PostQuery.delete({ _id: id });

        return res.json(sendResponse(httpStatus.OK, 'success', null, null));
    } catch (error) {
        next(error);
    }
}

const editPost = async (req, res, next) => {
    try {
        const {id} = req.params;

        const {content} = req.body;

        const post = await PostQuery.update({ content }, { _id: id });

        if (post == null) {
            return res.status(httpStatus.NOT_FOUND).json(sendResponse(httpStatus.NOT_FOUND, 'No post with such id', null, null));
        }

        return res.json(sendResponse(httpStatus.OK, 'success', post, null));
    } catch (error) {
        next(error);
    }
}

module.exports = {publishPost, fetchPost, deletePost, editPost};