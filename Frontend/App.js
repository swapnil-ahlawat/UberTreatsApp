import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';

import { Restaurant, SignUp, Order, Cart, DeliverOrder } from './screens';
import CustomerTabs from './navigation/customerTabs';
import PersonnelTabs from './navigation/personnelTabs';
import RestaurantTabs from './navigation/restaurantTabs';
import WarehouseTabs from './navigation/warehouseTabs';

const Stack = createStackNavigator();

const App = () => {
  const [loaded] = useFonts({
    'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'SignUp'}
      >
        <Stack.Screen name="CustomerTabs" component={CustomerTabs} />
        <Stack.Screen name="PersonnelTabs" component={PersonnelTabs} />
        <Stack.Screen name="RestaurantTabs" component={RestaurantTabs} />
        <Stack.Screen name="WarehouseTabs" component={WarehouseTabs} />
        <Stack.Screen name="Restaurant" component={Restaurant} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Order" component={Order} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="DeliverOrder" component={DeliverOrder} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
