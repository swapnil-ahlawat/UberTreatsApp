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
    const [startingSerialNumber, setStartingSerialNumber]= useState(null);
    const [endingSerialNumber, setEndingSerialNumber]= useState(null);
    const [modalVisible, setModalVisible] = useState(false);

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
                        <Text style={{ ...FONTS.h3,color: COLORS.white }}>Add Packages in Transit</Text>
                    </View>
                </View>            
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
                    <Text style={{ color: COLORS.white, ...FONTS.body2 }}>Enter Starting Serial Number</Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.white,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.white,
                            ...FONTS.body3
                        }}
                        placeholder="Enter starting serial number"
                        placeholderTextColor={COLORS.white}
                        selectionColor={COLORS.white}
                        value= {startingSerialNumber}
                        onChangeText={(text) => setStartingSerialNumber(text)}
                    />
                </View>

                <View style={{ marginTop: SIZES.padding * 3 }}>
                    <Text style={{ color: COLORS.white, ...FONTS.body2 }}>Enter Ending Serial Number</Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.white,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.white,
                            ...FONTS.body3
                        }}
                        placeholder="Enter ending serial number"
                        placeholderTextColor={COLORS.white}
                        selectionColor={COLORS.white}
                        value= {endingSerialNumber}
                        onChangeText={(text) => setEndingSerialNumber(text)}
                    />
                </View>
            </View> 
        )
    }

    function renderButton() {
        return (
            <View style={{ margin: SIZES.padding * 5 }}>
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
                        setStartingSerialNumber(null);
                        setEndingSerialNumber(null);
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


                            }}>Packages from Serial no. {startingSerialNumber} to {endingSerialNumber} are now in transit to {restaurant}.</Text>

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