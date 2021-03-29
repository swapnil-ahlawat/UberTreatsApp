import React from 'react';
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

import { icons, images, SIZES, COLORS, FONTS } from '../constants';

//First screen where customer comes on signing in
const CustomerHome = ({ navigation }) => {
  const categoryData = [
    {
      id: 1,
      name: 'All',
      icon: icons.hotdog,
    },
    {
      id: 2,
      name: 'Rice',
      icon: icons.rice_bowl,
    },
    {
      id: 3,
      name: 'Snacks',
      icon: icons.hamburger,
    },
    {
      id: 4,
      name: 'Salads',
      icon: icons.salad,
    },
  ];

  // price rating
  const affordable = 1;
  const fairPrice = 2;
  const expensive = 3;

  const restaurantData = [
    {
      id: 1,
      name: "Harley's Burgers",
      reusablePackage: true,
      rating: 4.8,
      categories: [1, 3],
      priceRating: affordable,
      phoneNo: 98982,
      photo: images.burger_restaurant_1,
      duration: '30 - 45 min',
      courier: {
        name: 'Andy',
        phoneNo: 98986,
      },
      menu: [
        {
          menuId: 1,
          name: 'Crispy Chicken Burger',
          photo: images.crispy_chicken_burger,
          description: 'Burger with crispy chicken, cheese and lettuce',
          calories: 200,
          price: 10,
        },
        {
          menuId: 2,
          name: 'Crispy Chicken Burger with Honey Mustard',
          photo: images.honey_mustard_chicken_burger,
          description: 'Crispy Chicken Burger with Honey Mustard Coleslaw',
          calories: 250,
          price: 15,
        },
        {
          menuId: 3,
          name: 'Crispy Baked French Fries',
          photo: images.baked_fries,
          description: 'Crispy Baked French Fries',
          calories: 194,
          price: 8,
        },
      ],
    },
    {
      id: 2,
      name: 'Mama Mia Pizza',
      reusablePackage: false,
      rating: 4.8,
      categories: [1, 3, 4],
      priceRating: expensive,
      phoneNo: 98983,
      photo: images.pizza_restaurant,
      duration: '15 - 20 min',
      courier: {
        name: 'Andy',
        phoneNo: 98986,
      },
      menu: [
        {
          menuId: 4,
          name: 'Hawaiian Pizza',
          photo: images.hawaiian_pizza,
          description: 'Canadian bacon, homemade pizza crust, pizza sauce',
          calories: 250,
          price: 15,
        },
        {
          menuId: 5,
          name: 'Tomato & Basil Pizza',
          photo: images.pizza,
          description:
            'Fresh tomatoes, aromatic basil pesto and melted bocconcini',
          calories: 250,
          price: 20,
        },
        {
          menuId: 6,
          name: 'Tomato Pasta',
          photo: images.tomato_pasta,
          description: 'Pasta with fresh tomatoes',
          calories: 100,
          price: 10,
        },
        {
          menuId: 7,
          name: 'Mediterranean Chopped Salad ',
          photo: images.salad,
          description: 'Finely chopped lettuce, tomatoes, cucumbers',
          calories: 100,
          price: 10,
        },
      ],
    },
    {
      id: 3,
      name: 'Grand Hotdogs',
      reusablePackage: true,
      rating: 4.8,
      categories: [1, 3],
      priceRating: expensive,
      phoneNo: 98984,
      photo: images.hot_dog_restaurant,
      duration: '20 - 25 min',
      courier: {
        name: 'Andy',
        phoneNo: 98986,
      },
      menu: [
        {
          menuId: 8,
          name: 'Chicago Style Hot Dog',
          photo: images.chicago_hot_dog,
          description: 'Fresh tomatoes, all beef hot dogs',
          calories: 100,
          price: 20,
        },
      ],
    },
    {
      id: 4,
      name: 'Manchow Cuisine',
      reusablePackage: false,
      rating: 4.8,
      categories: [1, 2, 4],
      priceRating: affordable,
      phoneNo: 98985,
      photo: images.noodle_shop,
      duration: '15 - 20 min',
      courier: {
        name: 'Andy',
        phoneNo: 98986,
      },
      menu: [
        {
          menuId: 10,
          name: 'Kolo Mee',
          photo: images.kolo_mee,
          description: 'Noodles with char siu',
          calories: 200,
          price: 5,
        },
        {
          menuId: 11,
          name: 'Sarawak Laksa',
          photo: images.sarawak_laksa,
          description: 'Vermicelli noodles, cooked prawns',
          calories: 300,
          price: 8,
        },
        {
          menuId: 12,
          name: 'Nasi Lemak',
          photo: images.nasi_lemak,
          description: 'A traditional Malay rice dish',
          calories: 300,
          price: 8,
        },
        {
          menuId: 13,
          name: 'Nasi Briyani with Mutton',
          photo: images.nasi_briyani_mutton,
          description: 'A traditional Indian rice dish with mutton',
          calories: 300,
          price: 8,
        },
      ],
    },
  ];

  const [categories, setCategories] = React.useState(categoryData);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [restaurants, setRestaurants] = React.useState(restaurantData);

  function onSelectCategory(category) {
    //filter restaurant
    let restaurantList = restaurantData.filter((a) =>
      a.categories.includes(category.id)
    );

    setRestaurants(restaurantList);

    setSelectedCategory(category);
  }

  function getCategoryNameById(id) {
    let category = categories.filter((a) => a.id == id);

    if (category.length > 0) return category[0].name;

    return '';
  }

  function renderHeader() {
    return (
      <SafeAreaView style={{ flexDirection: 'row', height: 50 }}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              width: '90%',
              height: '100%',
              backgroundColor: COLORS.primary,
              paddingLeft: SIZES.padding * 3,
              justifyContent: 'center',
              borderBottomRightRadius: SIZES.radius,
            }}
          >
            <Text style={{ ...FONTS.h3, color: COLORS.white }}>
              {global.user.address}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  function renderMainCategories() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{
            padding: SIZES.padding,
            paddingBottom: SIZES.padding * 2,
            backgroundColor:
              selectedCategory?.id == item.id ? COLORS.primary : COLORS.white,
            borderRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: SIZES.padding,
            ...styles.shadow,
          }}
          onPress={() => onSelectCategory(item)}
        >
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                selectedCategory?.id == item.id
                  ? COLORS.white
                  : COLORS.lightGray,
            }}
          >
            <Image
              source={item.icon}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
              }}
            />
          </View>

          <Text
            style={{
              marginTop: SIZES.padding,
              color:
                selectedCategory?.id == item.id ? COLORS.white : COLORS.black,
              ...FONTS.body5,
            }}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ padding: SIZES.padding * 2 }}>
        <Text style={{ ...FONTS.h1, color: COLORS.white }}>
          Main Categories
        </Text>

        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
        />
      </View>
    );
  }

  function renderRestaurantList() {
    function greenTag(item) {
      if (item.reusablePackage) {
        return (
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              height: 40,
              width: SIZES.width * 0.5,
              backgroundColor: COLORS.primary,
              borderTopLeftRadius: SIZES.radius,
              borderBottomRightRadius: SIZES.radius,
              alignItems: 'center',
              justifyContent: 'center',
              ...styles.shadow,
            }}
          >
            <Text style={{ ...FONTS.body3, color: COLORS.white }}>
              Environment Friendly
            </Text>
          </View>
        );
      } else {
        <View></View>;
      }
    }
    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={{ marginBottom: SIZES.padding * 2 }}
        onPress={() =>
          navigation.navigate('Restaurant', {
            item,
          })
        }
      >
        {/* Image */}
        <View
          style={{
            marginBottom: SIZES.padding,
          }}
        >
          <Image
            source={item.photo}
            resizeMode="cover"
            style={{
              width: '100%',
              height: 200,
              borderRadius: SIZES.radius,
            }}
          />

          <View
            style={{
              position: 'absolute',
              bottom: 0,
              height: 50,
              width: SIZES.width * 0.3,
              backgroundColor: COLORS.white,
              borderTopRightRadius: SIZES.radius,
              borderBottomLeftRadius: SIZES.radius,
              alignItems: 'center',
              justifyContent: 'center',
              ...styles.shadow,
            }}
          >
            <Text style={{ ...FONTS.h4 }}>{item.duration}</Text>
          </View>
          {greenTag(item)}
        </View>

        {/* Restaurant Info */}
        <Text style={{ ...FONTS.body2, color: COLORS.white }}>{item.name}</Text>

        <View
          style={{
            marginTop: SIZES.padding,
            flexDirection: 'row',
          }}
        >
          {/* Rating */}
          <Image
            source={icons.star}
            style={{
              height: 20,
              width: 20,
              tintColor: COLORS.primary,
              marginRight: 10,
            }}
          />
          <Text style={{ ...FONTS.body3, color: COLORS.white }}>
            {item.rating}
          </Text>

          {/* Categories */}
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 10,
            }}
          >
            {item.categories.map((categoryId) => {
              return (
                <View style={{ flexDirection: 'row' }} key={categoryId}>
                  <Text style={{ ...FONTS.body3, color: COLORS.white }}>
                    {getCategoryNameById(categoryId)}
                  </Text>
                  <Text style={{ ...FONTS.h3, color: COLORS.white }}> . </Text>
                </View>
              );
            })}

            {/* Price */}
            {[1, 2, 3].map((priceRating) => (
              <Text
                key={priceRating}
                style={{
                  ...FONTS.body3,
                  color:
                    priceRating <= item.priceRating
                      ? COLORS.white
                      : COLORS.darkgray,
                }}
              >
                $
              </Text>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    );

    return (
      <FlatList
        data={restaurants}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding * 2,
          paddingBottom: 30,
        }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderMainCategories()}
      {renderRestaurantList()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
});

export default CustomerHome;
