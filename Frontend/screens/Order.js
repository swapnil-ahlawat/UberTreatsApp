import React from "react";
import {
    StyleSheet,
    FlatList,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Platform,
    Modal,
    StatusBar,
    Image
} from "react-native";
import { Directions, ScrollView } from "react-native-gesture-handler";
import { isIphoneX } from 'react-native-iphone-x-helper'

import { icons, COLORS, SIZES, FONTS } from '../constants'

const Order = ({ route, navigation }) => {

  
    const [order, setOrder] = React.useState(null);
    const [currentLocation, setCurrentLocation] = React.useState(null);
    const [isSelected, setSelection] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);

  
    
    
    React.useEffect(() => {
        let { item, currentLocation } = route.params;

        setOrder(item)
        setCurrentLocation(currentLocation)
        setSelection(order?.reusablePackageFlag)
    })
    async function deleteOrder(){
         var url = "http://b51c079841e0.ngrok.io/user/removeOrder";
        try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            orderID: order._id,
            phoneNo: global.user.phoneNo

          })
        });
 
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        else{
          console.log(responseData)
        }
      } catch (err) {
        console.log(err)
      }
    }
    function handleOrderDispatch(){
         deleteOrder();
         console.log("HEEEEEEEE")
         setModalVisible(false);
        navigation.navigate("RestaurantHome");
    }

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row' }}>                
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
                        <Text style={{ ...FONTS.h3,color: COLORS.white }}>Order Details</Text>
                    </View>
                    </View>
                    <TouchableOpacity
                    style={{
                        width: 50,
                        paddingTop: SIZES.padding,
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
                            marginLeft: SIZES.padding,
                            tintColor: COLORS.gray
                        }}
                    />
                </TouchableOpacity>             
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
                    justifyContent:'center'}}
            >
                <View style = {{flexDirection: "row"}}>
                    <Text style = {{paddingLeft:SIZES.padding,width: 0.20*SIZES.width,...FONTS.h3,color: COLORS.black}}>{item.quantity}x</Text>
                    <Text style={{ width: 0.55*SIZES.width,...FONTS.h4,color: COLORS.black }}>{item.name}</Text>
                    <Text style={{width: 0.25*SIZES.width, ...FONTS.h4,color: COLORS.black,paddingRight:SIZES.padding }}>${(item.price*item.quantity).toFixed(2)}</Text>
                </View>
               
            
             
            </View>
        )

        return (
            <View style={{ 
                paddingBotto0m: 30}}>
            <FlatList
                data={order?.foodItems}
                keyExtractor={item => `${item._id}`}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingBottom: 30
                }}
            />
            </View>
        )
    }

   


    function renderUserInfo() {
        var img;
        if ( isSelected)
        img = icons.success
        else
        img = icons.cross
        return (
            <View style = {{height: 100,marginTop: SIZES.padding,flexDirection: "row"}}>
              <View style = {{justifyContent: 'center'}}>
                  <Text style={{ ...FONTS.body3,color: COLORS.white,paddingHorizontal: SIZES.padding*2 }}>{order?.customerName}</Text>
                  <Text style={{ ...FONTS.h3,color: COLORS.white,paddingHorizontal: SIZES.padding*2,paddingTop:SIZES.padding }}>{order?.customerPhoneNo}</Text>

              </View>
             

              
              <View style = {{flexDirection: "row",alignItems:'center'}}>
                    <Text style={{ ...FONTS.body3,color: COLORS.white,paddingHorizontal: 3*SIZES.padding }}>Resuable Packaging</Text>
                    <Image
                                    source={img}
                                    resizeMode="contain"
                                    style={{
                                        height: 25,
                                        width: 25,
                                        // tintColor: COLORS.primary
                                    }}
                                />
               </View>
            </View>
           
        )
    }
    function renderButton() {
        var txt;
        if ( isSelected)
        txt = "Scan Package"
        else
        txt = "Ready to Dispatch"
        return (
            <View style={{ margin: SIZES.padding * 3 }}>
                <TouchableOpacity
                    style={{
                        height: 60,
                        backgroundColor: COLORS.primary,
                        borderRadius: SIZES.radius / 1.5,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => {
                        if ( order?.resuablePackageFlag)
                        {   
                            navigation.navigate("Scan",{modeTag: "RestaurantDelivery",order})
                        }
                        else
                        {
                          setModalVisible(true)
                        }
                    }
                }
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>{txt}</Text>
                </TouchableOpacity>
            </View>
        )
    }
      function renderModeModal() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <TouchableWithoutFeedback
                    onPress={() => {
                        handleOrderDispatch()
                    }}
                >
                    <View style={{ flex: 1, flexDirection: 'column-reverse'}}>
                        <View
                            style={{
                                
                                height: 500,
                                width: "100%",
                                backgroundColor: COLORS.white,
                                borderRadius: SIZES.radius,
                                alignItems: 'center'
                            }}
                        >   
                            <View style={{flexDirection:'row', marginTop: 5*SIZES.padding, alignItems: "center"}}>
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
                                }}>Successful!</Text>
                            </View>

                            
                            <Text
                                style={{
                                    color: COLORS.black,
                                    marginVertical: SIZES.padding,
                                    marginLeft: 3*SIZES.padding,
                                    ...FONTS.body2,
                                    width: SIZES.width * 0.8


                            }}>{"Our delivery partner will shortly collect the package and will deliver it to the customer. Thank you for choosing to be a partner with Uber Eats. "}</Text>

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
            {renderUserInfo()}
            {renderOrderInfo()}
            </ScrollView>
            {renderButton()}
            {renderModeModal()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
        marginTop: (Platform.OS==="android")?StatusBar.currentHeight:0
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