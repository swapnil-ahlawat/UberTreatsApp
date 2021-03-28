const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./database/connection');
const User = require('./database/User');

const loginRouter = require('./routes/login-routes');
const userRouter = require('./routes/user-routes');
// const restaurantRouter = require('./routes/restaurant-routes');
// const deliveryRouter = require('./routes/delivery-routes');

const app = express();

const DUMMY_USERS = [
    {
        name: 'Piyush Maheshwari',
        emailID: 'piyush',
        phoneNo: '9818284672',
        password: 'treats',
        type: 'customer'        // restaurant, warehouse, delivery
    },
    {
        name: 'Wandan Tibrewal',
        emailID: 'wandan',
        phoneNo: '9818284672',
        password: 'treats',
        type: 'restaurant'
    },
    {
        name: 'Swapnil Ahlawat',
        emailID: 'swapnil',
        phoneNo: '9818284672',
        password: 'treats',
        type: 'customer'
    }
]

connectDB();
// User.insertMany(DUMMY_USERS);
app.use(bodyParser.json({extended:true}));
app.use('/login', loginRouter);
app.use('/user', userRouter);
// app.use('/restaurant', restaurantRouter);
// app.use('/delivery', deliveryRouter);

app.use((error, req, res, next) => {
    if(res.headerSent){
        return console.error(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || "An unknown error occurred."})
});

app.listen(5000);