const BookSchema = require('../models/book.model');
const ErrorHandler = require('../helpers/errors.helper');

/**
 * Adds new book to database
 * @api post
 * @param {JSON} req title - string, desc - string, author - string, bookFileName - string, print - ?string
 * @param {*} res 
 * @param {*} next 
 */
const addBookToStore = async (req, res, next) => {

    const { title, desc, author, print } = req.body;
    let book;
    if (print !== undefined) {
        book = new BookSchema({ title, desc, author, file: req.file, print });
    } else {
        book = new BookSchema({ title, desc, author, file: req.file, print: null });
    }
    console.log(book);


    try {
        await book.save();
        res.status(200).send({
            success: true,
            msg: `Added ${title} to store`
        });
    } catch (error) {
        console.error('[ERROR] Actions: Error occured while adding book to store');
        ErrorHandler.throwError(res, error);
    }
    console.log('[SUCCESS] Actions: Added book to store');
}

/**
 * Gets all books from database
 * @api get
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getAllBooksData = async (req, res, next) => {
    try {
        const booksData = await BookSchema.find();
        res.status(200).send({
            success: true,
            data: booksData
        });
    } catch (error) {
        console.error('[ERROR] Actions: Error occured while getting books from store')
        ErrorHandler.throwError(res, error);
    }
    console.log('[SUCCESS] Actions: Returned all books from store');
}

/**
 * Removes book from database
 * @api delete
 * @param {JSON} req id - string
 * @param {*} res 
 * @param {*} next 
 */
const removeBookFromStore = async (req, res, next) => {
    const bookId = req.body.id;
    console.log(bookId);
    try {
        await BookSchema.findOneAndDelete({ _id: bookId });
        res.status(200).send({
            success: true,
            msg: 'Successfuly removed book from store'
        });
    } catch (error) {
        console.error('[ERROR] Actions: Error occured while removing book from store')
        ErrorHandler.throwError(res, error);
    }
    console.log('[SUCCESS] Actions: Removed book from store');
}

/**
 * Updates book data in database
 * @api patch
 * @param {JSON} req id - string, data - object
 * @param {*} res 
 * @param {*} next 
 */
const editBookData = async (req, res, next) => {
    const bookId = req.body.id;
    const updateData = req.body.data.data;
    try {
        console.log(req.body.data.data);
        const updatedBook = await BookSchema.findOneAndUpdate(bookId, { $set: updateData }).exec();
        console.log(updatedBook);
        res.status(200).send({
            success: true,
            msg: 'Successfuly updated book in store',
            update: updatedBook
        });
    } catch (error) {
        console.error('[ERROR] Actions: Error occured while editing book in store')
        ErrorHandler.throwError(res, error);
    }
    console.log('[SUCCESS] Actions: Edited book in store');
}

module.exports = { addBookToStore, getAllBooksData, removeBookFromStore, editBookData };
