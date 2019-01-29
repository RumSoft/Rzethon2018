const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const actionsRouter = require('./src/routes/actions.route');
const beaconsRouter = require('./src/routes/beacons.route');
const readingRouter = require('./src/routes/reading.route');
const authorDataRouter = require('./src/routes/author-data.route');

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://127.0.0.1:27017/books', {
  useCreateIndex: true,
  useNewUrlParser: true
});

app.use('/actions', actionsRouter);
app.use('/beacons', beaconsRouter);
app.use('/reading', readingRouter);
app.use('/author', authorDataRouter);

module.exports = app;
