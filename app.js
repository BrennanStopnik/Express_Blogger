//this block is where we require in the node_module libraries needed to run express
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//!important: this is where we require in the routers for our epxress app
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


//requireing the blogs,js router
var blogsRouter = require('./routes/blogs')


// this line is  initializing express for us
var app = express();

//this block is seetting up the view engine. do not need to worry about that
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//this block is setting upo teh view engine. do not need to worry about that
//view engine setup
app.use(logger('dev'));
app.use(express.json()); //this line and the next will allow us to parse the req.body
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//!important: this block is where we invoke the router we create the app.use method will take the routes we define in our routers and include them in our server when we run it.
app.use('/', indexRouter);
app.use('/users', usersRouter);

//include blogs roouter in the server routes
app.use('/blogs', blogsRouter);


//this code is for creating 404 error pages when the url path does not match a path
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

//this block is for catching and handlikng errors
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//this code exports
module.exports = app;