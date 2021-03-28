const express = require('express');
const bodyParser = require('body-parser');

const loginRouter = require('./routes/login-routes');
const userRouter = require('./routes/user-routes');
// const restaurantRouter = require('./routes/restaurant-routes');
// const deliveryRouter = require('./routes/delivery-routes');

const app = express();
app.use(bodyParser.json())

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