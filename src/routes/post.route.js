const { Router } = require('express');
const { celebrate } = require('celebrate');
const postValidation = require('../validations/tweet.validation');
const auth  = require('../middlewares/auth.policy');
const { publishPost, fetchPost, deletePost, editPost } = require('../controllers/post.controller');
const multer = require('multer');

const upload = multer({ dest: 'uploads/'});

const router = Router();

router.use(auth);

router
  .route('/')
  .post(upload.single('image'), celebrate(postValidation.post, { abortEarly: false }), publishPost);

router
  .route('/:id')
  .get(fetchPost);

router
  .route('/:id')
  .delete(deletePost);

router  
  .route('/:id')
  .put(editPost)

module.exports = router;