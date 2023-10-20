import React, {useState} from 'react';
import {View, Text} from 'react-native-ui-lib';
import TextField from '../../Field/TextField';
import {reqLogin} from '../../../utils/auth';
import LoadingOverlay from '../../UI/LoadingOverlay';
import tailwind from 'twrnc';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Button from '../../UI/Button';

export default function () {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [formLogin, setFormLogin] = useState({
    email: null,
    password: null,
  });

  const changeValueForm = (value, key) => {
    const currentForm = {
      ...formLogin,
    };
    currentForm[key] = value;
    setFormLogin(currentForm);
  };

  const loginHandler = async () => {
    setIsLoading(true);
    await reqLogin(formLogin);
    setIsLoading(false);
  };

  return (
    <View style={tailwind`m-4`}>
      {isLoading && <LoadingOverlay />}
      <TextField
        label={'Email'}
        value={formLogin.email}
        onChangeText={value => changeValueForm(value, 'email')}
        placeholder={'Email'}
        prepend={() => (
          <Ionicon
            name="mail"
            size={20}
            color={'#acacac'}
            style={tailwind`mr-1`}
          />
        )}
      />
      <TextField
        label={'Password'}
        isSecureText
        value={formLogin.password}
        onChangeText={value => changeValueForm(value, 'password')}
        prepend={() => (
          <Ionicon
            name="lock-closed"
            size={20}
            color={'#acacac'}
            style={tailwind`mr-1`}
          />
        )}
        placeholder={'Password'}
      />
      <Button
        bgColor={'#0C0C0F'}
        textStyle={tailwind`text-white`}
        containerStyle={tailwind`mt-4`}
        onPress={loginHandler}>
        Masuk
      </Button>
      <TouchableOpacity
        style={tailwind`mt-2`}
        onPress={() => navigation.navigate('LupaPassword')}>
        <Text style={tailwind`text-center font-bold`}>Lupa Password?</Text>
      </TouchableOpacity>
    </View>
  );
}
