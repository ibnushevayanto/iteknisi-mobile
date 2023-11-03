import React, {useState, useEffect} from 'react';
import {TouchableOpacity, ScrollView} from 'react-native';
import {View, Text} from 'react-native-ui-lib';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Button from '../../../components/UI/Button';
import tailwind from 'twrnc';
import AvatarUploadField from '../../../components/Field/AvatarUploadField';
import {useSelector} from 'react-redux';
import {getDataLogin} from '../../../store/public/uiReducer';
import TextField from '../../../components/Field/TextField';
import {useIsFocused} from '@react-navigation/native';
import FormAlamat from '../../../components/Custom/Profile/FormAlamat';

export default function ({navigation}) {
  const datalogin = useSelector(getDataLogin);
  const isFocussed = useIsFocused();
  const [formUser, setFormUser] = useState({
    foto: null,
    telp: null,
    nama: null,
    email: null,
  });
  const [alamat, setAlamat] = useState([]);
  const [alamatActive, setAlamatActive] = useState(null);

  useEffect(() => {
    if (isFocussed) {
      setAlamat(datalogin.alamat);
      changeValueFormUser([
        {
          value: datalogin.email,
          key: 'email',
        },
        {
          value: datalogin.nama,
          key: 'nama',
        },
        {
          value: datalogin.telp,
          key: 'telp',
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocussed]);

  const changeValueFormUser = (value, key) => {
    const currentForm = {...formUser};

    if (Array.isArray(value)) {
      for (const item of value) {
        currentForm[item.key] = item.value;
      }
    } else {
      currentForm[key] = value;
    }

    setFormUser(currentForm);
  };

  const submitAlamatHandler = valueAlamat => {
    const formAlamat = {...valueAlamat};
    if (!alamat.length) {
      formAlamat.isDefault = 1;
    }

    if (!formAlamat.id) {
      setAlamat(prevState => prevState.concat(formAlamat));
    }
  };

  return (
    <View flex>
      <View
        style={[
          tailwind`px-4 py-6 flex-row justify-between items-center`,
          {backgroundColor: '#0C0C0F'},
        ]}>
        <TouchableOpacity
          style={tailwind`flex-row items-center`}
          onPress={() => navigation.goBack()}>
          <Ionicon name="chevron-back" size={28} color={'#ffffff'} />
          <Text style={tailwind`ml-2 text-white text-xl`}>Ubah Profile</Text>
        </TouchableOpacity>
        <Button bgColor={'#6A5AE0'} textStyle={tailwind`text-white`}>
          Submmit
        </Button>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[
          tailwind`flex-1 p-4 rounded-t-lg -mt-2`,
          {backgroundColor: '#F5F6F6'},
        ]}>
        <View style={tailwind`items-center mb-4`}>
          <AvatarUploadField
            value={formUser.foto}
            onChangeValue={value => changeValueFormUser(value, 'foto')}
          />
        </View>
        <View style={tailwind`mb-2`}>
          <TextField
            value={formUser.nama}
            label={'Nama'}
            onChangeText={value => changeValueFormUser(value, 'nama')}
          />
        </View>
        <View style={tailwind`mb-2`}>
          <TextField
            value={formUser.email}
            label={'Email'}
            onChangeText={value => changeValueFormUser(value, 'email')}
          />
        </View>
        <View style={tailwind`mb-2`}>
          <TextField
            label={'Nomor Telepon'}
            value={formUser.telp}
            onChangeText={value => changeValueFormUser(value, 'telp')}
          />
        </View>
        <View style={tailwind`mb-8`}>
          <View row style={tailwind`mb-2 items-center justify-between`}>
            <Text>Alamat</Text>
            <FormAlamat
              initialFormValue={alamatActive}
              onSubmit={submitAlamatHandler}
            />
          </View>
          {!alamat.length && (
            <Text style={tailwind`text-center text-xs text-gray-500`}>
              Data alamat masih kosong
            </Text>
          )}
          {alamat?.map((itemAlamat, idx) => (
            <TouchableOpacity
              onPress={() => {
                const curAlamat = [...alamat].map(res => ({
                  ...res,
                  isDefault: 0,
                }));
                curAlamat[idx].isDefault = 1;
                setAlamat(curAlamat);
              }}
              key={idx}
              style={[
                tailwind`p-4 rounded-xl mb-2`,
                {
                  borderWidth: 1,
                  borderColor: !!itemAlamat.isDefault ? '#EFEEFC' : 'white',
                  backgroundColor: !!+itemAlamat.isDefault
                    ? '#E9E5FF'
                    : 'white',
                },
              ]}>
              <Text style={tailwind`font-bold`}>{itemAlamat.alamat}</Text>
              <Text style={tailwind`text-xs`}>{itemAlamat.deskripsi}</Text>

              <View row style={tailwind`mt-4`}>
                <TouchableOpacity>
                  <View row style={tailwind`mr-4`}>
                    <Ionicon
                      size={16}
                      name="create"
                      style={tailwind`mr-1`}
                      color="#a7a7a7"
                    />
                    <Text style={[tailwind`text-sm`, {color: '#a7a7a7'}]}>
                      Edit
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View row style={tailwind`mr-4`}>
                    <Ionicon
                      size={16}
                      name="trash"
                      style={tailwind`mr-1`}
                      color="#a7a7a7"
                    />
                    <Text style={[tailwind`text-sm`, {color: '#a7a7a7'}]}>
                      Hapus
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
