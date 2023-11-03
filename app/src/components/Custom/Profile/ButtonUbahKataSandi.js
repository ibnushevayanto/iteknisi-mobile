import React, {useState} from 'react';
import {View, Text} from 'react-native-ui-lib';
import Button from '../../UI/Button';
import tailwind from 'twrnc';
import {Modal, Pressable, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextField from '../../Field/TextField';

export default function () {
  const [isVisibleForm, setIsVisibleForm] = useState(false);
  const [formChangePassword, setFormChangePassword] = useState({
    password_lama: null,
    password_baru: null,
    confirm_password: null,
  });

  const changeValueForm = (value, key) => {
    const currentForm = {...formChangePassword};
    currentForm[key] = value;

    setFormChangePassword(currentForm);
  };

  return (
    <>
      <Modal transparent visible={isVisibleForm} animationType="slide">
        <>
          <View
            style={[
              tailwind`flex-1`,
              {backgroundColor: 'rgba(0,0,0,0.8)'},
            ]}></View>

          <View style={tailwind`p-4 bg-white rounded-t-lg`}>
            <TouchableOpacity
              style={tailwind`items-center`}
              onPress={() => setIsVisibleForm(false)}>
              <Ionicons name="chevron-down" color="#acacac" size={24} />
            </TouchableOpacity>
            <View style={tailwind`mt-4`}>
              <View style={tailwind`mb-4`}>
                <Text style={tailwind`text-xl font-black`}>
                  Ubah Kata Sandi
                </Text>
              </View>
              <View style={tailwind`mb-4`}>
                <Text style={tailwind`text-gray-600 text-sm`}>
                  Password Lama
                </Text>
                <TextField
                  value={formChangePassword.password_lama}
                  isSecureText
                  onChangeText={value =>
                    changeValueForm(value, 'password_lama')
                  }
                />
              </View>
              <View style={tailwind`mb-4`}>
                <Text style={tailwind`text-gray-600 text-sm`}>
                  Password Baru
                </Text>
                <TextField
                  isSecureText
                  value={formChangePassword.password_baru}
                  onChangeText={value =>
                    changeValueForm(value, 'password_baru')
                  }
                />
              </View>
              <View style={tailwind`mb-4`}>
                <Text style={tailwind`text-gray-600 text-sm`}>
                  Confirm Password
                </Text>
                <TextField
                  isSecureText
                  value={formChangePassword.confirm_password}
                  onChangeText={value =>
                    changeValueForm(value, 'confirm_password')
                  }
                />
              </View>
            </View>
            <Button bgColor={'#6A5AE0'} textStyle={tailwind`text-white`}>
              Kirim
            </Button>
          </View>
        </>
      </Modal>
      <Button
        bgColor={'#DCDDDC'}
        onPress={() => setIsVisibleForm(true)}
        containerStyle={tailwind`mt-4`}>
        Ubah Kata Sandi
      </Button>
    </>
  );
}
