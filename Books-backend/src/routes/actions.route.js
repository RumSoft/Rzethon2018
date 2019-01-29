const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();
const ActionsController = require('../controllers/actions.controller');

router.get('/book', ActionsController.getAllBooksData);
router.delete('/book', ActionsController.removeBookFromStore);
router.post('/book', upload.single('bookFile'), ActionsController.addBookToStore);
router.patch('/book', ActionsController.editBookData);

module.exports = router;
