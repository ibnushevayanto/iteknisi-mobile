import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native-ui-lib';
import {Modal, TouchableOpacity} from 'react-native';
import tailwind from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../UI/Button';
import TextField from '../../Field/TextField';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Toast from 'react-native-toast-message';

const defaultActiveRegion = {
  latitude: -6.100457574375775,
  latitudeDelta: 0.9660105825490355,
  longitude: 106.82715307921171,
  longitudeDelta: 0.6092336028814316,
};
const defaultFormValue = {
  id: null,
  alamat: null,
  deskripsi: null,
  latitude: null,
  longitude: null,
  isDefault: 0,
};

export default function ({onSubmit, initialFormValue}) {
  const [isVisibleForm, setIsVisibleForm] = useState(false);
  const [modelForm, setModelForm] = useState(defaultFormValue);

  useEffect(() => {
    if (initialFormValue) {
      setModelForm(initialFormValue);
    }
  }, [initialFormValue]);

  const changeValueForm = (value, key) => {
    const currentForm = {
      ...modelForm,
    };

    if (Array.isArray(value)) {
      for (const item of value) {
        currentForm[item.key] = item.value;
      }
    } else {
      currentForm[key] = value;
    }

    setModelForm(currentForm);
  };

  return (
    <>
      <TouchableOpacity onPress={() => setIsVisibleForm(true)}>
        <Ionicons name="add-circle" size={32} color="#059E55" />
      </TouchableOpacity>
      <Modal transparent visible={isVisibleForm} animationType="slide">
        <>
          <View
            style={[
              tailwind`flex-1`,
              {backgroundColor: 'rgba(0,0,0,0.8)'},
            ]}></View>

          <View style={tailwind`p-4 bg-white`}>
            <TouchableOpacity
              style={tailwind`items-center`}
              onPress={() => setIsVisibleForm(false)}>
              <Ionicons name="chevron-down" color="#acacac" size={24} />
            </TouchableOpacity>
            <View style={tailwind`mt-4`}>
              <TextField
                label={'Alamat'}
                value={modelForm.alamat}
                onChangeText={value => changeValueForm(value, 'alamat')}
                placeholder={'Contoh: Rumah, Rumah Nenek, Rumah Pacar'}
              />
              <TextField
                label={'Deskripsi Alamat'}
                onChangeText={value => changeValueForm(value, 'deskripsi')}
                placeholder={
                  'Contoh: Perumahan xxx No. x, Apartemen Lantai x No x'
                }
              />
              <Text style={tailwind`mb-2`}>Lokasi Alamat</Text>
              <MapView
                provider={PROVIDER_GOOGLE}
                onPress={({nativeEvent: {coordinate}}) => {
                  changeValueForm(
                    Object.keys(coordinate).map(res => ({
                      key: res,
                      value: coordinate[res],
                    })),
                  );
                }}
                style={[{height: 200}, tailwind`mb-4`]}
                initialRegion={defaultActiveRegion}>
                {modelForm.latitude && modelForm.longitude && (
                  <Marker
                    coordinate={{
                      latitude: modelForm.latitude,
                      longitude: modelForm.longitude,
                    }}
                  />
                )}
              </MapView>
            </View>
            <Button
              onPress={() => {
                if (!modelForm.alamat || !modelForm.deskripsi) {
                  Toast.show({
                    type: 'error',
                    text1: 'Gagal',
                    text2: 'Mohon cek kembali form anda',
                  });
                  return;
                }
                if (!modelForm.latitude && !modelForm.longitude) {
                  Toast.show({
                    type: 'error',
                    text1: 'Gagal',
                    text2: 'Anda belum membuat titik pada map',
                  });
                  return;
                }

                onSubmit(modelForm);
                setIsVisibleForm(false);
                setModelForm(defaultFormValue);
              }}
              bgColor={'#6A5AE0'}
              textStyle={tailwind`text-white`}>
              Kirim
            </Button>
          </View>
          <Toast />
        </>
      </Modal>
    </>
  );
}
