import React, {useState, useEffect} from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    Image,
    TouchableOpacity,
    TextInput
} from "react-native"
import {
    BarCodeScanner
  } from 'expo-barcode-scanner';
import { COLORS, FONTS, SIZES, icons, images } from "../constants";

const Scan = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    useEffect(() => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      }, []);

      const handleBarCodeScanned = ({ type, data }) => {
        alert(`Scanned \n ${data}`);
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
                    <Text style={{ color: COLORS.black, ...FONTS.h3 }}>Scan for Payment</Text>
                </View>
                <TouchableOpacity
                    style={{
                        width: 40,
                    }}
                    onPress={() => navigation.navigate("Home")}
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
                        marginTop: "-55%",
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
                    height: 220,
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
                            marginVertical: SIZES.padding,
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
                    />
                </View>
            </View>
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
        </View>
    )
}

export default Scan;
