const mongoose = require('mongoose');

const user = new mongoose.Schema({
  name: {
    type: String, required: true
  },
  phoneNo:{
      type: String, required: true
  },
  password:{
      type: String, required: true
  },
  emailID:{
      type: String
  },
  userType:{
    type: String, required: true
  }
});

module.exports = User = mongoose.model('User', user);