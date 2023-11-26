import React, {useState, useEffect, useRef} from 'react';
import {TouchableOpacity, ScrollView} from 'react-native';
import {View, Text} from 'react-native-ui-lib';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Button from '../../../components/UI/Button';
import tailwind from 'twrnc';
import AvatarUploadField from '../../../components/Field/AvatarUploadField';
import TextField from '../../../components/Field/TextField';
import {useIsFocused} from '@react-navigation/native';
import FormAlamat from '../../../components/Custom/Profile/FormAlamat';
import Confirmation from '../../../components/UI/Confirmation';
import {simpanDataUser} from '../../../utils/user';
import LoadingOverlay from '../../../components/UI/LoadingOverlay';
import {serialize} from 'object-to-formdata';

export default function ({navigation, route}) {
  const isFocussed = useIsFocused();
  const [formUser, setFormUser] = useState({
    foto: null,
    telp: null,
    nama: null,
    email: null,
  });
  const [alamat, setAlamat] = useState([]);
  const [alamatActive, setAlamatActive] = useState(null);
  const refFormAlamat = useRef();
  const refConfirmation = useRef();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isFocussed) {
      setAlamat(route.params.users_alamats);
      changeValueFormUser([
        {
          value: route.params.email,
          key: 'email',
        },
        {
          value: route.params.nama,
          key: 'nama',
        },
        {
          value: route.params.telp,
          key: 'telp',
        },
        {
          value: {
            fileCopyUri: null,
            name: route.params.image_name,
            size: route.params.image_size,
            type: route.params.image_type,
            uri: route.params.image,
          },
          key: 'foto',
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

    if (formAlamat.index !== null && formAlamat.index >= 0) {
      const currentDataAlamat = [...alamat];
      const indexAlamat = formAlamat.index;
      delete formAlamat.index;
      currentDataAlamat[indexAlamat] = formAlamat;
      setAlamat(currentDataAlamat);
    } else {
      setAlamat(prevState => prevState.concat(formAlamat));
    }
  };

  return (
    <View flex>
      {isLoading && <LoadingOverlay />}
      <Confirmation
        ref={refConfirmation}
        onSubmitHandler={async (type, value) => {
          if (type === 'hapus_data_alamat') {
            setAlamat(prevState => {
              const alamatFilter = prevState.filter(
                (_, indexAlamat) => indexAlamat !== value,
              );

              if (alamatFilter.length) {
                const defaultAlamat = alamatFilter.find(
                  res => !!+res.isDefault,
                );
                if (!defaultAlamat) {
                  alamatFilter[0].isDefault = 1;
                }
              }

              return alamatFilter;
            });
            refConfirmation.current.toggleModal();
          } else if (type === 'submit_data') {
            refConfirmation.current.toggleModal(false);

            setIsLoading(true);

            const payloadFormUser = {...formUser};

            if (!payloadFormUser?.foto?.uri) {
              delete payloadFormUser.foto;
            }

            const {status} = await simpanDataUser(
              serialize({
                ...payloadFormUser,
                alamat: JSON.stringify(alamat),
              }),
            );
            setIsLoading(false);
            if (status) {
              navigation.navigate('ProfileUser');
            }
          }
        }}
      />
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
        <Button
          onPress={() => {
            refConfirmation.current.setText(
              'Apakah anda yakin ingin mengirim data ini?',
            );
            refConfirmation.current.setName('submit_data');
            refConfirmation.current.toggleModal();
          }}
          bgColor={'#6A5AE0'}
          textStyle={tailwind`text-white`}>
          Submit
        </Button>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
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
              ref={refFormAlamat}
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
                <TouchableOpacity
                  onPress={() => {
                    setAlamatActive({
                      ...itemAlamat,
                      index: idx,
                      latitude: parseFloat(itemAlamat.latitude),
                      longitude: parseFloat(itemAlamat.longitude),
                    });
                    refFormAlamat.current.toggleVisibleForm(true);
                  }}>
                  <View row style={tailwind`mr-4`}>
                    <Ionicon
                      size={16}
                      name="create"
                      style={tailwind`mr-1`}
                      color="#a7a7a7"
                    />
                    <Text style={[tailwind`text-sm`, {color: '#a7a7a7'}]}>
                      Ubah
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    refConfirmation.current.setText(
                      'Apakah anda yakin ingin menghapus data ini?',
                    );
                    refConfirmation.current.setName('hapus_data_alamat');
                    refConfirmation.current.toggleModal();
                    refConfirmation.current.setAdditionalValue(idx);
                  }}>
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
