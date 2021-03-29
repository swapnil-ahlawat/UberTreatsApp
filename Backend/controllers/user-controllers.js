const mongoose = require('mongoose');
const User = require('../database/User');
const Order = require('../database/Order');
/*
controller to place order:-
1. creates a new order
2. adds orderID to restaurant's pending orders array
3. adds orderID to delivery personnel's pending orders array
*/
const placeOrder = async (req, res, next) => {
  const {
    reusablePackageFlag,
    restaurantPhoneNo,
    restaurantCourier,
    orderItems,
    customer,
    walletUsed,
    total,
    subtotal,
  } = req.body;

  let identifiedRestaurant = await User.findOne({
    phoneNo: restaurantPhoneNo,
    userType: 'Restaurant',
  })
    .exec()
    .catch((error) => {
      return next(error);
    });
  let identifiedPersonnel = await User.findOne({
    name: restaurantCourier,
    userType: 'Delivery Personnel',
  })
    .exec()
    .catch((error) => {
      return next(error);
    });
  let identifiedUser = await User.findOne({ phoneNo: customer.phoneNo })
    .exec()
    .catch((error) => {
      return next(error);
    });

  if (!identifiedRestaurant || !identifiedPersonnel || !identifiedUser) {
    return res.status(404).send({
      message: 'User not found!',
    });
  }

  let order = {
    customerName: customer.name,
    customerAddress: customer.address,
    customerPhoneNo: customer.phoneNo,
    restaurantName: identifiedRestaurant.name,
    reusablePackageFlag,
    foodItems: orderItems,
    total: total,
    subtotal: subtotal,
  };
  let orderModel = new Order(order);
  await orderModel.save();

  identifiedRestaurant.orders.push({ orderID: orderModel._id.toString() });
  await identifiedRestaurant.save();

  identifiedPersonnel.orders.push({ orderID: orderModel._id.toString() });
  await identifiedPersonnel.save();

  if (walletUsed) {
    identifiedUser.wallet = identifiedUser.wallet - parseFloat(total);
    await identifiedUser.save();
  }
  res.json({
    message: 'OrderPlaced!',
    user: identifiedUser,
  });
};

//controller to get pending orders of restaurant/delivery personnel
const getOrders = async (req, res, next) => {
  const phoneNo = req.query.phoneNo;
  const userType = req.query.userType;

  let identifiedUser = await User.findOne({ phoneNo: phoneNo, userType })
    .exec()
    .catch((error) => {
      return next(error);
    });

  if (!identifiedUser) {
    return res.status(404).send({
      message: 'User not found!',
    });
  }

  let pendingOrders = [];
  for (index = 0; index < identifiedUser.orders.length; index++) {
    let order = await Order.findOne({
      _id: mongoose.Types.ObjectId(item.orderID),
    })
      .exec()
      .catch((error) => {
        return next(error);
      });
    if (order) {
      pendingOrders.push(order);
    }
  }
  res.json({
    pendingOrders,
  });
};

//controller to remove order from restaurant/delivery personnel's order array
const removeOrder = async (req, res, next) => {
  const { orderID, phoneNo } = req.body;

  const identifiedUser = await User.findOne({ phoneNo });
  if (!identifiedUser) {
    return res.status(404).send({
      message: 'User Not Found.',
    });
  }
  identifiedUser.orders = identifiedUser.orders.filter((p) => {
    return p.orderID !== orderID;
  });
  await identifiedUser.save();
  res.json({
    message: 'Order removed Successfully!',
    user: identifiedUser,
  });
};

//controller to add money to user wallet
const addWalletMoney = async (req, res, next) => {
  const { phoneNo, amount } = req.body;

  let identifiedUser = await User.findOne({ phoneNo, userType: 'Customer' })
    .exec()
    .catch((error) => {
      return next(error);
    });
  if (!identifiedUser) {
    return res.status(404).send({
      message: 'User Not Found.',
    });
  }
  let money = identifiedUser.wallet;
  money += parseFloat(amount);
  identifiedUser.wallet = money;
  await identifiedUser.save();
  res.json({
    message: 'Money Added Successfully!',
    user: identifiedUser,
  });
};

//controller to add discound voucher to use promo codes
const givePromoReward = async (req, res, next) => {
  const { phoneNo } = req.body;

  let identifiedUser = await User.findOne({ phoneNo, userType: 'Customer' })
    .exec()
    .catch((error) => {
      return next(error);
    });
  if (!identifiedUser) {
    return res.status(404).send({
      message: 'User Not Found.',
    });
  }
  let discountAmount = Math.floor(Math.random() * 10 + 10);
  let code = Math.floor(Math.random() * 10000);
  let promo = {
    title: 'Special Reward',
    description: 'Get extra ' + discountAmount + '%* off on your next order!',
    promoCode: 'REUSE' + code,
  };
  identifiedUser.promos.push(promo);
  await identifiedUser.save();
  res.json({
    message: 'Promo Rewarded Successfully!',
    user: identifiedUser,
  });
};

exports.placeOrder = placeOrder;
exports.getOrders = getOrders;
exports.removeOrder = removeOrder;
exports.addWalletMoney = addWalletMoney;
exports.givePromoReward = givePromoReward;
