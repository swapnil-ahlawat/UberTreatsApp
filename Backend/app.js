const express = require('express');
const connectDB = require('./database/connection');

const loginRouter = require('./routes/login-routes');
const userRouter = require('./routes/user-routes');
const packageRouter = require('./routes/package-routes');

const app = express();
/*
const DUMMY_USERS = [
  {
    name: 'Warehouse',
    phoneNo: '98980',
    password: 'admin',
    userType: 'Warehouse',
  },
  {
    name: 'Swapnil Ahlawat',
    emailID: 'swapnil.ahlawat@gmail.com',
    phoneNo: '98981',
    password: 'admin',
    userType: 'Customer',
    address: 'Dwarka, New Delhi',
    wallet: 500.0,
    promos: [
      {
        title: 'Special Reward',
        description: 'Get extra 10%* off on your next order!',
        promoCode: 'REUSE1',
      },
    ],
  },
  {
    name: "Harley's Burgers",
    phoneNo: '98982',
    password: 'admin',
    userType: 'Restaurant',
  },
  {
    name: 'Mama Mia Pizza',
    phoneNo: '98983',
    password: 'admin',
    userType: 'Restaurant',
  },
  {
    name: 'Grand Hotdogs',
    phoneNo: '98984',
    password: 'admin',
    userType: 'Restaurant',
  },
  {
    name: 'Manchow Cuisine',
    phoneNo: '98985',
    password: 'admin',
    userType: 'Restaurant',
  },
  {
    name: 'Andy',
    phoneNo: '98986',
    password: 'admin',
    userType: 'Delivery Personnel',
  },
];
*/
connectDB();
// User.insertMany(DUMMY_USERS);

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/package', packageRouter);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return console.error(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred.' });
});

app.listen(5000);
