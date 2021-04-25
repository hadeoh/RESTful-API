const { Router } = require('express');
const { celebrate } = require('celebrate');
const postValidation = require('../validations/tweet.validation');
const auth  = require('../middlewares/auth.policy');
const { publishPost } = require('../controllers/post.controller');
const multer = require('multer');

const upload = multer({ dest: 'uploads/'});

const router = Router();

router.use(auth);

router
  .route('/')
  .post(upload.single('image'), celebrate(postValidation.post, { abortEarly: false }), publishPost);

module.exports = router;