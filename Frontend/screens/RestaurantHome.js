import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    Platform,
    StatusBar
} from "react-native";
import { icons, images, SIZES, COLORS, FONTS } from '../constants'

const RestaurantHome = ({ navigation }) => {

    // Dummy Datas

    const initialCurrentLocation = {
        streetName: "Restaurant",
        gps: {
            latitude: 1.5496614931250685,
            longitude: 110.36381866919922
        }
    }

    const orderData = [
        {
            id: 1,
            name: "Swapnil Ahlawat",
            price: 12.45,
            quantity: "2 items",
            address: "Street 6",
            resuablePackage: true,
            location: {
                latitude: 1.5347282806345879,
                longitude: 110.35632207358996,
            },
            order_details: [
                {   food_id: 1,
                    name: "Zinger Burger",
                    price: 7.00,
                    additional_info: "Extra sauce",
                    quantity: 1,
                },
                  { food_id: 2,
                    name: "Coke",
                    price: 6.45,
                    additional_info: "Room temperature",
                    quantity: 1,
                }
            ]

        },
        {
            id: 2,
            name: "Wandan Tibrewal",
            price: 8,
            quantity: "1 item",
            address: "Pacific A",
            resuablePackage: false,
            location: {
                latitude: 1.5347282806345879,
                longitude: 120.35632207358996,
            },
            order_details: [
                {  food_id: 1,
                    name: "Red-sauce Pasta",
                    price: 4.00,
                    additional_info: "Extra spicy",
                    quantity: 2
                }
                  
            ]

        },
        {
            id: 3,
            name: "Piyush Maheshwari",
            price: 13,
            quantity: "2 items",
            address: "Pacific C",
            resuablePackage: true,
            location: {
                latitude: 1.2347282806345879,
                longitude: 120.35632207358996,
            },
            order_details: [
                {   food_id: 1,
                    name: "Red-sauce Pasta",
                    price: 4.00,
                    additional_info: "Extra spicy",
                    quantity: 2
                },
                 {   food_id: 2,
                    name: "Sprite",
                    price: 5.00,
                    additional_info: "Extra Ice",
                    quantity: 1
                }
                  
            ]

        }
        
    ]

    
    const [orders, setorders] = React.useState(orderData)
    const [currentLocation, setCurrentLocation] = React.useState(initialCurrentLocation)



    function renderHeader() {
        return (
            <SafeAreaView style={{ marginTop: SIZES.padding,    flexDirection: 'row', height: 50 }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View
                        style={{
                            width: '70%',
                            height: "100%",
                            backgroundColor: COLORS.primary,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: SIZES.radius
                        }}
                    >
                        <Text style={{ ...FONTS.h3 ,color: COLORS.white}}>{currentLocation.streetName}</Text>
                    </View>
                </View>
            </SafeAreaView>
        )
    }

    function renderRestaurantList() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                style={{ 
                    paddingVertical: 2*SIZES.padding,
                    marginVertical:0.5*SIZES.padding ,
                    flex: 1, flexDirection: "column", 
                    width: SIZES.width*0.9,backgroundColor:
                    COLORS.white,
                    height: 100,
                    borderRadius: 20}}
               onPress={() => navigation.navigate("Order", {
                    item,
                    currentLocation
                })}
            >
                
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingHorizontal: SIZES.padding
                    }}
                >
                        <Text style={{ ...FONTS.body3,color: COLORS.black }}>{item.name}</Text>
                        <Text style={{ ...FONTS.body3,color: COLORS.black }}>${item.price.toFixed(2)}</Text>
                 </View>   
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingHorizontal: SIZES.padding
                     }}
                >
                    <Text style={{ ...FONTS.body3,color: COLORS.black  }}>{item.address}</Text>
                    <Text style={{ ...FONTS.body3,color: COLORS.black  }}>{item.quantity}</Text>
                </View>
             
            </TouchableOpacity>
        )

        return (
            <View style={{ paddingHorizontal: SIZES.padding * 2,  marginTop:SIZES.padding*2}}>
            <Text style={{paddingVertical:10, ...FONTS.h2,color: COLORS.white }}>In Progress (3)</Text>
            <FlatList
                data={orders}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingBottom: 30
                }}
            />
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderRestaurantList()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: (Platform.OS==="android")?StatusBar.currentHeight:0,
        backgroundColor: COLORS.black
    },
  
})

export default RestaurantHome