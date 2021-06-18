const cors = require("cors");
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()

global.__basedir = __dirname;


var indexRouter = require('./routes/index');
var bucketRouter = require('./routes/bucket');
var objectRouter = require('./routes/object');
var userRouter = require('./routes/user');

var app = express();


// app.use(cors(corsOptions));
app.use(cors());
app.options('*', cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'resources')));

app.use('/', indexRouter);
app.use('/api/v1/buckets', bucketRouter);
app.use('/api/v1/objects', objectRouter);
app.use('/api/v1/users', userRouter);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
