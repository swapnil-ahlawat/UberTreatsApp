const mongoose = require('mongoose');
const User = require('../database/User');
const Order= require('../database/Order');

// const userDetails = (req, res, next) => {
//     const id = req.query['id'];

//     const identifiedUser = DUMMY_USERS.find(u => u.id === id);
//     if(!identifiedUser){
//         const error = Error('User not found.');
//         error.code = 404;
//         throw error;
//     }
//     res.json(identifiedUser);
// }
const placeOrder= async(req, res, next) =>{
    const {reusablePackageFlag, restaurantPhoneNo, restaurantCourier, orderItems, customer, walletUsed, total} = req.body;
    let order={customerName:customer.name, customerAddress: customer.address, reusablePackageFlag, foodItems: orderItems}
    let orderModel = new Order(order);
    await orderModel.save();
    
    let identifiedRestaurant = await User.findOne({phoneNo: restaurantPhoneNo, userType: "Restaurant"}).exec().catch((error) => {
        console.log("Error catched.", error);
    });

    identifiedRestaurant.orders.push({orderID: orderModel._id.toString()});
    await identifiedRestaurant.save();

    let identifiedPersonnel = await User.findOne({name: restaurantCourier, userType: "Personnel"}).exec().catch((error) => {
        console.log("Error catched.", error);
    });

    identifiedPersonnel.orders.push({orderID: orderModel._id.toString()});
   
    await identifiedPersonnel.save();
    if(walletUsed){
        let identifiedUser = await User.findOne({phoneNo: customer.phoneNo}).exec().catch((error) => {
            console.log("Error catched.", error);
        });
        identifiedUser.wallet = identifiedUser.wallet- parseFloat(total);
        await identifiedUser.save();
    }

    res.json({
        message: "OrderPlaced!"
    });
}

exports.placeOrder = placeOrder;