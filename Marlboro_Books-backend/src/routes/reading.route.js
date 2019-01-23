const express = require('express');
const ReadingController = require('../controllers/reading.controller');
const router = express.Router();

router.get('/ebook/:id', ReadingController.getEbookById);

module.exports = router;