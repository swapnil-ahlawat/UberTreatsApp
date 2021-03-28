const mongoose = require('mongoose');
const User = require('../database/User');

const login = async(req, res, next) => {
    const {phoneNo, password, userType } = req.body;

    const identifiedUser = await User.find({phoneNo, password, userType}).exec();
    console.log(identifiedUser);
    if(identifiedUser.length===0){
        const error = Error('Invalid credentials.');
        error.code = 401;
        throw error;
    }
    res.json({
        message: 'Logged in successfully!',
        name: identifiedUser.name,
        phoneNumber: identifiedUser.phoneNo
    });
}

exports.login = login;