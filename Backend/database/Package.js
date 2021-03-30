const mongoose = require('mongoose');
/*
Schema for package
  serialNumber: unique ID of package,
  userPhoneNo: phone Number of user who has this package currently
  packageTag: tag to see progress of package in distribution cycle
  count: how many times the package has been used till now
*/
const package = new mongoose.Schema({
  serialNumber: {
    type: String,
    required: true,
  },
  userPhoneNo: {
    type: String,
  },
  packageTag: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
});

module.exports = Package = mongoose.model('Package', package);
