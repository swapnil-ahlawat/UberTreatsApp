const express = require('express');
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
        phoneNo: '9818284670',
        password: 'treats',
        userType: 'Personnel',
        wallet: 500.00  
    },
    {
        name: 'Wandan Tibrewal',
        emailID: 'wandan',
        phoneNo: '9818284671',
        password: 'treats',
        userType: 'Restaurant',
        orders:[]
    },
    {
        name: 'Swapnil Ahlawat',
        emailID: 'swapnil',
        phoneNo: '9818284672',
        password: 'treats',
        userType: 'Customer', 
        wallet: 500.10
    }
]
connectDB();
// User.insertMany(DUMMY_USERS);

app.use(express.json({extended:false}));
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