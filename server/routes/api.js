const express = require('express');
const router = express.Router();

router.use('/translateds', require('./translateds'));
router.use('/translations', require('./translations'));

module.exports = router;
