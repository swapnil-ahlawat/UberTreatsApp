const mongoose = require('mongoose');
const User = require('../database/User');



const login = async(req, res, next) => {
    const {phoneNo, password, userType } = req.body;

    const identifiedUser = User.findOne({phoneNo, password, userType}).pretty();

    if(!identifiedUser){
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