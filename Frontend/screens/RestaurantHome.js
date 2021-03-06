import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Platform,
  StatusBar,
} from 'react-native';
import { icons, SIZES, COLORS, FONTS, LINK } from '../constants';

// First screen where restaurant owner comes on signing in
const RestaurantHome = ({ route, navigation }) => {
  const [orders, setOrders] = useState(null);
  const [fetchFlag, setFetchFlag] = useState(true);

  const inFocus = navigation.addListener('state', () => {
    setFetchFlag(true);
  });

  useEffect(() => {
    return () => {
      inFocus;
    };
  }, [navigation]);

  //function to request pending orders from server
  async function fetchOrder() {
    if (fetchFlag) {
      setFetchFlag(false);

      var url =
        LINK +
        '/user/getOrders?phoneNo=' +
        global.user.phoneNo +
        '&userType=Restaurant';
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        } else {
          setOrders(responseData.pendingOrders);
        }
      } catch (err) {
        alert('Server Unreachable.');
      }
    }
  }

  function renderHeader() {
    return (
      <SafeAreaView
        style={{
          flexDirection: 'row',
          height: 50,
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            height: 50,
            width: '80%',
            justifyContent: 'center',
            borderBottomRightRadius: SIZES.radius,
            backgroundColor: COLORS.primary,
            paddingLeft: SIZES.padding,
          }}
        >
          <Text style={{ ...FONTS.h3, color: COLORS.white }}>
            {global.user.name}
          </Text>
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
      </SafeAreaView>
    );
  }

  function renderRestaurantList() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={{
          paddingVertical: 2 * SIZES.padding,
          marginVertical: 0.5 * SIZES.padding,
          flex: 1,
          flexDirection: 'column',
          width: SIZES.width * 0.9,
          backgroundColor: COLORS.white,
          // height: 100,
          borderRadius: 20,
        }}
        onPress={() =>
          navigation.navigate('Order', {
            item,
          })
        }
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: SIZES.padding,
          }}
        >
          <Text style={{ ...FONTS.body3, color: COLORS.black }}>
            {item?.customerName}
          </Text>
          <Text style={{ ...FONTS.body3, color: COLORS.black }}>
            {item?.foodItems.length}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: SIZES.padding,
          }}
        >
          {/* <Text style={{ ...FONTS.body3,color: COLORS.black  }}>{item.address}</Text> */}
          <Text style={{ ...FONTS.body3, color: COLORS.black }}>
            {item?.customerAddress}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: SIZES.padding,
          }}
        >
          {/* <Text style={{ ...FONTS.body3,color: COLORS.black  }}>{item.address}</Text> */}
          <Text style={{ ...FONTS.body3, color: COLORS.black }}>
            {item?.customerPhoneNo}
          </Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding * 2,
          marginTop: SIZES.padding * 2,
        }}
      >
        <Text style={{ paddingVertical: 10, ...FONTS.h2, color: COLORS.white }}>
          In Progress ({orders?.length})
        </Text>
        <FlatList
          data={orders}
          keyExtractor={(item) => `${item?._id}`}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingBottom: 30,
          }}
        />
      </View>
    );
  }

  fetchOrder();
  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderRestaurantList()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: COLORS.black,
  },
});

export default RestaurantHome;
