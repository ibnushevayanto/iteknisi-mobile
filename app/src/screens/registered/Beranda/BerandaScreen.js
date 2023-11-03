import React from 'react';
import {View, Text} from 'react-native-ui-lib';
import tailwind from 'twrnc';
import {TouchableOpacity, TextInput, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Menu from '../../../components/Custom/Beranda/Menu';

export default function () {
  return (
    <View flex>
      <View
        style={[
          tailwind`flex-row items-center p-4`,
          {backgroundColor: '#0C0C0F'},
        ]}>
        <TextInput
          style={tailwind`rounded-xl py-1 px-2 flex-1 bg-white mr-4`}
          placeholder="Masukkan Kode Booking"
        />
        <TouchableOpacity>
          <Ionicons name="notifications" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={tailwind`p-4 flex-1`}
        showsVerticalScrollIndicator={false}>
        <Menu />
      </ScrollView>
    </View>
  );
}
