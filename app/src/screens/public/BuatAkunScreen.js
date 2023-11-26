import React, {useState} from 'react';
import {View, Text, Toast} from 'react-native-ui-lib';
import tailwind from 'twrnc';
import PublicTopbar from '../../components/Custom/PublicTopbar';
import Button from '../../components/UI/Button';
import TextField from '../../components/Field/TextField';
import LoadingOverlay from '../../components/UI/LoadingOverlay';
import {reqDaftar} from '../../utils/auth';

const defaultForm = {
  email: null,
  password: null,
  confirm_password: null,
  nama: null,
  telp: null,
  usergroupid: 3,
};
export default function () {
  const [formDaftar, setFormDaftar] = useState(defaultForm);
  const [isLoading, setIsLoading] = useState(false);

  const changeValueForm = async (value, key) => {
    const currentForm = {
      ...formDaftar,
    };
    currentForm[key] = value;

    setFormDaftar(currentForm);
  };

  const buatAkunHandler = async () => {
    if (formDaftar.password !== formDaftar.confirm_password) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Password tidak sama dengan konfirmasi password',
      });
      return;
    }

    setIsLoading(true);
    await reqDaftar(formDaftar);
    setIsLoading(false);
  };

  return (
    <View style={tailwind`flex-1`}>
      {isLoading && <LoadingOverlay />}
      <PublicTopbar title="Daftar" />

      {/* Container Form Login */}
      <View style={tailwind`mx-4`}>
        <TextField
          onChangeText={value => changeValueForm(value, 'nama')}
          label={'Nama'}
          value={formDaftar.nama}
          placeholder={'Nama'}
        />
        <TextField
          value={formDaftar.email}
          label={'Email'}
          placeholder={'Email'}
          onChangeText={value => changeValueForm(value, 'email')}
        />

        <TextField
          onChangeText={value => changeValueForm(value, 'telp')}
          label={'Nomor Telepon'}
          value={formDaftar.telp}
          placeholder={'Nomor Telepon'}
          keyboardType={'number-pad'}
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
          containerStyle={tailwind`mt-4`}
          onPress={buatAkunHandler}>
          Buat Akun
        </Button>
      </View>
      {/* End Container Form Login */}
    </View>
  );
}
