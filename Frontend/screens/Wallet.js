import React, {useState, useEffect} from "react";
import {
    SafeAreaView,
    View,
    Text,
    FlatList,
    Platform,
    StatusBar,
    TouchableOpacity,
    Image, 
    Modal,
    TouchableWithoutFeedback,
    TextInput
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
 
import {SIZES, COLORS, FONTS, icons, LINK } from '../constants'
 
const Wallet = ({ navigation }) => {

    const [specialPromos, setSpecialPromos] = useState(null)
    const [walletAmount,setWalletAmount] = useState(0)
    const [modalVisible, setModalVisible]= useState(false);
    const [amount, setAmount]= useState(0);

    const inFocus = navigation.addListener('state', () => {
        setWalletAmount(global.user.wallet) 
        setSpecialPromos(global.user.promos)
        setAmount(0);
      });
    
      useEffect(() => {    
        return () => {
          inFocus;
        };
      }, [navigation]);
    
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
                <Text style={{color: COLORS.white, ...FONTS.body2, marginBottom: SIZES.padding}}>{global.user.name}</Text>
                <Text style={{color: COLORS.white, ...FONTS.body3 }}>Phone No.</Text>
                <Text style={{color: COLORS.white, ...FONTS.body2}}>{global.user.phoneNo}</Text>
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
                <Text style={{color: COLORS.white,textAlign:"center", marginBottom: SIZES.padding, ...FONTS.largeTitle}}>${walletAmount.toFixed(2)}</Text>
                <TouchableOpacity
                style={{
                    backgroundColor: COLORS.white,
                    borderRadius: SIZES.radius / 1.5,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onPress={() => {
                   setModalVisible(true);
                }
            }>
                <Text style={{color: COLORS.primary,textAlign:"center", marginVertical: SIZES.padding, ...FONTS.body2}}>Add Amount</Text>
                </TouchableOpacity>
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
                    <Text>Promo Code: </Text> <Text style={{ ...FONTS.body3 }}>{item.promoCode}</Text>
                </Text>    
                <Text style={{ ...FONTS.body6, textAlign:"right" }}>*T&C apply</Text>
            </View>
        )
 
        return (
            <FlatList
                ListHeaderComponent={renderPromoHeader}
                contentContainerStyle={{ paddingHorizontal: SIZES.padding * 3 }}
                data={specialPromos}
                keyExtractor={item => `${item._id}`}
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
    function renderAddAmountModal() { 
        async function addWalletMoney(phoneNo){
                console.log(phoneNo +"wallet")
                var url = LINK+"/user/addWalletMoney";
                try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        phoneNo,
                        amount
                    })
                });
        
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message);
            }
            else{
                console.log(responseData.user)
                global.user= responseData.user;
                setWalletAmount(global.user.wallet) 
                setModalVisible(false);      
                setAmount(null);     
            }
            } catch (err) {
                alert("Can't add money");
                setAmount(null)
            }
        }
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <TouchableWithoutFeedback
                    onPress={() => setModalVisible(false)}
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View
                            style={{
                                height: 250,
                                width: SIZES.width * 0.8,
                                backgroundColor: COLORS.lightGreen,
                                borderRadius: SIZES.radius
                            }}
                        >  
                        <View style={{margin: SIZES.padding*2, marginTop: SIZES.padding*3}}> 
                        <Text style={{ color: COLORS.black, ...FONTS.body2 }}>Enter amount to be added:</Text>
                        <TextInput
                            style={{
                                marginVertical: SIZES.padding,
                                borderBottomColor: COLORS.black,
                                borderBottomWidth: 1,
                                height: 40,
                                color: COLORS.black,
                                ...FONTS.body3
                            }}
                            placeholderTextColor={COLORS.black}
                            selectionColor={COLORS.black}
                            value= {amount}
                            onChangeText={(text) => setAmount(text)}
                        />
                        <TouchableOpacity
                            style={{
                                height: 60,
                                margin:SIZES.padding*2,
                                backgroundColor: COLORS.black,
                                borderRadius: SIZES.radius / 1.5,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onPress={() => {
                                addWalletMoney(global.user.phoneNo);
                            }}
                        >
                            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>ADD</Text>
                        </TouchableOpacity>

                    </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
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
            {renderAddAmountModal()}
        </SafeAreaView>
    )   
}
 
export default Wallet;