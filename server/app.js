const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
//const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
//const expressValidator = require('express-validator');
require('dotenv').config();
// import routes
const authRoutes = require('./routes/auth');
//const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
// const braintreeRoutes = require('./routes/braintree');
// const orderRoutes = require('./routes/order');

// app
const app = express();

// db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Connected to local MongoDB on Windows'));

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
//app.use(expressValidator());
app.use(cors());

// routes middleware
app.use(process.env.API, authRoutes);
//app.use(process.env.API, userRoutes);
app.use(process.env.API, categoryRoutes);
app.use(process.env.API, productRoutes);
// app.use('/api', braintreeRoutes);
// app.use('/api', orderRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
