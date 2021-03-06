import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { COLORS, FONTS, SIZES, icons, images, LINK } from '../constants';

// Scan QR code Screen
const Scan = ({ route, navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [serialNumber, setSerialNumber] = useState(null);
  const [order, setOrder] = useState(null);
  const [phoneNo, setPhoneNo] = useState(null);
  const [packageTag, setPackageTag] = useState(null);
  const [modeTag, setModeTag] = useState(null);
  const [count, setCount] = useState(null);

  const inFocus = navigation.addListener('focus', () => {
    setScanned(false);
    setSerialNumber(null);
    setOrder(null);
    setPhoneNo(global.user.phoneNo);
    setModeTag(global.modeTag);
    setCount(null);
    let orderTemp = null;
    if (route.params) {
      setModeTag(route.params.modeTag);
      orderTemp = route.params.order;
      if (orderTemp) {
        setOrder(orderTemp);
        setPhoneNo(orderTemp.customerPhoneNo);
      }
    }

    if (route.params && route.params.modeTag === 'RestaurantDelivery') {
      setPackageTag('Customer');
    } else if (global.modeTag === 'Restaurant') {
      setPackageTag('Collected');
    } else if (global.modeTag === 'Warehouse') {
      setPackageTag('Warehouse');
    } else {
      setPackageTag('Personnel');
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

  //function to add discount vouchers to user's account on returning reusable package
  async function addPromoReward(phoneNo) {
    var url = LINK + '/user/givePromoReward';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNo,
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      } else {
        setModalVisible(true);
      }
    } catch (err) {
      alert("Can't Process Order");
    }
  }

  //function to refund reusable package amount on return reusable package
  async function addWalletMoney(phoneNo) {
    var url = LINK + '/user/addWalletMoney';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNo: phoneNo,
          amount: 1.0,
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
    } catch (err) {
      alert("Can't Process Order");
    }
  }

  //functin to delete order from restaurant's pending order array on scanning reusable package
  async function deleteOrder() {
    var url = LINK + '/user/removeOrder';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderID: order._id,
          phoneNo: global.user.phoneNo,
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      } else {
        global.user = responseData.user;
        setModalVisible(true);
      }
    } catch (err) {
      alert("Can't Process Order");
    }
  }

  //function to request change tag, user phone no in package database
  async function scanPackage(serialNumber) {
    var url = LINK + '/package/scanPackage';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serialNumber: serialNumber,
          phoneNo: phoneNo,
          packageTag: packageTag,
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      } else {
        if (responseData.count) {
          setCount(responseData.count);
        }
        if (modeTag === 'RestaurantDelivery') {
          deleteOrder();
        } else if (
          responseData.lastPackageTag &&
          responseData.lastPackageTag === 'Customer'
        ) {
          addWalletMoney(responseData.userPhoneNo);
          addPromoReward(responseData.userPhoneNo);
        } else {
          setModalVisible(true);
        }
      }
    } catch (err) {
      alert('Cant Find Package');
      setScanned(false);
      setSerialNumber(null);
    }
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setSerialNumber(data);
    scanPackage(data);
  };

  const handleClicked = () => {
    setScanned(true);
    setModalVisible(false);
    if (modeTag === 'Restaurant') {
      navigation.navigate('RestaurantHome', { fetch: false });
    } else if (modeTag === 'RestaurantDelivery') {
      navigation.navigate('RestaurantHome', { fetch: false });
    } else if (modeTag === 'Warehouse') {
      navigation.navigate('WarehouseHome');
    } else {
      navigation.navigate('PersonnelHome', { fetch: false });
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
        <View style={{ flex: 1, marginLeft: SIZES.padding * 1 }}>
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
              tintColor: COLORS.black,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderScanFocus() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          source={images.focus}
          resizeMode="stretch"
          style={{
            marginTop: '-15%',
            width: 200,
            height: 200,
          }}
        />
      </View>
    );
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
          backgroundColor: COLORS.white,
        }}
      >
        <Text style={{ ...FONTS.h4 }}>Or Enter Serial Number:</Text>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginTop: SIZES.padding * 2,
          }}
        >
          <TextInput
            style={{
              borderBottomColor: COLORS.black,
              borderBottomWidth: 1,
              height: 40,
              width: '100%',
              color: COLORS.black,
              ...FONTS.body3,
            }}
            placeholder="Serial Number"
            placeholderTextColor={COLORS.black}
            selectionColor={COLORS.black}
            value={serialNumber}
            onChangeText={(text) => setSerialNumber(text)}
          />
        </View>
      </View>
    );
  }

  function renderButton() {
    return (
      <View style={{ margin: SIZES.padding * 6 }}>
        <TouchableOpacity
          style={{
            height: 60,
            backgroundColor: COLORS.black,
            borderRadius: SIZES.radius / 1.5,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            setScanned(true);
            scanPackage(serialNumber);
          }}
        >
          <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Continue</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderModeModal() {
    var text;
    if (modeTag === 'Restaurant') {
      text =
        'Thank you for collecting the package. We will soon collect the package from you for cleaning. ';
    } else if (modeTag === 'RestaurantDelivery') {
      text =
        'Our delivery personnel will shortly collect the package and will deliver it to the customer. Thank you for choosing to be a partner with Uber Eats.';
    } else if (modeTag === 'Warehouse') {
      text = 'The Package has been successfully collected at Warehouse.';
    } else {
      text =
        'Thank you for collecting the package. Please deposit at any collection centre as per your convenience.';
    }

    function renderPackageCount() {
      if (modeTag === 'Warehouse') {
        return (
          <Text
            style={{
              color: COLORS.black,
              marginVertical: SIZES.padding,
              marginLeft: 3 * SIZES.padding,
              ...FONTS.body2,
              width: SIZES.width * 0.8,
            }}
          >
            Fun Fact: This package has been used {count} times till now!.
          </Text>
        );
      } else return <View></View>;
    }
    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback
          onPress={() => {
            handleClicked();
          }}
        >
          <View style={{ flex: 1, flexDirection: 'column-reverse' }}>
            <View
              style={{
                height: 500,
                width: '100%',
                backgroundColor: COLORS.white,
                borderRadius: SIZES.radius,
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 5 * SIZES.padding,
                  alignItems: 'center',
                }}
              >
                <Image
                  source={icons.success}
                  resizeMode="contain"
                  style={{
                    height: 60,
                    width: 60,
                    tintColor: COLORS.primary,
                  }}
                />
                <Text
                  style={{
                    color: COLORS.black,
                    ...FONTS.body1,
                  }}
                >
                  Successful!
                </Text>
              </View>

              <Text
                style={{
                  color: COLORS.black,
                  marginVertical: 3 * SIZES.padding,
                  marginLeft: 3 * SIZES.padding,
                  ...FONTS.body3,
                  width: SIZES.width * 0.8,
                }}
              >
                Package No: {serialNumber}
              </Text>
              <Text
                style={{
                  color: COLORS.black,
                  marginVertical: SIZES.padding,
                  marginLeft: 3 * SIZES.padding,
                  ...FONTS.body2,
                  width: SIZES.width * 0.8,
                }}
              >
                {text}
              </Text>
              {renderPackageCount()}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.transparent }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{
          position: 'absolute',
          top: '-10%',
          left: 0,
          bottom: 0,
          right: 0,
        }}
      />
      {/* {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />} */}
      {renderHeader()}
      {renderScanFocus()}
      {renderOtherOption()}
      {renderButton()}
      {renderModeModal()}
    </View>
  );
};

export default Scan;
