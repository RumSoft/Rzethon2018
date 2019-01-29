const AuthorDataSchema = require('../models/author-data.model');
const ErrorHandler = require('../helpers/errors.helper');


const getDataAboutUser = async (req, res, next) => {
    try {
        const data = AuthorDataSchema;
        res.status(200).send({
           sucess: true,
           data: data
        });
    } catch (error) {
        console.error(error);
        ErrorHandler.throwError(res, error);
    }
}

module.exports = { getDataAboutUser };