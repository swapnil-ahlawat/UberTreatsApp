const mongoose = require('mongoose');

const user = new mongoose.Schema({
  name: {
    type: String
  },
  phoneNo:{
      type: String
  },
  password:{
      type: String
  },
  emailID:{
      type: String
  },
  userType:{
    type: String
  }
});
module.exports = User = mongoose.model('user', user);