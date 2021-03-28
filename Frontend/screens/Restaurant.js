import React, {useState, useEffect}from "react";
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Platform,
    StatusBar,
    Image,
    Animated,
    Modal,
    TouchableWithoutFeedback,
} from "react-native";
import { isIphoneX } from 'react-native-iphone-x-helper'

import { icons, COLORS, SIZES, FONTS } from '../constants'

const Restaurant = ({ route, navigation }) => {

    const scrollX = new Animated.Value(0);
    const [restaurant, setRestaurant] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [orderItems, setOrderItems] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [checked, setChecked]= useState(route.params.item.reusablePackage);

    useEffect(() => {
        let {item, currentLocation } = route.params;
        global.orderItems=[]
        setRestaurant(item)
        setCurrentLocation(currentLocation)
    })

    function editOrder(action, menuId, price) {
        let orderList = orderItems.slice()
        let item = orderList.filter(a => a.menuId == menuId)

        if (action == "+") {
            if (item.length > 0) {
                let newQty = item[0].qty + 1
                item[0].qty = newQty
                item[0].total = item[0].qty * price
            } else {
                const newItem = {
                    menuId: menuId,
                    qty: 1,
                    price: price,
                    total: price
                }
                orderList.push(newItem)
            }

            setOrderItems(orderList)
        } else {
            if (item.length > 0) {
                if (item[0]?.qty > 0) {
                    let newQty = item[0].qty - 1
                    if(newQty===0){
                        orderList= orderList.filter(a=> a.menuId!= item[0].menuId)
                    }
                    else{
                        item[0].qty = newQty
                        item[0].total = newQty * price
                    }
                }
            }

            setOrderItems(orderList)
        }
    }

    function getOrderQty(menuId) {
        let orderItem = orderItems.filter(a => a.menuId == menuId)

        if (orderItem.length > 0) {
            return orderItem[0].qty
        }

        return 0
    }

    function getBasketItemCount() {
        let itemCount = orderItems.reduce((a, b) => a + (b.qty || 0), 0)

        return itemCount
    }

    function sumOrder() {
        let total = orderItems.reduce((a, b) => a + (b.total || 0), 0)

        return total.toFixed(2)
    }

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row' }}>
                {/* Restaurant Name Section */}
                <View
                    style={{
                        flex: 1,
                    }}
                >
                    <View
                        style={{
                            height: 50,
                            width: "90%",
                            justifyContent: 'center',
                            paddingLeft: SIZES.padding * 3,
                            borderBottomRightRadius: SIZES.radius,
                            backgroundColor: COLORS.primary
                        }}
                    >
                        <Text style={{ ...FONTS.h3,color: COLORS.white }}>{restaurant?.name}</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingRight: SIZES.padding,
                        justifyContent: 'center'
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={icons.close}
                        resizeMode="contain"
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: COLORS.gray
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function renderFoodInfo() {
        return (
            <Animated.ScrollView
                horizontal
                pagingEnabled
                scrollEventThrottle={16}
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { x: scrollX } } }
                ], { useNativeDriver: false })}
            >
                {
                    restaurant?.menu.map((item, index) => (
                        <View
                            key={`menu-${index}`}
                            style={{ alignItems: 'center' }}
                        >
                            <View style={{ height: SIZES.height * 0.35 }}>
                                {/* Food Image */}
                                <Image
                                    source={item.photo}
                                    resizeMode="cover"
                                    style={{
                                        width: SIZES.width,
                                        height: "100%"
                                    }}
                                />

                                {/* Quantity */}
                                <View
                                    style={{
                                        position: 'absolute',
                                        bottom: - 20,
                                        width: SIZES.width,
                                        height: 50,
                                        justifyContent: 'center',
                                        flexDirection: 'row'
                                    }}
                                >
                                    <TouchableOpacity
                                        style={{
                                            width: 50,
                                            backgroundColor: COLORS.white,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderTopLeftRadius: 25,
                                            borderBottomLeftRadius: 25
                                        }}
                                        onPress={() => editOrder("-", item.menuId, item.price)}
                                    >
                                        <Text style={{ ...FONTS.body1,color: COLORS.black }}>-</Text>
                                    </TouchableOpacity>

                                    <View
                                        style={{
                                            width: 50,
                                            backgroundColor: COLORS.white,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Text style={{ ...FONTS.h2 }}>{getOrderQty(item.menuId)}</Text>
                                    </View>

                                    <TouchableOpacity
                                        style={{
                                            width: 50,
                                            backgroundColor: COLORS.white,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderTopRightRadius: 25,
                                            borderBottomRightRadius: 25
                                        }}
                                        onPress={() => editOrder("+", item.menuId, item.price)}
                                    >
                                        <Text style={{ ...FONTS.body1,color: COLORS.black }}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Name & Description */}
                            <View
                                style={{
                                    width: SIZES.width,
                                    alignItems: 'center',
                                    marginTop: 15,
                                    paddingHorizontal: SIZES.padding * 2
                                }}
                            >
                                <Text style={{ marginVertical: 10, textAlign: 'center', ...FONTS.h2,color: COLORS.white }}>{item.name} - {item.price.toFixed(2)}</Text>
                                <Text style={{ ...FONTS.body3,color: COLORS.white }}>{item.description}</Text>
                            </View>

                            {/* Calories */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginTop: 10
                                }}
                            >
                                <Image
                                    source={icons.fire}
                                    style={{
                                        width: 20,
                                        height: 20,
                                        marginRight: 10
                                    }}
                                />

                                <Text style={{
                                    ...FONTS.body3, color: COLORS.white
                                }}>{item.calories.toFixed(2)} cal</Text>
                            </View>
                        </View>
                    ))
                }
            </Animated.ScrollView>
        )
    }

    function renderDots() {

        const dotPosition = Animated.divide(scrollX, SIZES.width)

        return (
            <View style={{ height: 30 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: SIZES.padding
                    }}
                >
                    {restaurant?.menu.map((item, index) => {

                        const opacity = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: "clamp"
                        })

                        const dotSize = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
                            extrapolate: "clamp"
                        })

                        const dotColor = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
                            extrapolate: "clamp"
                        })

                        return (
                            <Animated.View
                                key={`dot-${index}`}
                                opacity={opacity}
                                style={{
                                    borderRadius: SIZES.radius,
                                    marginHorizontal: 6,
                                    width: dotSize,
                                    height: dotSize,
                                    backgroundColor: dotColor
                                }}
                            />
                        )
                    })}
                </View>
            </View>
        )
    }

    function renderOrder() {
        return (
            <View>
                {
                    renderDots()
                }
                <View
                    style={{
                        backgroundColor: COLORS.white,
                        borderTopLeftRadius: 40,
                        borderTopRightRadius: 40
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: SIZES.padding * 2,
                            paddingHorizontal: SIZES.padding * 3,
                            borderBottomColor: COLORS.lightGray2,
                            borderBottomWidth: 1
                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}>{getBasketItemCount()} items in Cart</Text>
                        <Text style={{ ...FONTS.h3 }}>${sumOrder()}</Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: SIZES.padding * 2,
                            paddingHorizontal: SIZES.padding * 3
                        }}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                source={icons.pin}
                                resizeMode="contain"
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: COLORS.darkgray
                                }}
                            />
                            <Text style={{ marginLeft: SIZES.padding, ...FONTS.h4 }}>{currentLocation}</Text>
                        </View>
                    </View>

                    {/* Order Button */}
                    <View
                        style={{
                            padding: SIZES.padding * 2,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: SIZES.width * 0.9,
                                padding: SIZES.padding,
                                backgroundColor: COLORS.primary,
                                alignItems: 'center',
                                borderRadius: SIZES.radius
                            }}
                            onPress={()=>{
                                if(orderItems.length===0){
                                    alert("No food item selected!")
                                }
                                else{
                                    if(checked){
                                        setModalVisible(true)
                                    }
                                    else{
                                        navigation.navigate("Cart", {
                                        restaurant: restaurant,
                                        currentLocation: currentLocation,
                                        orderItems: orderItems,
                                        reusablePackage: checked
                                    })
                                    }
                                }}}
                        >
                            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Go to Cart</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {isIphoneX() &&
                    <View
                        style={{
                            position: 'absolute',
                            bottom: -34,
                            left: 0,
                            right: 0,
                            height: 34,
                            backgroundColor: COLORS.white
                        }}
                    >
                    </View>
                }
            </View>
        )
    }
    function renderPackageModal() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <TouchableWithoutFeedback
                    onPress={() => {
                        setModalVisible(false);
                    }}
                >
                    <View style={{ flex: 1, flexDirection: 'column-reverse'}}>
                        <View
                            style={{
                                height: 500,
                                width: "100%",
                                backgroundColor: COLORS.white,
                                borderRadius: SIZES.radius,
                            }}
                        >   
                            <View style={{marginTop: 5*SIZES.padding, marginLeft: 3*SIZES.padding}}>
                                <Text
                                    style={{
                                        color: COLORS.black,
                                        ...FONTS.body2,
                                }}>Do you want to Opt for Reusable Packaging?
                                </Text>
                                <Text
                                    style={{
                                        color: COLORS.black,
                                        ...FONTS.body4,
                                }}>The restaurant offers an option for reusable packaging. You'll be charged $4 extra for it.</Text>
                                 <Text
                                    style={{
                                        color: COLORS.black,
                                        ...FONTS.body4,
                                }}>But don't worry! It'll be refunded as soon as you'll return the package. </Text>
                                <Text
                                    style={{
                                        color: COLORS.black,
                                        ...FONTS.body4,
                                }}>You'll also be rewarded with Uber vouchers and cashbacks coupons for being a part of our Green Initiative!
                                </Text>
                                <View style={{flex:1, flexDirection:"row", paddingTop:SIZES.padding}}>                          
                                    <TouchableOpacity
                                        style={{
                                            padding: SIZES.padding*2,
                                            margin: SIZES.padding,
                                            backgroundColor: (checked)? COLORS.primary: COLORS.white,
                                            width:"40%",
                                            height:50,
                                            borderRadius:SIZES.radius,
                                            justifyContent:"center",
                                            borderWidth:0.5
                                        }}
                                        onPress= {()=>{setChecked(true)}}
                                    >
                                        <Text style={{textAlign:"center", ...FONTS.body2}}>Yes</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                    style={{
                                        margin: SIZES.padding,
                                        backgroundColor: (!checked)? COLORS.primary: COLORS.white,
                                        width:"40%",
                                        height:50,
                                        borderRadius:SIZES.radius,
                                        justifyContent:"center",
                                        borderWidth:1
                                    }}
                                    onPress= {()=>{setChecked(false)}}>
                                        <Text style={{textAlign:"center", ...FONTS.body2}}>No</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ margin: SIZES.padding*2, marginTop: SIZES.padding*15 }}>
                                <TouchableOpacity
                                    style={{
                                        height: 60,
                                        width: "100%",
                                        backgroundColor: COLORS.primary,
                                        borderRadius: SIZES.radius,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    onPress={() => {
                                        setModalVisible(false);
                                        navigation.navigate("Cart", {
                                        restaurant: restaurant,
                                        currentLocation: currentLocation,
                                        orderItems: orderItems,
                                        reusablePackage: checked
                                    })}}
                                >
                                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Continue</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderFoodInfo()}
            {renderOrder()}
            {renderPackageModal()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
        marginTop: (Platform.OS==="android")?StatusBar.currentHeight:0
    }
})

export default Restaurant;