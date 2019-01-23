const express = require('express');
const AuthorDataController = require('../controllers/author-data.controller');
const router = express.Router();

router.get('/data', AuthorDataController.getDataAboutUser);

module.exports = router;