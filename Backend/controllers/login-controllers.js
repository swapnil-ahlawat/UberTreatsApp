const mongoose = require('mongoose');
const User = require('../database/User');

//controller for signing in the app
const login = async (req, res, next) => {
  const { phoneNo, password, userType } = req.body;
  const identifiedUser = await User.find({ phoneNo, password, userType })
    .exec()
    .catch((error) => {
      return next(error);
    });
  if (identifiedUser.length === 0) {
    return res.status(404).send({
      message: 'Invalid Credentials',
    });
  }
  res.json({
    message: 'Logged in successfully!',
    user: identifiedUser[0],
  });
};

exports.login = login;
