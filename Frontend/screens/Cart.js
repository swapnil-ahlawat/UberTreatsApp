import React, {useState} from "react";
import {
    StyleSheet,
    FlatList,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Platform,
    StatusBar,
    Image,
    Modal,
    TouchableWithoutFeedback
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { icons, COLORS, SIZES, FONTS, LINK } from '../constants'

const Order = ({ route, navigation }) => {

    const [restaurant, setRestaurant] = useState(null);
    const [orderItems, setOrderItems] = useState([]);
    const [reusablePackage, setReusablePackage] = useState(null);
    const [checked, setChecked]= useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    

    React.useEffect(() => {
        let {restaurant, orderItems, reusablePackage} = route.params;
        if(restaurant){
            setReusablePackage(reusablePackage);
            setRestaurant(restaurant)
            setOrderItems(orderItems)
        }
    })

    const placeOrderHandler = async () => {
        let hello={reusablePackageFlag: reusablePackage,
            restaurantPhoneNo: restaurant.phoneNo,
            restaurantCourier: restaurant.courier.name,
            orderItems: orderItems,
            customer: global.user,
            walletUsed: checked,
            total: calculateTotal(),
            subtotal: sumOrder()}
        console.log(hello);
        try {
            const response = await fetch(LINK+'/user/placeOrder', {
              method: 'POST',
              headers: {
                 Accept: 'application/json',
                 'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                reusablePackageFlag: reusablePackage,
                restaurantPhoneNo: restaurant.phoneNo,
                restaurantCourier: restaurant.courier.name,
                orderItems: orderItems,
                customer: global.user,
                walletUsed: checked,
                total: calculateTotal(),
                subtotal: sumOrder()
              })
            });
            const responseData = await response.json();
            if (!response.ok) {
              alert('Error in placing order. Please try again later.')
              throw new Error(responseData.message);
            }
            else{
                if(response.message ==="NotEnough"){
                    alert("Not Enough Money in Wallet!");
                }
                else{
                    setModalVisible(true);
                }
                global.user= responseData.user;  
            }
          } 
        catch (err) {
            console.log(err);
            alert('Error in placing order. Please try again later.')
        }
      
    };
    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row' }}>
                {/* User details section */}
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center'
                    }}
                >
                    <View
                        style={{
                            height: 50,
                            width: "90%",
                            justifyContent: 'center',
                            paddingHorizontal: SIZES.padding * 3,
                            borderBottomRightRadius: SIZES.radius,
                            backgroundColor: COLORS.primary
                        }}
                    >
                        <Text style={{ ...FONTS.h3,color: COLORS.white }}>Order Cart</Text>
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

    function renderInfo(){
        return (
        <View style={{margin: SIZES.padding * 2, marginBottom: SIZES.padding}}>
            <Text style={{color: COLORS.white, ...FONTS.h2, textAlign:"center" }}>{restaurant?.name}</Text>
            <Text style={{marginBottom: SIZES.padding*2, color: COLORS.darkgray, ...FONTS.body3, paddingTop: SIZES.padding,textAlign:"center" }}>Delivery Time: {restaurant?.duration}</Text>
            <Text style={{color: COLORS.white, ...FONTS.body2}}>{global.user.name}</Text>
            <Text style={{color: COLORS.white, ...FONTS.body3}}>{global.user.address}</Text>
            <Text style={{color: COLORS.white, ...FONTS.body3}}>Phone Number : {global.user.phoneNo}</Text>
            <Text style={{marginTop: SIZES.padding, color: COLORS.white, ...FONTS.body2,fontWeight: 'bold'}}>Order Details</Text>
        </View>
        )
    }
    function renderOrderInfo() {
         const renderItem = ({ item }) => (
            <View
                style={{ 
                    paddingVertical: 2*SIZES.padding,
                    flex: 1, flexDirection: "column", 
                    width: SIZES.width*0.95,
                    marginLeft: SIZES.width*0.025,
                    height: 80,
                    backgroundColor:COLORS.white ,
                    borderBottomColor: COLORS.black,
                    borderBottomWidth: 1,
                    borderRadius: 20,
                    marginBottom: SIZES.padding,
                    justifyContent:"center"}}
            >
                <View style = {{flexDirection: "row", }}>
                    <Text style = {{ width:"10%",paddingLeft:SIZES.padding,...FONTS.body3, color: COLORS.black, justifyContent:"center"}}>{item.quantity}x</Text>
                    <Text style = {{paddingLeft:SIZES.padding, width:"55%", ...FONTS.body3,color: COLORS.black}}>{restaurant["menu"].filter(a => a.menuId===item.menuId)[0].name}</Text>
                    <Text style={{ width:"35%", textAlign: "right", paddingRight:SIZES.padding,...FONTS.body3,color: COLORS.black}}>${item.price.toFixed(2)}</Text>
                </View>
            </View>
        )

        return (
            <View>
                <FlatList
                    data={orderItems}
                    keyExtractor={item => `${item.menuId}`}
                    renderItem={renderItem}
                />
            </View>
        )
    }

    function sumOrder() {
        let total = orderItems.reduce((a, b) => a + (b.price|| 0), 0)
        return total.toFixed(2)
    }
    function taxOrder() {
        let total = sumOrder();
        return (0.18*total).toFixed(2);
    }
    function reusablePackageFee(){
        if(reusablePackage){
            return (
                <View style={{flexDirection: "row"}}>
                    <Text style={{width:"75%", color: COLORS.white, ...FONTS.body3, textAlign:"left"}}>Reusable Package Fee</Text>  
                    <Text style={{width:"25%",color: COLORS.white, ...FONTS.body3, textAlign: "right"}}>$4.00</Text>   
                </View>
            )
        }
        else{
            <View></View>
        }
    }
    function calculateTotal(){
        let total= (parseFloat(sumOrder())+ parseFloat(taxOrder())+ parseFloat(5.00)+ parseFloat(((reusablePackage)? 4.00:0.00)));
        return total.toFixed(2);
    }
    function renderTotal(){
        return(
            <View style={{marginHorizontal: SIZES.padding * 2}}>
                <View style={{flexDirection: "row"}}>
                    <Text style={{width:"75%", color: COLORS.white, ...FONTS.body3, textAlign:"left"}}>Subtotal</Text>  
                    <Text style={{width:"25%",color: COLORS.white, ...FONTS.body3, textAlign: "right"}}>${sumOrder()}</Text>   
                </View>
                <View style={{flexDirection: "row"}}>
                    <Text style={{width:"75%", color: COLORS.white, ...FONTS.body3, textAlign:"left"}}>Tax</Text>  
                    <Text style={{width:"25%",color: COLORS.white, ...FONTS.body3, textAlign: "right"}}>${taxOrder()}</Text>   
                </View>
                <View style={{flexDirection: "row"}}>
                    <Text style={{width:"75%", color: COLORS.white, ...FONTS.body3, textAlign:"left"}}>Delivery Fee</Text>  
                    <Text style={{width:"25%",color: COLORS.white, ...FONTS.body3, textAlign: "right"}}>$5.00</Text>   
                </View>
                {reusablePackageFee()}
                <View style={{flexDirection: "row", marginVertical:SIZES.padding}}>
                    <Text style={{width:"75%", color: COLORS.white, ...FONTS.body2, textAlign:"left"}}>Total</Text>  
                    <Text style={{width:"25%",color: COLORS.white, ...FONTS.body2, textAlign: "right"}}>${calculateTotal()}</Text>   
                </View>
            </View>
        )
    }

    function renderPaymentMode(){
        return (
            <View style={{flex:1, margin: SIZES.padding, marginTop:0,alignItems:'center'}}>
                <Text style={{...FONTS.body2, marginBottom: SIZES.padding,color: COLORS.white,fontWeight:'bold'}}>Payment Method</Text>                       
                <TouchableOpacity
                    style={{
                        marginBottom:SIZES.padding,
                        backgroundColor: (checked)? COLORS.primary: COLORS.white,
                        width:"60%",
                        height:50,
                        borderRadius: 20,
                        justifyContent:"center",
                        borderWidth:1
                    }}
                    onPress= {()=>{setChecked(true)}}
                >

                    <Text style={{textAlign:"center", ...FONTS.body2, color: (!checked)? COLORS.black: COLORS.white}}>Uber Wallet</Text>

                </TouchableOpacity>
                <TouchableOpacity
                style={{
                    backgroundColor: (!checked)? COLORS.primary: COLORS.white,
                    width:"60%",
                    height:50,
                    borderRadius: 20,
                    
                    marginBottom: SIZES.padding,
            
                    justifyContent:"center",
                    borderWidth:1
                }}
                onPress= {()=>{setChecked(false)}}>
                    <Text style={{textAlign:"center", ...FONTS.body2,color: (checked)? COLORS.black: COLORS.white}}>Cash on Delivery</Text>
                </TouchableOpacity>
            </View>
        )
    }
    function renderPlaceOrderButton(){
        return(
            <TouchableOpacity
                style={{
                    height: 60,
                    backgroundColor: COLORS.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 20,
                    marginHorizontal: SIZES.padding,
                    marginBottom: SIZES.padding

                }}
                onPress={() => {
                    console.log(global.user.wallet);
                    if(checked && global.user.wallet<calculateTotal()){
                        alert("Wallet Balance less than Order Total!")
                        setChecked(false);
                    }
                    else{
                        placeOrderHandler();
                    }
                    
                }}
            >
                <Text style={{color: COLORS.white, ...FONTS.h3}}>Place Order</Text>
            </TouchableOpacity>
        )
    }

    function renderPlaceOrderModal() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <TouchableWithoutFeedback
                    onPress={() => {
                        setModalVisible(false);
                        navigation.navigate("CustomerHome");
                    }}
                >
                    <View style={{ flex: 1, flexDirection: 'column-reverse'}}>
                        <View
                            style={{ 
                                height: 400,
                                width: "100%",
                                backgroundColor: COLORS.white,
                                borderTopRightRadius: SIZES.radius,
                                borderTopLeftRadius: SIZES.radius,
                                alignItems: 'center'
                            }}
                        >   
                            <View style={{flexDirection:'row', marginTop: 5*SIZES.padding, marginBottom: SIZES.padding*2, alignItems: "center"}}>
                                <Image
                                    source={icons.success}
                                    resizeMode="contain"
                                    style={{
                                        height: 60,
                                        width: 60,
                                        tintColor: COLORS.primary
                                    }}
                                />
                                <Text
                                    style={{
                                        color: COLORS.black,
                                        ...FONTS.body1,
                                }}>Order Placed!</Text>
                            </View>
                            <Text
                                style={{
                                    color: COLORS.black,
                                    marginVertical: SIZES.padding,
                                    marginLeft: SIZES.padding,
                                    ...FONTS.body3,
                                    width: SIZES.width * 0.8


                            }}>Restaurant has received your order!</Text>
                            <Text
                                style={{
                                    color: COLORS.black,
                                    marginVertical: SIZES.padding,
                                    marginLeft: SIZES.padding,
                                    ...FONTS.body3,
                                    width: SIZES.width * 0.8


                            }}>Our delivery executive will be at your doorstep in {restaurant?.duration}.</Text>

                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }


    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            <ScrollView>
            {renderInfo()}
            {renderOrderInfo()}
            {renderTotal()}
            {renderPaymentMode()}
            </ScrollView>
            {renderPlaceOrderButton()}
            {renderPlaceOrderModal()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
        paddingTop: (Platform.OS==="android")?StatusBar.currentHeight:0
    },
    checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
})

export default Order;