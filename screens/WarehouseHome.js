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

import { COLORS, SIZES, FONTS, icons, images } from "../constants"

const WarehouseHome = ({ navigation }) => {

    const [restaurant, setRestaurant]= useState(null);
    const [lotNumber, SetLotNumber]= useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row',justifyContent: 'space-between' }}>                
                
                    <View
                        style={{
                            height: 50,
                            width: "40%",
                            justifyContent: 'center',
                            paddingHorizontal: SIZES.padding * 3,
                            borderBottomRightRadius: SIZES.radius,
                            backgroundColor: COLORS.primary
                        }}
                    >
                        <Text style={{ ...FONTS.h3,color: COLORS.white }}>Dispatch</Text>
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
                    <Text style={{ color: COLORS.white, ...FONTS.body2 }}>Enter Restaurant Name to Deliver</Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.white,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.white,
                            ...FONTS.body3
                        }}
                        placeholder="Enter restaurant name"
                        placeholderTextColor={COLORS.white}
                        selectionColor={COLORS.white}
                        value={restaurant}
                        onChangeText={(text) => setRestaurant(text)}
                    />
                </View>
        
                <View style={{ marginTop: SIZES.padding * 3 }}>
                    <Text style={{ color: COLORS.white, ...FONTS.body2 }}>Enter Box Lot Number</Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.white,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.white,
                            ...FONTS.body3
                        }}
                        placeholder="Enter Lot Number"
                        placeholderTextColor={COLORS.white}
                        selectionColor={COLORS.white}
                        value= {lotNumber}
                        onChangeText={(text) => SetLotNumber(text)}
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
                        setModalVisible(true)
                    }}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Add Packages</Text>
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
                        setRestaurant(null);
                        SetLotNumber(null);
                        
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


                            }}>Packages in Lot no. {lotNumber} are now in transit to {restaurant}.</Text>

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

export default WarehouseHome;