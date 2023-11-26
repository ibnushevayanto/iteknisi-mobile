import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native-ui-lib';
import tailwind from 'twrnc';
import {Image, ScrollView, TouchableOpacity} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import Button from '../../../components/UI/Button';
import {SET_DATA_LOGIN} from '../../../store/public/uiReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonUbahKataSandi from '../../../components/Custom/Profile/ButtonUbahKataSandi';
import {getDataUser} from '../../../utils/user';
import {useIsFocused} from '@react-navigation/native';
import LoadingOverlay from '../../../components/UI/LoadingOverlay';

export default function ({navigation}) {
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    await AsyncStorage.removeItem('datalogin');
    dispatch(SET_DATA_LOGIN(null));
  };
  const isFocussed = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [dataUser, setDataUser] = useState(null);

  useEffect(() => {
    if (isFocussed) {
      const loadData = async () => {
        setIsLoading(true);
        const {status, data} = await getDataUser();
        setIsLoading(false);

        if (status) {
          setDataUser(data);
        }
      };
      loadData();
    }
  }, [isFocussed]);

  return (
    <View style={tailwind`flex-1`}>
      {isLoading && <LoadingOverlay />}
      <ScrollView showsVerticalScrollIndicator={false} style={tailwind`flex-1`}>
        <View
          style={[
            tailwind`px-6 py-12 flex-row items-center justify-between`,
            {backgroundColor: '#0C0C0F'},
          ]}>
          <View>
            <Text style={tailwind`font-black text-2xl text-white`}>
              {dataUser?.nama}
            </Text>
            <Text style={[tailwind`font-medium`, {color: '#FFD5DD'}]}>
              {dataUser?.telp || '-'}
            </Text>
          </View>
          {dataUser?.image ? (
            <Image
              source={{uri: dataUser?.image}}
              style={{width: 64, height: 64, borderRadius: 16}}
            />
          ) : (
            <Image
              source={require('../../../assets/images/default_avatar.png')}
              style={{width: 64, height: 64, borderRadius: 16}}
            />
          )}
        </View>
        <View
          style={[
            tailwind`rounded-t-xl -mt-4 p-4`,
            {backgroundColor: '#F2F2F2'},
          ]}>
          <View style={tailwind`flex-row items-center justify-between mb-8`}>
            <Text style={tailwind`text-xl`}>Profile</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('UbahProfile', dataUser)}>
              <Ionicon name="create" size={28} color={'#acacac'} />
            </TouchableOpacity>
          </View>
          <View>
            <View style={tailwind`mb-4`}>
              <View
                style={tailwind`mb-2 flex-row items-center justify-between`}>
                <Text style={{color: '#6A5AE0'}}>Email</Text>
                {!+dataUser?.is_active && (
                  <Button
                    bgColor={'#6A5AE0'}
                    textStyle={tailwind`text-white`}
                    small>
                    Verifikasi Email
                  </Button>
                )}
              </View>
              <Text>{dataUser?.email}</Text>
            </View>
            <View style={tailwind`mb-2`}>
              <Text style={[{color: '#6A5AE0'}, tailwind`mb-2`]}>Alamat</Text>
              {!(dataUser?.users_alamats || []).length && (
                <Text style={tailwind`text-center text-xs text-gray-500`}>
                  Data alamat masih kosong
                </Text>
              )}
              {(dataUser?.users_alamats || []).map(itemAlamat => (
                <View
                  key={itemAlamat.id}
                  style={[
                    tailwind`p-4 rounded-xl mb-2`,
                    {
                      borderWidth: 1,
                      borderColor: '#EFEEFC',
                      backgroundColor: !!+itemAlamat.isDefault
                        ? '#E9E5FF'
                        : '#FFFFFF',
                    },
                  ]}>
                  <Text style={tailwind`font-bold`}>{itemAlamat.alamat}</Text>
                  <Text style={tailwind`text-sm`}>{itemAlamat.deskripsi}</Text>
                </View>
              ))}
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
