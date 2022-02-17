require('./startup/base_config')();
require('./startup/db')();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');

const productsController = require('./controllers/products');
const usersController = require('./controllers/users');
const ordersController = require('./controllers/orders');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerSchemas = require('./models/swaggerSchemas')
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CopNoDrop Api',
      version: '1.0.0',
    },
    components: {
      schemas: swaggerSchemas,
    }
  },
  apis: ['./controllers/*.js']
};

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, DELETE, POST, FETCH, OPTIONS');
  next();
});

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/products', productsController);
app.use('/users', usersController);
app.use('/orders', ordersController);

const swaggerSpec = swaggerJsdoc(options);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
