import React, {useState} from "react";
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
    StyleSheet,
    StatusBar,
    SafeAreaView,
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
 
    const [showPassword, setShowPassword] = useState(false)
 
    const [selectedMode, setSelectedMode] = useState(mode.filter(a => a.name== "Customer")[0])
    const [modalVisible, setModalVisible] = useState(false)
    const [phoneNo, setPhoneNo]= useState(null);
    const [password, setPassword]= useState(null);
 
    
  const authSubmitHandler = async () => {
    // event.preventDefault();
    
    console.log(phoneNo)
    console.log(password)
    console.log(selectedMode.name)
    try {
        const response = await fetch('http://01ba8b191ae3.ngrok.io/login', {
          method: 'POST',
          headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            phoneNo: phoneNo,
            password: password,
            userType: selectedMode.name
          })
        });
 
        const responseData = await response.text();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        else{
        global.user = responseData
        console.log(global.user.user)
        navigation.navigate(selectedMode.tabs)
        }
      } catch (err) {
        console.log(err)
        alert('Incorrect Credentials')
      }
  
  };
 
    function renderLogo() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 10,
                    height: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                    
                }}
            >
                <Image
                    source={images.uberEatsLogo}
                    resizeMode="contain"
                    style={{
                        height: "150%",
                        width: "50%",
                       
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
                    <Text style={{ color: COLORS.lightGreen, ...FONTS.body2 }}>Phone number</Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.white,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.white,
                            ...FONTS.body3
                        }}
                        placeholder="Enter phone no."
                        placeholderTextColor={COLORS.white}
                        selectionColor={COLORS.white}
                        value= {phoneNo}
                        onChangeText={(text) => setPhoneNo(text)}
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
                        placeholder="Enter password"
                        placeholderTextColor={COLORS.white}
                        selectionColor={COLORS.white}
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
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
                    <Text style={{ color: COLORS.lightGreen, ...FONTS.body2 }}>Sign in as:</Text>
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
                                <Text style={{color: COLORS.white, ...FONTS.body3 }}>{selectedMode.name}</Text>
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
                        backgroundColor: COLORS.primary,
                        borderRadius: SIZES.radius / 1.5,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => {
                        global.phoneNo= phoneNo;
                        global.password= password;
                        global.modeTag= selectedMode.name;
                        setPhoneNo(null);
                        setPassword(null);
                        setSelectedMode(mode.filter(a => a.name== "Customer")[0])
                        authSubmitHandler()}}
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
            style={{ flex: 1, marginTop: (Platform.OS==="android")?StatusBar.currentHeight:0 }}
        >
            <LinearGradient
                colors={[COLORS.black, COLORS.black]}
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