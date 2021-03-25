import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    TextInput,
    Modal,
    FlatList,
    KeyboardAvoidingView,
    ScrollView,
    Platform
} from "react-native"

import {LinearGradient} from 'expo-linear-gradient';

import { COLORS, SIZES, FONTS, icons, images } from "../constants"

const SignUp = ({ navigation }) => {

    const mode=[
        {
            name:"Customer",
            tabs: "CustomerTabs"
        },
        {
            name: "Delivery Personnel",
            tabs: "PersonnelTabs",
        },
       { 
            name: "Restaurant",
            tabs: "RestaurantTabs"
        },
        {
            name: "Warehouse",
            tabs: "WarehouseTabs"
        }
    ]

    const [showPassword, setShowPassword] = React.useState(false)

    const [selectedMode, setSelectedMode] = React.useState(mode.filter(a => a.name== "Customer")[0])
    const [modalVisible, setModalVisible] = React.useState(false)

    function renderLogo() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 10,
                    height: 100,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Image
                    source={images.uberEatsLogo}
                    resizeMode="contain"
                    style={{
                        height: "150%",
                        width: "50%"
                    }}
                />
            </View>
        )
    }

    function renderForm() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 3,
                    marginHorizontal: SIZES.padding * 3,
                }}
            >
                {/* Full Name */}
                <View style={{ marginTop: SIZES.padding * 3 }}>
                    <Text style={{ color: COLORS.lightGreen, ...FONTS.body2 }}>Email Address/ Phone No.</Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.white,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.white,
                            ...FONTS.body3
                        }}
                        placeholder="Email ID/ Phone No."
                        placeholderTextColor={COLORS.white}
                        selectionColor={COLORS.white}
                    />
                </View>
                

                {/* Password */}
                <View style={{ marginTop: SIZES.padding * 2 }}>
                    <Text style={{ color: COLORS.lightGreen, ...FONTS.body2 }}>Password</Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.white,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.white,
                            ...FONTS.body3
                        }}
                        placeholder="Enter Password"
                        placeholderTextColor={COLORS.white}
                        selectionColor={COLORS.white}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            right: 0,
                            bottom: 10,
                            height: 30,
                            width: 30
                        }}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Image
                            source={showPassword ? icons.disable_eye : icons.eye}
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: COLORS.white
                            }}
                        />
                    </TouchableOpacity>
                </View>
                
                {/* Sign in as */}
                <View style={{ marginTop: SIZES.padding * 2 }}>
                    <Text style={{ color: COLORS.lightGreen, ...FONTS.body2 }}>Sign In as:</Text>
                        <TouchableOpacity
                            style={{
                                width: "100%",
                                height: 50,
                                marginVertical: SIZES.padding,
                                borderBottomColor: COLORS.white,
                                borderBottomWidth: 1,
                                flexDirection: 'row',
                                ...FONTS.body2
                            }}
                            onPress={() => setModalVisible(true)}
                        >
                            <View style={{ justifyContent: 'center',}}>
                                <Text style={{color: COLORS.white, ...FONTS.body2 }}>{selectedMode.name}</Text>
                            </View>
                            <Image
                                    source={icons.arrowDown}
                                    resizeMode="contain"
                                    style={{
                                        height: 20,
                                        width: 20,
                                        position:"absolute",
                                        right:10,
                                        bottom:10,
                                        tintColor: COLORS.white                                     
                                    }}
                                />
                        </TouchableOpacity>
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
                        backgroundColor: COLORS.black,
                        borderRadius: SIZES.radius / 1.5,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => navigation.navigate(selectedMode.tabs)}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>SIGN IN</Text>
                </TouchableOpacity>
            </View>
        )
    }

    function renderModeModal() {

        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{ padding: SIZES.padding, flexDirection: 'row' }}
                    onPress={() => {
                        setSelectedMode(item)
                        setModalVisible(false)
                    }}
                >
                <Text style={{ ...FONTS.body2 }}>{item.name}</Text>
                </TouchableOpacity>
            )
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
                            <FlatList
                                data={mode}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.name}
                                showsVerticalScrollIndicator={false}
                                style={{
                                    padding: SIZES.padding * 2,
                                    marginBottom: SIZES.padding * 2
                                }}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{ flex: 1 }}
        >
            <LinearGradient
                colors={[COLORS.lime, COLORS.emerald]}
                style={{ flex: 1 }}
            >
                <ScrollView>
                    {renderLogo()}
                    {renderForm()}
                    {renderButton()}
                </ScrollView>
            </LinearGradient>
            {renderModeModal()}
        </KeyboardAvoidingView>
    )
}

export default SignUp;