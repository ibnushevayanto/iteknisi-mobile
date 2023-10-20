import React from 'react';
import {ImageBackground, Image} from 'react-native';
import Button from '../../components/UI/Button';
import {View, Text} from 'react-native-ui-lib';
import tailwind from 'twrnc';
import TextField from '../../components/Field/TextField';
import Ionicon from 'react-native-vector-icons/Ionicons';

export default function ({}) {
  return (
    <ImageBackground
      source={require('../../assets/images/bg_home.png')}
      style={tailwind`flex-1 justify-around	 w-100 p-6`}>
      <Image source={require('../../assets/images/ill_cek_kode.png')} />
      <View style={[tailwind`rounded-xl p-4 bg-white`, {elevation: 16}]}>
        <Text style={tailwind`text-lg font-medium text-center`}>
          Cek Kode Booking
        </Text>
        <View style={tailwind`mt-4`}>
          <TextField
            placeholder={'Kode Booking'}
            append={() => <Ionicon size={20} color={'#acacac'} name="search" />}
          />
          <Button
            bgColor={'#0C0C0F'}
            textStyle={tailwind`text-white font-medium`}>
            Mulai Pencarian
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
}
