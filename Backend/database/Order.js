const mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose, 2);

//schema for orders
const order = new mongoose.Schema({
  customerName: {
    type: String,
  },
  customerAddress: {
    type: String,
  },
  customerPhoneNo: {
    type: String,
  },
  restaurantName: {
    type: String,
  },
  reusablePackageFlag: {
    type: Boolean,
    default: false,
  },
  foodItems: [
    {
      quantity: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Float,
        required: true,
      },
    },
  ],
  total: {
    type: Number,
  },
  subtotal: {
    type: Number,
  },
});

module.exports = Order = mongoose.model('Order', order);
