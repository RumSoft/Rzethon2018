const throwError = (res, err) => {
    res.status(500).send({ success: false, msg: 'Internal server error' });
    return new Error(err);
}

module.exports = { throwError };