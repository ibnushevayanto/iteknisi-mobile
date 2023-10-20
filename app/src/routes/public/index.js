import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingScreen from '../../screens/public/LandingScreen';
import LoginScreen from '../../screens/public/LoginScreen';
import BuatAkunScreen from '../../screens/public/BuatAkunScreen';
import CekKodeBooking from '../../screens/public/CekKodeBooking';
import LupaPasswordScreen from '../../screens/public/LupaPasswordScreen';

const Stack = createNativeStackNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

export default function () {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen component={LandingScreen} name="Landing" />
        <Stack.Screen component={LoginScreen} name="Login" />
        <Stack.Screen component={BuatAkunScreen} name="BuatAkun" />
        <Stack.Screen component={CekKodeBooking} name="CekKodeBooking" />
        <Stack.Screen component={LupaPasswordScreen} name="LupaPassword" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
