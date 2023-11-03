import React, {useState} from 'react';
import {View, Text} from 'react-native-ui-lib';
import tailwind from 'twrnc';
import PublicTopbar from '../../components/Custom/PublicTopbar';
import Button from '../../components/UI/Button';
import TextField from '../../components/Field/TextField';
import LoadingOverlay from '../../components/UI/LoadingOverlay';

export default function () {
  const [formDaftar, setFormDaftar] = useState({
    email: null,
    password: null,
    confirm_password: null,
    nama: null,
    telp: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const changeValueForm = async (value, key) => {
    const currentForm = {
      ...formDaftar,
    };
    currentForm[key] = value;

    setFormDaftar(currentForm);
  };

  return (
    <View style={tailwind`flex-1`}>
      <PublicTopbar title="Daftar" />

      {/* Container Form Login */}
      <View style={tailwind`mx-4`}>
        <Text style={tailwind`text-gray-400 mb-4`}>
          Setelah klik daftar, kami akan mengirimkan link untuk memverifikasi
          email anda.
        </Text>
        <TextField
          value={formDaftar.email}
          label={'Email'}
          placeholder={'Email'}
          onChangeText={value => changeValueForm(value, 'email')}
        />
        <TextField
          onChangeText={value => changeValueForm(value, 'password')}
          label={'Password'}
          value={formDaftar.password}
          isSecureText={true}
          placeholder={'Password'}
        />
        <TextField
          onChangeText={value => changeValueForm(value, 'confirm_password')}
          label={'Confirm Password'}
          value={formDaftar.confirm_password}
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
