const mongoose = require('mongoose');
const Order = require('../database/Order');

const removeOrder = async(req, res, next) => {
    const {orderID} = req.body;
    await Order.deleteOne({_id: mongoose.Types.ObjectId(orderID)}, function(error) {
        if(error){
            sendStatus(404);
        }
    })
    
    res.json({
        message: 'Order removed successfully!',
    });
}

exports.removeOrder = removeOrder;