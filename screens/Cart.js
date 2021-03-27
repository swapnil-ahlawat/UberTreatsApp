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
} from "react-native";

import { icons, COLORS, SIZES, FONTS } from '../constants'

const Order = ({ route, navigation }) => {

  
    const [restaurant, setRestaurant] = React.useState(null);
    const [currentLocation, setCurrentLocation] = React.useState(null);
    const [orderItems, setOrderItems] = React.useState([]);
    

    React.useEffect(() => {
        let {restaurant, currentLocation, orderItems} = route.params;
        console.log(restaurant["menu"])
        if(restaurant){
            setRestaurant(restaurant)
            setCurrentLocation(currentLocation)
            setOrderItems(orderItems)
        }
    })

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
                            backgroundColor: COLORS.lightGray3
                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}>Order Cart</Text>
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
                            
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function renderInfo(){
        return (
        <View style={{margin: SIZES.padding * 2 }}>
            <Text style={{color: COLORS.black, ...FONTS.body2 }}>Restaurant</Text>
            <Text style={{color: COLORS.black, ...FONTS.h3 }}>{restaurant?.name}</Text>
            <Text style={{color: COLORS.black, ...FONTS.body2, paddingTop: SIZES.padding }}>Delivery Address</Text>
            <Text style={{color: COLORS.black, ...FONTS.h3}}>{currentLocation}</Text>
            <Text style={{color: COLORS.black, ...FONTS.body2, paddingTop: SIZES.padding }}>Order Details</Text>
        </View>
        )
    }
    function renderOrderInfo() {
         const renderItem = ({ item }) => (
            <View
                style={{ 
                    paddingVertical: 2*SIZES.padding,
                    flex: 1, flexDirection: "column", 
                    width: SIZES.width,
                    height: 80,
                    justifyContent:"center",
                    backgroundColor:COLORS.primary ,
                    borderBottomColor: COLORS.white,
                    borderBottomWidth: 1,
                    borderRadius: SIZES.radius/2,
                    marginRight:SIZES.padding}}
            >
                <View style = {{flexDirection: "row", color:COLORS.white}}>
                    <Text style = {{paddingLeft:SIZES.padding,...FONTS.body2,color: COLORS.white, justifyContent:"center"}}>{item.qty}</Text>
                    <Text style = {{paddingLeft:SIZES.padding, width:"70%", ...FONTS.body2,color: COLORS.white}}>{restaurant["menu"].filter(a => a.menuId===item.menuId)[0].name}</Text>
                    <Text style={{paddingLeft:SIZES.padding,...FONTS.body2,color: COLORS.white }}>{item.total}</Text>
                </View>
             
            </View>
        )
        function foodList(){
            if(orderItems.length===0){
                return <View><Text>No food item selected.</Text></View>
            }
            else{
                return <FlatList
                data={orderItems}
                keyExtractor={item => `${item.menuId}`}
                renderItem={renderItem}
            />
            }
        }
        return (
            <View style={{ 
                paddingBotto0m: 30}}>
            {foodList()}
            </View>
        )
    }


    function renderTotal(){
        return(
            <View></View>
        )
    }
   
    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderInfo()}
            {renderOrderInfo()}
            {renderTotal()}
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