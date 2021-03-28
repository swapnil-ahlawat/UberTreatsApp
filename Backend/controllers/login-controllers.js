const mongoose = require('mongoose');
const User = require('../database/User');

const login = async(req, res, next) => {
    const {phoneNo, password, userType} = req.body;
    console.log(phoneNo)
    console.log(password)
    console.log(userType)
    const identifiedUser = await User.find({phoneNo, password, userType}).exec().catch((error) => {
        console.log("Error catched.", error);
    });
    console.log(identifiedUser);
    if(identifiedUser.length===0){
        const error = Error('Invalid credentials.');
        error.code = 401;
        return next(error);
    }
    res.json({
        message: 'Logged in successfully!',
        user: identifiedUser[0]
    });
}

exports.login = login;