import React from 'react';
import {View, Text} from 'react-native-ui-lib';
import tailwind from 'twrnc';
import {Image, ScrollView, TouchableOpacity} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {getDataLogin} from '../../../store/public/uiReducer';
import {useSelector, useDispatch} from 'react-redux';
import Button from '../../../components/UI/Button';
import {SET_DATA_LOGIN} from '../../../store/public/uiReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonUbahKataSandi from '../../../components/Custom/Profile/ButtonUbahKataSandi';

export default function ({navigation}) {
  const dataLogin = useSelector(getDataLogin);
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    await AsyncStorage.removeItem('datalogin');
    dispatch(SET_DATA_LOGIN(null));
  };

  return (
    <View style={tailwind`flex-1`}>
      <ScrollView showsVerticalScrollIndicator={false} style={tailwind`flex-1`}>
        <View
          style={[
            tailwind`px-6 py-12 flex-row items-center justify-between`,
            {backgroundColor: '#0C0C0F'},
          ]}>
          <View>
            <Text style={tailwind`font-black text-2xl text-white`}>
              {dataLogin?.nama}
            </Text>
            <Text style={[tailwind`font-medium`, {color: '#FFD5DD'}]}>
              {dataLogin?.telp || '-'}
            </Text>
          </View>
          {dataLogin?.image && (
            <Image
              source={{uri: dataLogin.image}}
              style={{width: 64, height: 64, borderRadius: 16}}
            />
          )}
        </View>
        <View
          style={[
            tailwind`rounded-t-xl -mt-4 p-4`,
            {backgroundColor: '#F2F2F2'},
          ]}>
          <View style={tailwind`flex-row items-center justify-between mb-4`}>
            <Text style={tailwind`text-xl`}>Profile</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('UbahProfile')}>
              <Ionicon name="create" size={24} color={'#acacac'} />
            </TouchableOpacity>
          </View>
          <View>
            <View style={tailwind`mb-4`}>
              <View
                style={tailwind`mb-2 flex-row items-center justify-between`}>
                <Text style={{color: '#6A5AE0'}}>Email</Text>
                <Button
                  bgColor={'#6A5AE0'}
                  textStyle={tailwind`text-white`}
                  small>
                  Verifikasi Email
                </Button>
              </View>
              <Text>{dataLogin.email}</Text>
            </View>
            <View style={tailwind`mb-2`}>
              <Text style={[{color: '#6A5AE0'}, tailwind`mb-2`]}>Alamat</Text>
              {!dataLogin.alamat.length && (
                <Text style={tailwind`text-center text-xs text-gray-500`}>
                  Data alamat masih kosong
                </Text>
              )}
              {dataLogin.alamat.forEach(itemAlamat => {
                <View
                  style={[
                    tailwind`p-4 rounded-xl bg-yellow-100 mb-2`,
                    {
                      borderWidth: 1,
                      borderColor: !!itemAlamat.isDefault ? '#EFEEFC' : 'white',
                    },
                  ]}>
                  <Text style={tailwind`font-bold`}>{itemAlamat.alamat}</Text>
                  <Text style={tailwind`text-sm`}>{itemAlamat.deskripsi}</Text>
                </View>;
              })}
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={tailwind`p-4`}>
        <ButtonUbahKataSandi />
        <Button
          bgColor={'#0C0C0F'}
          textStyle={tailwind`text-white`}
          containerStyle={tailwind`mt-4`}
          onPress={logoutHandler}>
          Logout
        </Button>
      </View>
    </View>
  );
}
