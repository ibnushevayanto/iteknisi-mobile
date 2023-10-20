import React from 'react';
import {View, Text} from 'react-native-ui-lib';
import tailwind from 'twrnc';
import {ImageBackground, Image} from 'react-native';
import Button from '../../components/UI/Button';

export default function ({navigation}) {
  return (
    <ImageBackground
      source={require('../../assets/images/bg_home.png')}
      style={tailwind`flex-1 justify-between w-100 p-6`}>
      <View style={tailwind`self-center`}>
        <View row centerH>
          <Image
            source={require('../../assets/images/logo_iteknisi.png')}
            style={{height: 48, width: 31.48}}
          />
        </View>
        <Text style={tailwind`text-sm font-semibold	mt-2`}>ITEKNISI</Text>
      </View>
      <Image source={require('../../assets/images/ill_login.png')} />
      <View style={[tailwind`rounded-xl p-4 bg-white`, {elevation: 16}]}>
        <Text style={tailwind`text-lg font-medium text-center`}>
          Masuk / Daftar
        </Text>
        <Text style={tailwind`text-center text-gray-400 mt-2`}>
          Masuk atau daftar akun untuk menggunakan seluruh fitur aplikasi
          iteknisi
        </Text>
        <View style={tailwind`mt-4`}>
          <Button
            bgColor={'#0C0C0F'}
            onPress={() => {
              navigation.navigate('Login');
            }}
            textStyle={tailwind`text-white font-medium`}>
            Masuk
          </Button>
          <Button
            bgColor={'#E6E6E6'}
            onPress={() => {
              navigation.navigate('BuatAkun');
            }}
            textStyle={tailwind`font-medium`}
            containerStyle={tailwind`mt-2`}>
            Buat Akun
          </Button>
          <Button
            bgColor={'white'}
            textStyle={tailwind`text-gray-400`}
            containerStyle={tailwind`mt-2`}
            onPress={() => navigation.navigate('CekKodeBooking')}>
            Cek Kode Booking
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
}
