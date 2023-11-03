import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileUserScreen from '../../screens/registered/Profile/ProfileUserScreen';
import UbahProfileUserScreen from '../../screens/registered/Profile/UbahProfileUserScreen';

const Stack = createNativeStackNavigator();

export default function () {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={ProfileUserScreen} name="ProfileUser" />
      <Stack.Screen component={UbahProfileUserScreen} name="UbahProfile" />
    </Stack.Navigator>
  );
}
