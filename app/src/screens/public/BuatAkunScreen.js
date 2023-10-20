import React from 'react';
import {View, Text} from 'react-native-ui-lib';
import tailwind from 'twrnc';
import PublicTopbar from '../../components/Custom/PublicTopbar';
import Button from '../../components/UI/Button';
import TextField from '../../components/Field/TextField';

export default function () {
  return (
    <View style={tailwind`flex-1`}>
      <PublicTopbar title="Daftar" />

      {/* Container Form Login */}
      <View style={tailwind`mx-4`}>
        <Text style={tailwind`text-gray-400 mb-4`}>
          Setelah klik daftar, kami akan mengirimkan link untuk memverifikasi
          email anda.
        </Text>
        <TextField label={'Email'} placeholder={'Email'} />
        <TextField
          label={'Password'}
          isSecureText={true}
          placeholder={'Password'}
        />
        <TextField
          label={'Confirm Password'}
          isSecureText={true}
          placeholder={'Confirm Password'}
        />
        <Button
          bgColor={'#0C0C0F'}
          textStyle={tailwind`text-white`}
          containerStyle={tailwind`mt-4`}>
          Buat Akun
        </Button>
      </View>
      {/* End Container Form Login */}
    </View>
  );
}
