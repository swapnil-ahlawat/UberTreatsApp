const mongoose = require('mongoose');
const Package = require('../database/Package');
const User = require('../database/User');

const scanPackage= async(req, res, next) => {
    const {serialNumber, phoneNo, packageTag} = req.body;

    const identifiedPackage = await Package.findOne({serialNumber}).exec().catch((error) => {
        return next(error);
    });

    identifiedPackage.userPhoneNo= phoneNo;
    identifiedPackage.packageTag= packageTag;
    identifiedPackage.save();

    res.json({
        message: 'Tag changed sucessfully!',
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
        message: 'Added the packages successfully!',
    });
}


const removePackage = async(req, res, next) => {
    const {serialNumber} = req.body;
    await Package.deleteOne({serialNumber}, function(error) {
        if(error){
            sendStatus(404);
        }
    })
    
    res.json({
        message: 'Package removed successfully!',
    });
}


exports.scanPackage = scanPackage;
exports.addPackage = addPackage;
exports.removePackage= removePackage;