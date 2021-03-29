import React, {useState, useEffect} from "react";
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
import { icons, images, SIZES, COLORS, FONTS, LINK } from '../constants'

const PersonnelHome = ({ navigation }) => {

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
            delivery_made: false,
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
            delivery_made: false,
            price: 8,
            quantity: "1 item",
            resuablePackage: false,
            restaurant: "Amrik Sukhdev Dhaba",
            order_deadline: "March 24,2019 15:42",
            payment_mode: "Uber Wallet",
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
            delivery_made: false,
            order_deadline: "March 24,2019 15:47",
            address: "Pacific C",
            payment_mode: "Cash on delivery",
            resuablePackage: true,
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

    const [orders, setOrders] = useState(null)
    const [fetchFlag,setFetchFlag] = useState(true)

    const inFocus = navigation.addListener('state', () => {
        setFetchFlag(true) 
    });
    
    useEffect(() => {    
        return () => {
          inFocus;
        };
    }, [navigation]);
    
    async function fetchOrder(){
        if (fetchFlag)
        {
        setFetchFlag(false)
        console.log(global.user.phoneNo)
        
        var url = LINK+"/user/restaurant?phoneNo=" + global.user.phoneNo + "&userType=Delivery Personnel"
        console.log(url)
        try {
            const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
 
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        else{
            console.log(responseData)
            setOrders(responseData.pendingOrders)
        }
        } catch (err) {
            console.log(err)
            alert("Server Unreachable.");
        }
    }};
 

    function renderHeader() {
        return (
            <SafeAreaView style={{ flexDirection: 'row', height: 50,justifyContent: 'space-between'}}>
               
                    <View
                       style={{
                            height: 50,
                            width: "80%",
                            justifyContent: 'center',
                            borderBottomRightRadius: SIZES.radius,
                            backgroundColor: COLORS.primary,
                            paddingLeft: SIZES.padding,
                            
                        }}
                    >
                        <Text style={{ ...FONTS.h3 ,color: COLORS.white}}>Hello {global.user.name}!</Text>
                    </View>
                

                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingRight: SIZES.padding,
                        justifyContent: 'center'
                    }}
                    onPress={() => navigation.navigate("SignUp")}
                >
                    <Image
                        source={icons.signOut}
                        resizeMode="contain"
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: COLORS.gray
                            
                        }}
                    />
                </TouchableOpacity>
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
                        <Text style={{ ...FONTS.body3,color: COLORS.black }}>Customer Name: <Text style = {{fontWeight: 'bold'}}>{item.customerName}</Text></Text>
                        <Text style={{ ...FONTS.body3,color: COLORS.black }}>Restaurant: <Text style = {{fontWeight: 'bold'}}>{item.restaurantName}</Text></Text>
                        <Text style={{ ...FONTS.body3,color: COLORS.black  }}>Delivery Addresss: <Text style = {{fontWeight: 'bold'}}>{item.customerAddress}</Text></Text>
                 </View>   
                
                    
               
             
            </TouchableOpacity>
        )

        return (
            <View style={{ paddingHorizontal: SIZES.padding * 2,}}>
            <Text style={{paddingVertical:10, ...FONTS.h2,color: COLORS.white,  marginTop:SIZES.padding*2 }}>In Progress ({orders?.length})</Text>
            <FlatList
                data={orders}
                keyExtractor={item => `${item._id}`}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingBottom: 30
                }}
            />
            </View>
        )
    }
    fetchOrder();
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