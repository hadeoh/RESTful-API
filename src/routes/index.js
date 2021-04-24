const { Router } = require('express');
const authRoutes = require('../routes/auth.route');


const router = Router();

/** GET /health-check - Check service health */
router.get('/health-check', (_req, res) => res.send({ check: 'server started ok' }));

router.use('/auth', authRoutes);

module.exports = router;