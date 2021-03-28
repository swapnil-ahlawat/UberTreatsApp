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

const PersonnelHome = ({ navigation }) => {

    // Dummy Datas

    const deliveryPersonData = {
        Name: "Prakash",
    }

    const deliveryData = [
        {
            order_id: 1,
            customer_name: "Swapnil Ahlawat",
            address: "Street 6",
            resuablePackage: true,
            restaurant: "KFC",
            order_deadline: "March 24,2019 15:30",
            price: 13.45,
            quantity: "2 items",
            payment_mode: "Cash on delivery",
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
            order_id: 2,
            customer_name: "Wandan Tibrewal",
            address: "Pacific A",
            price: 8,
            quantity: "1 item",
            resuablePackage: false,
            restaurant: "Amrik Sukhdev Dhaba",
            order_deadline: "March 24,2019 15:42",
            payment_mode: "Uber Wallet",
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
                },
                {  food_id: 2,
                    name: "Red-sauce Pasta",
                    price: 4.00,
                    additional_info: "Extra spicy",
                    quantity: 2
                },
                {  food_id: 3,
                    name: "Red-sauce Pasta",
                    price: 4.00,
                    additional_info: "Extra spicy",
                    quantity: 2
                },
                {  food_id: 4,
                    name: "Red-sauce Pasta",
                    price: 4.00,
                    additional_info: "Extra spicy",
                    quantity: 2
                },
                {  food_id: 5,
                    name: "Red-sauce Pasta",
                    price: 4.00,
                    additional_info: "Extra spicy",
                    quantity: 2
                }
                  
            ]
            

        },
        {
            order_id: 3,
            customer_name: "Piyush Maheshwari",
            restaurant: "KFC",
            price: 13,
            quantity: "2 items",
            order_deadline: "March 24,2019 15:47",
            address: "Pacific C",
            payment_mode: "Cash on delivery",
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

    
    const [orders, setorders] = React.useState(deliveryData)
    



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
                        <Text style={{ ...FONTS.h3 ,color: COLORS.white}}>Hello {deliveryPersonData.Name}!</Text>
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
                    height: 150,
                    borderRadius: 20}}
               onPress={() => navigation.navigate("DeliverOrder", {
                    item
                })}
            >
                
                <View
                    style={{
                        flexDirection: "column",

                        paddingHorizontal: SIZES.padding
                    }}
                >
                        <Text style={{ ...FONTS.body2,color: COLORS.black }}>Customer Name: <Text style = {{fontWeight: 'bold'}}>{item.customer_name}</Text></Text>
                        <Text style={{ ...FONTS.body2,color: COLORS.black }}>Restaurant: <Text style = {{fontWeight: 'bold'}}>{item.restaurant}</Text></Text>
                        <Text style={{ ...FONTS.body2,color: COLORS.black  }}>Delivery Addresss: <Text style = {{fontWeight: 'bold'}}>{item.address}</Text></Text>
                    <Text style={{ ...FONTS.body2,color: COLORS.black  }}>Order Deadline: <Text style = {{fontWeight: 'bold'}}>{item.order_deadline}</Text></Text>
                 </View>   
                
                    
               
             
            </TouchableOpacity>
        )

        return (
            <View style={{ paddingHorizontal: SIZES.padding * 2,}}>
            <Text style={{paddingVertical:10, ...FONTS.h2,color: COLORS.white,  marginTop:SIZES.padding*2 }}>In Progress (3)</Text>
            <FlatList
                data={orders}
                keyExtractor={item => `${item.order_id}`}
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

export default PersonnelHome;