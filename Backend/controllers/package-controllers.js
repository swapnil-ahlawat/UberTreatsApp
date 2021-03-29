const mongoose = require('mongoose');
const Package = require('../database/Package');
const User = require('../database/User');

const scanPackage= async(req, res, next) => {
    const {serialNumber, phoneNo, packageTag} = req.body;

    const identifiedPackage = await Package.findOne({serialNumber}).exec().catch((error) => {
        return next(error);
    });
    if(!identifiedPackage){
        return res.status(404).send({
            message: "Package Not Found."
         });
    }

    let userPhoneNo= identifiedPackage.userPhoneNo;
    identifiedPackage.userPhoneNo= phoneNo;
    identifiedPackage.packageTag= packageTag;
    if(packageTag==="Warehouse"){
        identifiedPackage.count+=1;
        identifiedPackage.userPhoneNo=null;
    }
    identifiedPackage.save();
    console.log(userPhoneNo);
    res.json({
        message: 'Tag changed sucessfully!',
        userPhoneNo: userPhoneNo
    });  

}

const addPackage= async(req, res, next) => {
    const {lotNumber,  numPackages} = req.body;
    
    for(i=0; i<parseInt(numPackages); i++)
    {
        let newPackage = new Package({
            serialNumber: lotNumber.concat(("00" + i).slice (-3)),
            userPhoneNo: null,
            packageTag: "Warehouse"
        }); 
        await newPackage.save();
    }
    
    res.json({
        message: 'Added the packages successfully!',
    });
}

const sendPackage= async(req, res, next) => {
    const {phoneNo,  numPackages} = req.body;
    
    let identifiedRestaurant = await User.findOne({phoneNo: phoneNo, userType: "Restaurant"}).exec().catch((error) => {
        return next(error);
    });

    if(!identifiedRestaurant){
        return res.status(404).send({
            message: "Restaurant not found!"
         });
    }
    let packages = await Package.find({packageTag:"Warehouse"}).exec().catch((error) => {
        return next(error);
    });

    if(packages.length<numPackages){
        return res.status(404).send({
            message: "Not enough packages!"
         });
    }

    for(i=0; i<parseInt(numPackages); i++)
    {
        packages[i].packageTag= "Restaurant";
        packages[i].userPhoneNo= phoneNo; 
        await packages[i].save();
    }
    
    res.json({
        message: 'Packages sent successfully!',
        restaurantName: identifiedRestaurant.name
    });
}

exports.scanPackage = scanPackage;
exports.addPackage = addPackage;
exports.sendPackage= sendPackage;