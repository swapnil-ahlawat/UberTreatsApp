import React, { useState } from 'react';
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
  Image,
} from 'react-native';

import { COLORS, SIZES, FONTS, icons, LINK } from '../constants';

// First screen where restaurant owner comes on signing in
const WarehouseHome = ({ navigation }) => {
  const [lotNumber, SetLotNumber] = useState(null);
  const [lotSize, SetLotSize] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  //function to add new packages to database
  async function addPackageHandler() {
    try {
      const response = await fetch(LINK + '/package/addPackage', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lotNumber: lotNumber,
          numPackages: lotSize,
        }),
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      } else {
        setModalVisible(true);
      }
    } catch (err) {
      alert('Cannot Process');
    }
  }

  function renderHeader() {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View
          style={{
            height: 50,
            width: '60%',
            justifyContent: 'center',
            paddingHorizontal: SIZES.padding * 3,
            borderBottomRightRadius: SIZES.radius,
            backgroundColor: COLORS.primary,
          }}
        >
          <Text style={{ ...FONTS.h3, color: COLORS.white }}>Get Packages</Text>
        </View>

        <TouchableOpacity
          style={{
            width: 50,
            paddingRight: SIZES.padding,
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Image
            source={icons.signOut}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
              tintColor: COLORS.gray,
            }}
          />
        </TouchableOpacity>
      </View>
    );
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
          <Text style={{ color: COLORS.white, ...FONTS.body2 }}>
            Enter Box Lot Number
          </Text>
          <TextInput
            style={{
              marginVertical: SIZES.padding,
              borderBottomColor: COLORS.white,
              borderBottomWidth: 1,
              height: 40,
              color: COLORS.white,
              ...FONTS.body3,
            }}
            placeholder="Enter Lot Number"
            placeholderTextColor={COLORS.white}
            selectionColor={COLORS.white}
            value={lotNumber}
            onChangeText={(text) => SetLotNumber(text)}
          />
        </View>

        <View style={{ marginTop: SIZES.padding * 3 }}>
          <Text style={{ color: COLORS.white, ...FONTS.body2 }}>
            Enter Lot Size
          </Text>
          <TextInput
            style={{
              marginVertical: SIZES.padding,
              borderBottomColor: COLORS.white,
              borderBottomWidth: 1,
              height: 40,
              color: COLORS.white,
              ...FONTS.body3,
            }}
            placeholder="Enter Lot Size"
            placeholderTextColor={COLORS.white}
            selectionColor={COLORS.white}
            value={lotSize}
            onChangeText={(text) => SetLotSize(text)}
          />
        </View>
      </View>
    );
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
            justifyContent: 'center',
          }}
          onPress={() => {
            addPackageHandler();
          }}
        >
          <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Add Packages</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderSuccessModal() {
    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback
          onPress={() => {
            SetLotNumber(null);
            SetLotSize(null);
            setModalVisible(false);
          }}
        >
          <View style={{ flex: 1, flexDirection: 'column-reverse' }}>
            <View
              style={{
                height: 400,
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
                  marginVertical: SIZES.padding,
                  marginLeft: 3 * SIZES.padding,
                  ...FONTS.body2,
                  width: SIZES.width * 0.8,
                }}
              >
                Packages with Lot no. {lotNumber} added to Warehouse database.
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.black,
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      {renderHeader()}
      {renderForm()}
      {renderButton()}
      {renderSuccessModal()}
    </SafeAreaView>
  );
};

export default WarehouseHome;
