const { Router } = require('express');
const authRoutes = require('../routes/auth.route');
const postRoutes = require('../routes/post.route');


const router = Router();

/** GET /health-check - Check service health */
router.get('/health-check', (_req, res) => res.send({ check: 'server started ok' }));

router.use('/auth', authRoutes);

router.use('/posts', postRoutes);

module.exports = router;