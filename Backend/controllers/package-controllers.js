const mongoose = require('mongoose');
const Package = require('../database/Package');
const User = require('../database/User');

const changeTagPackage= async(req, res, next) => {
    const {serialNumber, packageTag} = req.body;
    const identifiedPackage = await Package.findOne({serialNumber}).exec().catch((error) => {
        return next(error);
    });
    identifiedPackage.packageTag= packageTag;
    identifiedPackage.save();

    if(identifiedPackage.packageTag==="Restaurant"){
        const {restaurantPhoneNo, order} = req.body;
        identifiedPackage.userPhoneNo= order.customerPhoneNo;
        let identifiedRestaurant = await User.findOne({phoneNo: restaurantPhoneNo, userType: "Restaurant"}).exec().catch((error) => {
            return next(error);
        });
        
        async function getOrderfromOrderID(item){
            return await Order.findOne({_id:mongoose.Types.ObjectId(item.orderID)}).exec().catch((error) => {
                return next(error);
            });
        }
        let pendingOrders=[]
        for (index = 0; index < identifiedRestaurant.orders.length; index++) {
            pendingOrders.push(await getOrderfromOrderID(identifiedRestaurant.orders[index]));
        }
    }
    res.json({
        message: 'Logged in successfully!',
    });  
}

exports.changeTagPackage = changeTagPackage;