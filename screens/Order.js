import React from "react";
import {
    CheckBox,
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
    Image,
    Animated
} from "react-native";
import { Directions } from "react-native-gesture-handler";
import { isIphoneX } from 'react-native-iphone-x-helper'

import { icons, COLORS, SIZES, FONTS } from '../constants'

const Order = ({ route, navigation }) => {

  
    const [order, setOrder] = React.useState(null);
    const [currentLocation, setCurrentLocation] = React.useState(null);
    const [isSelected, setSelection] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);

    const handleClicked = () => {
        
          setModalVisible(false);
          navigation.navigate("RestaurantHome");
        };
    
    

    React.useEffect(() => {
        let { item, currentLocation } = route.params;

        setOrder(item)
        setCurrentLocation(currentLocation)
        setSelection(order?.resuablePackage)
    })

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingTop: SIZES.padding,
                        justifyContent: 'center'
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={icons.back}
                        resizeMode="contain"
                        style={{
                            
                            width: 30,
                            height: 30,
                            marginLeft: SIZES.padding,
                            tintColor: COLORS.gray
                        }}
                    />
                </TouchableOpacity>

                
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <View
                        style={{
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: SIZES.padding,
                            paddingHorizontal: SIZES.padding * 4,
                            marginRight: SIZES.padding,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.primary
                        }}
                    >
                        <Text style={{ ...FONTS.h3,color: COLORS.white }}>Order Details</Text>
                    </View>
                </View>

              
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
                    height: 100,
                    backgroundColor:COLORS.white ,
                    borderBottomColor: COLORS.black,
                    borderBottomWidth: 1,
                    borderRadius: 20,
                    marginBottom: SIZES.padding}}
            >
                <View style = {{flexDirection: "row"}}>
                    <Text style = {{paddingLeft:SIZES.padding,width: 0.1*SIZES.width,...FONTS.h3,color: COLORS.black}}>{item.quantity}x</Text>
                    <Text style={{ width: 0.7*SIZES.width,...FONTS.h4,color: COLORS.black }}>{item.name}</Text>
                    <Text style={{width: 0.2*SIZES.width, ...FONTS.h4,color: COLORS.black }}>${item.price*item.quantity}</Text>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingVertical: SIZES.padding,
                        paddingHorizontal: SIZES.width*0.1
                    }}
                    
                >   
                    <Text style = {{width: SIZES.width,...FONTS.body3,color: COLORS.black}}>{item.additional_info}</Text>
                       
                 </View>   
            
             
            </View>
        )

        return (
            <View style={{ 
                paddingBotto0m: 30}}>
            <FlatList
                data={order?.order_details}
                keyExtractor={item => `${item.food_id}`}
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
                  <Text style={{ ...FONTS.body3,color: COLORS.white,paddingHorizontal: SIZES.padding*2 }}>{order?.name}</Text>
                  <Text style={{ ...FONTS.h3,color: COLORS.white,paddingHorizontal: SIZES.padding*2,paddingTop:SIZES.padding }}>{order?.address}</Text>

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
                        if ( order?.resuablePackage)
                        { navigation.navigate("Scan",{modeTag: "RestaurantDelivery"})}
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
                        handleClicked()
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
            {renderUserInfo()}
            {renderOrderInfo()}
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