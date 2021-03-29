const mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose, 2);

const user = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  emailID: {
    type: String,
  },
  userType: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  wallet: {
    type: Float,
    default: 0.0,
  },
  orders: [
    {
      orderID: {
        type: String,
      },
    },
  ],
  promos: [
    {
      title: {
        type: String,
      },
      description: {
        type: String,
      },
      promoCode: {
        type: String,
      },
    },
  ],
});

module.exports = User = mongoose.model('User', user);
