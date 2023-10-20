import React from 'react';
import {View, Text} from 'react-native-ui-lib';
import PublicTopbar from '../../components/Custom/PublicTopbar';
import tailwind from 'twrnc';
import TextField from '../../components/Field/TextField';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Button from '../../components/UI/Button';

export default function () {
  return (
    <View style={tailwind`flex-1`}>
      <PublicTopbar title={'Lupa Password'} />
      <View style={tailwind`mx-4`}>
        <Text style={tailwind`text-gray-500 mb-4`}>
          Masukkan email dan kami akan mengirimkan sebuah link untuk mengatur
          ulang password
        </Text>
        <TextField
          label={'Alamat Email'}
          placeholder={'Email'}
          prepend={() => <Ionicon name="mail" size={20} color="#acacac" />}
        />
        <Button
          bgColor={'#0C0C0F'}
          textStyle={tailwind`text-white`}
          containerStyle={tailwind`mt-4`}>
          Reset Password
        </Button>
      </View>
    </View>
  );
}
