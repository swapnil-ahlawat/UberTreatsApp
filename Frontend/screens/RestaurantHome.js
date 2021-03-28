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
        address: "KFC",
        gps: {
            latitude: 1.5496614931250685,
            longitude: 110.36381866919922
        }
    }

  

    
    const [orders, setorders] = React.useState(null)
    const [currentLocation, setCurrentLocation] = React.useState(initialCurrentLocation)

    const fetchOrder = async () => {
        console.log(global.user.user.phoneNo)
        
        var url = "http://4323a6061dfd.ngrok.iouser/user/restaurant?phoneNo=" + global.user.user.phoneNo
        console.log(url)
        try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json'
          },
        });
 
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setorders(response)
        navigation.navigate(selectedMode.tabs)
      } catch (err) {
        console.log(err)
      }
  
       
   };



    function renderHeader() {
        return (
            <SafeAreaView style={{ flexDirection: 'row', height: 50,justifyContent: 'space-between'}}>
               
                    <View
                       style={{
                            height: 50,
                            width: "40%",
                            justifyContent: 'center',
                            borderBottomRightRadius: SIZES.radius,
                            backgroundColor: COLORS.primary,
                            paddingLeft: SIZES.padding,
                            
                        }}
                    >
                        <Text style={{ ...FONTS.h3 ,color: COLORS.white}}>{currentLocation.address}</Text>
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

export default RestaurantHome