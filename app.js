var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport');
const { pool } = require('./config')

const jwt = require('jsonwebtoken');

const usersRouter = require('./routes/users');
const categoriesRouter = require('./routes/categories');
const restaurantsRouter = require('./routes/restaurants');
const productsRouter = require('./routes/products');
const menuRouter = require('./routes/menu');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const uploadRouter = require('./routes/upload');
const ordersRouter = require('./routes/orders');

var app = express()

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use('/users', usersRouter);
app.use('/restaurants', restaurantsRouter);
app.use('/products', productsRouter);
app.use('/menu', menuRouter);
app.use('/categories', categoriesRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/upload', uploadRouter);
app.use('/orders', ordersRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

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