const mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose, 2); 

const order = new mongoose.Schema({
    customerName: {
        type:String
    },
    customerAddress:{
        type:String
    },
    customerPhoneNo:{
        type:String
    },
    reusablePackageSerialNumber:{
        type: String
    },
    foodItems: [{
        quantity: {
            type: Number, required: true
        },
        name: {
            type: String, required: true
        },
        price:{
            type: Float, required: true       
        }
    }]
});

module.exports = Order = mongoose.model('Order', order);