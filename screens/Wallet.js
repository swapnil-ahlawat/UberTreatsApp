import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    FlatList,
    Platform,
    StatusBar,
} from "react-native";

import {images, SIZES, COLORS, FONTS } from '../constants'

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
            <View style={{marginTop: SIZES.padding * 2}}>
                    <Text style={{color: COLORS.white,...FONTS.h3,  textAlign: "center"}}>My profile</Text>
            </View>
        )
    }

    function renderUserDetails() {
        return (
      
            <View style={{ flex: 1, marginVertical: SIZES.padding * 2 }}>
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
                }}
            >
                <Text style={{color: COLORS.white,textAlign:"center", ...FONTS.body3, margin: SIZES.padding}}>Wallet Balance</Text>
                <Text style={{color: COLORS.white,textAlign:"center", marginBottom: SIZES.padding, ...FONTS.largeTitle}}>$500</Text>
            </View>
        )
    }


    function renderPromos() {

        const HeaderComponent = () => (
            <View>
                {renderHeader()}
                {renderUserDetails()}
                {renderBanner()}
                {renderPromoHeader()}
            </View>
        )

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
                ListHeaderComponent={HeaderComponent}
                contentContainerStyle={{ paddingHorizontal: SIZES.padding * 3 }}
                data={specialPromos}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={
                    <View style={{ marginBottom: 80 }}>
                    </View>
                }
            />
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black, marginTop: (Platform.OS==="android")? StatusBar.currentHeight:0}}>
            {renderPromos()}
        </SafeAreaView>
    )   
}

export default Wallet;