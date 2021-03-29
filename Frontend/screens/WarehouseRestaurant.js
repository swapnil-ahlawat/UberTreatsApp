import React, {useState} from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    SafeAreaView,
    StatusBar,
    Modal,
    TouchableWithoutFeedback,
    Image
} from "react-native"

import { COLORS, SIZES, FONTS, icons, images, LINK } from "../constants"
import Restaurant from "./Restaurant";

const WarehouseRestaurant = ({ navigation }) => {

    const [phoneNumber, setPhoneNumber]= useState(null);
    const [lotSize, setLotSize]= useState(null);
    const [restaurant, setRestaurant]= useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const sendPackageHandler = async () => {
    
        try {
            const response = await fetch(LINK+'/package/sendPackage', {
              method: 'POST',
              headers: {
                 Accept: 'application/json',
                 'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                phoneNo: phoneNumber, 
                numPackages:lotSize
              })
            });
            const responseData = await response.json();
            if (!response.ok) {
              throw new Error(responseData.message);
            }
            else{
                console.log("Successful");
                setRestaurant(responseData.restaurantName);
                setModalVisible(true);
            }
          } catch (err) {
            console.log(err)
            alert(err)
          }
      
    };

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row',justifyContent: 'space-between' }}>                
                
                    <View
                        style={{
                            height: 50,
                            width: "70%",
                            justifyContent: 'center',
                            paddingHorizontal: SIZES.padding * 3,
                            borderBottomRightRadius: SIZES.radius,
                            backgroundColor: COLORS.primary
                        }}
                    >
                        <Text style={{ ...FONTS.h3,color: COLORS.white }}>Dispatch Packages</Text>
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
            </View>
        )
    }

    function renderForm() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 10,
                    marginHorizontal: SIZES.padding * 3,
                }}
            >        
                <View style={{ marginTop: SIZES.padding * 3 }}>
                    <Text style={{ color: COLORS.white, ...FONTS.body2 }}>Enter Restaurant Phone Number</Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.white,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.white,
                            ...FONTS.body3
                        }}
                        placeholder="Enter Phone Number"
                        placeholderTextColor={COLORS.white}
                        selectionColor={COLORS.white}
                        value= {phoneNumber}
                        onChangeText={(text) => setPhoneNumber(text)}
                    />
                </View>

                <View style={{ marginTop: SIZES.padding * 3 }}>
                    <Text style={{ color: COLORS.white, ...FONTS.body2 }}>Enter Lot Size</Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.white,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.white,
                            ...FONTS.body3
                        }}
                        placeholder="Enter Lot Size"
                        placeholderTextColor={COLORS.white}
                        selectionColor={COLORS.white}
                        value= {lotSize}
                        onChangeText={(text) => setLotSize(text)}
                    />
                </View>

               
            </View> 
        )
    }

    function renderButton() {
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
                    onPress={()=>{
                        sendPackageHandler();
                    }}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Send Packages</Text>
                </TouchableOpacity>
            </View>
        )
    }

    function renderSuccessModal() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <TouchableWithoutFeedback
                    onPress={() => {
                        setPhoneNumber(null);
                        setLotSize(null);
                        setModalVisible(false);
                    }}
                >
                    <View style={{ flex: 1, flexDirection: 'column-reverse'}}>
                        <View
                            style={{
                                
                                height: 400,
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


                            }}>{lotSize} packages have been sent to {restaurant}.</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }

    return (
        <SafeAreaView style={{flex: 1,
            backgroundColor: COLORS.black,
            marginTop: (Platform.OS==="android")?StatusBar.currentHeight:0}}>
                {renderHeader()}
                {renderForm()}
                {renderButton()}
                {renderSuccessModal()}
        </SafeAreaView>
    )
}

export default WarehouseRestaurant;