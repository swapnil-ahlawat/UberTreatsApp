import React, {useState, useEffect} from "react";
import {
    View,
    Text,
    Image,
    Modal,
    TouchableOpacity,
    TouchableWithoutFeedback,
    TextInput
} from "react-native"
import {
    BarCodeScanner
  } from 'expo-barcode-scanner';
import { COLORS, FONTS, SIZES, icons, images } from "../constants";




const Scan = ({route, navigation }) => {
    var modeTag= null;
    if(route.params){
        modeTag= route.params.modeTag;
    }
    else{
        modeTag= global.modeTag;
    }
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [serialNumber, setSerialNumber]= useState(null);


    const inFocus = navigation.addListener('focus', () => {
        setScanned(false);
        setSerialNumber(null);
        if(route.params){
            modeTag= route.params.modeTag;
        }
      });
    
      useEffect(() => {    
        return () => {
          inFocus;
        };
      }, [navigation]);
    useEffect(() => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      }, []);

      const handleBarCodeScanned = ({ type, data }) => {
        setSerialNumber(data);
        setModalVisible(true);
        setScanned(true);
      };

      const handleClicked = () => {
        //   setScanned(false);
          setModalVisible(false);
          if(modeTag==="Restaurant"){
            navigation.navigate("RestaurantHome");
          }
          else if(modeTag === "RestaurantDelivery"){
              navigation.navigate("RestaurantHome");
          }
          else if(modeTag === "Warehouse"){
              navigation.navigate("WarehouseHome");
          }
          else
          {
              navigation.navigate("PersonnelHome");
          }
        };
    
      if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
      }
      if (hasPermission === false) {
        return <Text>No access to camera</Text>;
      }

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row', marginTop: SIZES.padding * 5 }}>
                <View style={{ flex: 1, marginLeft: SIZES.padding*1 }}>
                    <Text style={{ color: COLORS.black, ...FONTS.h3 }}>Scan Package</Text>
                </View>
                <TouchableOpacity
                    style={{
                        width: 40,
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={icons.close}
                        style={{
                            height: 20,
                            width: 20,
                            tintColor: COLORS.black
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function renderScanFocus() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Image
                    source={images.focus}
                    resizeMode="stretch"
                    style={{
                        marginTop: "-15%",
                        width: 200,
                        height: 200
                    }}
                />
            </View>
        )
    }

    function renderOtherOption() {
        return (
            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 250,
                    padding: SIZES.padding * 3,
                    borderTopLeftRadius: SIZES.radius,
                    borderTopRightRadius: SIZES.radius,
                    backgroundColor: COLORS.white
                }}
            >
                <Text style={{ ...FONTS.h4 }}>Or Enter Serial Number:</Text>

                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        marginTop: SIZES.padding * 2
                    }}
                >
               <TextInput
                        style={{
                            borderBottomColor: COLORS.black,
                            borderBottomWidth: 1,
                            height: 40,
                            width:"100%",
                            color: COLORS.black,
                            ...FONTS.body3
                        }}
                        placeholder="Serial Number"
                        placeholderTextColor={COLORS.black}
                        selectionColor={COLORS.black}
                        value= {serialNumber}
                        onChangeText={(text) => setSerialNumber(text)}
                    />
                </View>
            </View>
        )
    }

    function renderButton() {
        return (
            <View style={{ margin: SIZES.padding*6 }}>
                <TouchableOpacity
                    style={{
                        height: 60,
                        backgroundColor: COLORS.black,
                        borderRadius: SIZES.radius / 1.5,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => {
                        setModalVisible(true);
                        setScanned(true);
                    }}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Continue</Text>
                </TouchableOpacity>
            </View>
        )
    }

    function renderModeModal() {
        var text;
        if(modeTag==="Restaurant"){
            text="Thank you for collecting the package. We will soon collect the package for it's cleaning. "
        }
        else if(modeTag==="RestaurantDelivery"){
            text="Our delivery personnel will shortly collect the package and will deliver it to the customer. Thank you for choosing to be a partner with Uber Eats. "
        }
        else if(modeTag==="Warehouse"){
            text="The Package has been successfully collected at Warehouse."
        }
        else{
            text="Thank you for collecting the package. Please deposit at any collection centre as per your convenience."
        }
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <TouchableWithoutFeedback
                    onPress={() => {
                        handleClicked()
                    }}
                >
                    <View style={{ flex: 1, flexDirection: 'column-reverse'}}>
                        <View
                            style={{
                                
                                height: 500,
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

                            <Text style={{
                                    color: COLORS.black,
                                    marginVertical: 3*SIZES.padding,
                                    marginLeft: 3*SIZES.padding,
                                    ...FONTS.body3,
                                    width: SIZES.width * 0.8
                            }}>Package No: {serialNumber}</Text>
                            <Text
                                style={{
                                    color: COLORS.black,
                                    marginVertical: SIZES.padding,
                                    marginLeft: 3*SIZES.padding,
                                    ...FONTS.body2,
                                    width: SIZES.width * 0.8


                            }}>{text}</Text>

                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.transparent}}>
        <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ position: 'absolute',
                top: "-10%",
                left: 0,
                bottom: 0,
                right: 0
        }}
      />
      {/* {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />} */}
                {renderHeader()}
                {renderScanFocus()}
                {renderOtherOption()}
                {renderButton()}
                {renderModeModal()}
        </View>
    )
}

export default Scan;
