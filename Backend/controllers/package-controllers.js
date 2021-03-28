const mongoose = require('mongoose');
const Package = require('../database/Package');
const User = require('../database/User');

const scanPackage= async(req, res, next) => {
    const {serialNumber, restaurantPhoneNo, order} = req.body;
    const identifiedPackage = await Package.findOne({serialNumber}).exec().catch((error) => {
        return next(error);
    });

    identifiedPackage.userPhoneNo= order.customerPhoneNo;
    identifiedPackage.packageTag= "Personnel";
    identifiedPackage.save();

    if(identifiedPackage.packageTag==="Restaurant"){
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

const addPackage= async(req, res, next) => {
    const {lotNumber, restaurantPhoneNo, numPackages} = req.body;
    
    let identifiedRestaurant = await User.findOne({phoneNo: restaurantPhoneNo, userType: "Restaurant"}).exec().catch((error) => {
        return next(error);
    });

    if(!identifiedRestaurant)
    {
        return res.sendStatus(404);
    }
    for(i=0; i<parseInt(numPackages); i++)
    {
        let newPackage = new Package({
            serialNumber: lotNumber.concat(("00" + i).slice (-3)),
            userPhoneNo: restaurantPhoneNo,
            packageTag: "Restaurant"
        }); 
        await newPackage.save();
    }
    
    res.json({
        message: 'Added the packages successfully',
    });
}

exports.scanPackage = scanPackage;
exports.addPackage = addPackage;