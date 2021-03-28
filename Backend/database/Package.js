const mongoose = require('mongoose');

const package = new mongoose.Schema({
  serialNumber: {
    type: String, required: true
  },
  userPhoneNo:{
      type: String
  },
  packageTag:{
    type: String, required: true
  }
});

module.exports = Package = mongoose.model('Package', package);