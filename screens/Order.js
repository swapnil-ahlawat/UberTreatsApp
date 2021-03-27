import React from "react";
import {
    CheckBox,
    StyleSheet,
    FlatList,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Platform,
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
    

    React.useEffect(() => {
        let { item, currentLocation } = route.params;

        setOrder(item)
        setCurrentLocation(currentLocation)
        setSelection(order?.resuablePackage)
    })

    function renderHeader(z) {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: SIZES.padding * 2,
                        paddintTop: SIZES.padding,
                        justifyContent: 'center'
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={icons.back}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                </TouchableOpacity>

                {/* User details section */}
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
                            paddingHorizontal: SIZES.padding * 3,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.lightGray3
                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}>Order Details</Text>
                    </View>
                </View>

              
            </View>
        )
    }

    function renderOrderInfo() {
         const renderItem = ({ item }) => (
            <TouchableOpacity
                style={{ 
                    paddingVertical: 2*SIZES.padding,
                    
                    flex: 1, flexDirection: "column", 
                    width: SIZES.width,
                    height: 150,
                    backgroundColor:COLORS.primary ,
                    borderBottomColor: COLORS.white,
                    borderBottomWidth: 1}}
            >
                <View style = {{flexDirection: "row"}}>
                    <Text style = {{paddingLeft:SIZES.padding,width: 0.1*SIZES.width,...FONTS.h3,color: COLORS.white}}>{item.quantity}</Text>
                    <Text style={{ width: 0.7*SIZES.width,...FONTS.h4,color: COLORS.white }}>{item.name}</Text>
                    <Text style={{width: 0.2*SIZES.width, ...FONTS.h4,color: COLORS.white }}>${item.price*item.quantity}</Text>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingVertical: SIZES.padding,
                        paddingHorizontal: SIZES.width*0.1
                    }}
                    
                >   
                    <Text style = {{width: SIZES.width,...FONTS.body3,color: COLORS.white}}>{item.additional_info}</Text>
                       
                 </View>   
            
             
            </TouchableOpacity>
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
        return (
            <View style = {{height: 100,borderBottomWidth:1,marginTop: SIZES.padding,flexDirection: "row"}}>
              <View style = {{justifyContent: 'center'}}>
                  <Text style={{ ...FONTS.body3,color: COLORS.black,paddingHorizontal: SIZES.padding }}>{order?.name}</Text>
                  <Text style={{ ...FONTS.h3,color: COLORS.black,paddingHorizontal: SIZES.padding,paddingTop:SIZES.padding }}>{order?.address}</Text>

              </View>
              <View style = {{flexDirection: "row",alignItems:'center'}}>
                    <Text style={{ ...FONTS.body3,color: COLORS.black,paddingHorizontal: 3*SIZES.padding }}>Resuable Packaging</Text>
                    <CheckBox
                        value={isSelected}
                        onValueChange={setSelection}
                        style={styles.checkbox}
                    />
               </View>
            </View>
           
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderUserInfo()}
            {renderOrderInfo()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray2,
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