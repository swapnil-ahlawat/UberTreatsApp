import React from "react";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import {
    SafeAreaView,
    View,
    Text,
    FlatList,
    Platform,
    StatusBar,
    TouchableOpacity,
    Image
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
 
import {images, SIZES, COLORS, FONTS, icons } from '../constants'
 
const Wallet = ({ navigation }) => {
    const specialPromoData = [
        {
            id: 1,
            img: images.promoBanner,
            title: "Special Reward",
            description: "Get extra 10%* off on your next order!",
            promoCode: "REUSE1"
        },
        {
            id: 2,
            img: images.promoBanner,
            title: "Special Reward",
            description: "Get extra 15%* off on your next order!",
            promoCode: "REUSE2"
        },
    ]
 
    const [specialPromos, setSpecialPromos] = React.useState(specialPromoData)
    
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
                        <Text style={{ ...FONTS.h3,color: COLORS.white }}>My Profile</Text>
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

 
    function renderUserDetails() {
        return (
      
            <View style={{ flex: 1, marginVertical: SIZES.padding * 2, paddingHorizontal: SIZES.padding * 3 }}>
                <Text style={{color: COLORS.white, ...FONTS.body3 }}>User</Text>
                <Text style={{color: COLORS.white, ...FONTS.body2, marginBottom: SIZES.padding}}>Swapnil Ahlawat</Text>
                <Text style={{color: COLORS.white, ...FONTS.body3 }}>Email ID/Phone No.</Text>
                <Text style={{color: COLORS.white, ...FONTS.body2}}>{global.ID}</Text>
            </View>
   
        )
    }
 
    function renderBanner() {
        return (
            <View
                style={{
                    borderRadius: 20,
                    backgroundColor:COLORS.primary,
                    marginBottom:SIZES.padding*5,
                    marginTop: SIZES.padding*3, 
                    marginHorizontal: SIZES.padding * 3                    
                }}
            >
                <Text style={{color: COLORS.white,textAlign:"center", ...FONTS.body3, margin: SIZES.padding}}>Wallet Balance</Text>
                <Text style={{color: COLORS.white,textAlign:"center", marginBottom: SIZES.padding, ...FONTS.largeTitle}}>${global.wallet.toFixed(2)}</Text>
            </View>
        )
    }
 
 
    function renderPromos() {
 
 
        const renderPromoHeader = () => (
            <View
                style={{
                    marginBottom: SIZES.padding
                }}
            >
            <Text style={{color: COLORS.white, ...FONTS.h3 }}>Rewards</Text>
            </View>
 
        )
 
        const renderItem = ({ item }) => (
            <View
                style={{
                    marginVertical: SIZES.base,
                    // width: SIZES.width / 2.5,
                    padding: SIZES.padding,
                    backgroundColor: COLORS.lightGray,
                    borderRadius: 20,
                }}
            >
                <Text style={{ ...FONTS.h4 }}>{item.title}</Text>
                <Text style={{ ...FONTS.body4}}>{item.description}</Text>
                <Text style={{ ...FONTS.body4}}>
                    <Text>Promo Code: </Text> <Text style={{ ...FONTS.body3 }}>{item.promoCode}</Text> <Text style={{ ...FONTS.body6 }}>            *T&C apply</Text>
                </Text>    
            </View>
        )
 
        return (
            <FlatList
                ListHeaderComponent={renderPromoHeader}
                contentContainerStyle={{ paddingHorizontal: SIZES.padding * 3 }}
                data={specialPromos}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />
        )
    }
    
    function renderButton() {
        return (
            <View style={{ marginHorizontal: SIZES.padding *3, marginBottom: SIZES.padding*7, marginTop: SIZES.padding*2}}>
                <TouchableOpacity
                    style={{
                        height: 60,
                        backgroundColor: COLORS.primary,
                        borderRadius: SIZES.radius / 1.5,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => {
                       navigation.navigate("SignUp")
                    }
                }
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Sign Out</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black, marginTop: (Platform.OS==="android")? StatusBar.currentHeight:0}}>
            {renderHeader()}
            <ScrollView>
            {renderUserDetails()}
            {renderBanner()}
            {renderPromos()}
            </ScrollView>
            {renderButton()}
        </SafeAreaView>
    )   
}
 
export default Wallet;