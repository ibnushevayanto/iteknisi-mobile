import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DaftarOrderScreen from '../../screens/registered/Order/DaftarOrderScreen';
import ContactScreen from '../../screens/registered/Contact/ContactScreen';
import Ionicon from 'react-native-vector-icons/Ionicons';
import BerandaScreen from '../../screens/registered/Beranda/BerandaScreen';
import profile from './profile';

const Bottom = createBottomTabNavigator();

export default function () {
  return (
    <NavigationContainer>
      <Bottom.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          presentation: 'card',
          tabBarActiveTintColor: '#695AE0',
          tabBarInactiveTintColor: '#0C0B10',
        }}>
        <Bottom.Screen
          component={BerandaScreen}
          name="Landing"
          options={{
            tabBarIcon: ({color, size}) => (
              <Ionicon name="home" color={color} size={size / 1.3} />
            ),
            tabBarLabel: 'Beranda',
          }}
        />
        <Bottom.Screen
          component={DaftarOrderScreen}
          name="Order"
          options={{
            tabBarIcon: ({color, size}) => (
              <Ionicon name="document-text" color={color} size={size / 1.3} />
            ),
            tabBarLabel: 'Riwayat Order',
          }}
        />
        <Bottom.Screen
          component={ContactScreen}
          name="Contact"
          options={{
            tabBarIcon: ({color, size}) => (
              <Ionicon name="call" color={color} size={size / 1.3} />
            ),
            tabBarLabel: 'Kontak',
          }}
        />
        <Bottom.Screen
          component={profile}
          name="Profile"
          options={{
            tabBarIcon: ({color, size}) => (
              <Ionicon name="person" color={color} size={size / 1.3} />
            ),
            tabBarLabel: 'Profile',
          }}
        />
      </Bottom.Navigator>
    </NavigationContainer>
  );
}
