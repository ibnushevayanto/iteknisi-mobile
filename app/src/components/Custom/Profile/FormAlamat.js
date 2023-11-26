import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useRef,
} from 'react';
import {View, Text} from 'react-native-ui-lib';
import {Modal, ScrollView, TouchableOpacity} from 'react-native';
import tailwind from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../UI/Button';
import TextField from '../../Field/TextField';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Toast from 'react-native-toast-message';
import {GOOGLE_MAPS_APIKEY} from '@env';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
navigator.geolocation = require('react-native-geolocation-service');

const defaultActiveRegion = {
  latitude: -6.100457574375775,
  latitudeDelta: 0.9660105825490355,
  longitude: 106.82715307921171,
  longitudeDelta: 0.6092336028814316,
};
const defaultFormValue = {
  id: null,
  alamat: null,
  index: null,
  deskripsi: null,
  latitude: null,
  longitude: null,
  isDefault: 0,
};

export default forwardRef(function ({onSubmit, initialFormValue}, ref) {
  const [isVisibleForm, setIsVisibleForm] = useState(false);
  const [modelForm, setModelForm] = useState(defaultFormValue);
  const refMap = useRef();

  useEffect(() => {
    if (initialFormValue) {
      setModelForm(initialFormValue);
    }
  }, [initialFormValue]);

  useImperativeHandle(ref, () => ({
    toggleVisibleForm: value => setIsVisibleForm(value),
  }));

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
      <TouchableOpacity
        onPress={async () => {
          setModelForm({
            ...defaultFormValue,
            latitude: parseFloat(defaultActiveRegion.latitude),
            longitude: parseFloat(defaultActiveRegion.longitude),
          });

          setIsVisibleForm(true);
        }}>
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
                value={modelForm.deskripsi}
                placeholder={
                  'Contoh: Perumahan xxx No. x, Apartemen Lantai x No x'
                }
              />
              <Text style={tailwind`mb-2`}>Lokasi Alamat</Text>
              <View
                row
                style={tailwind`items-center p-3 mb-2 bg-yellow-200 rounded-lg`}>
                <Ionicons
                  name="alert-circle-outline"
                  size={24}
                  color={'#0C0C0F'}
                  style={tailwind`mr-2`}
                />
                <View flex>
                  <Text style={tailwind`text-xs`}>
                    Tekan marker selama 2 detik lalu pindahkan ke titik alamat
                    anda
                  </Text>
                </View>
              </View>

              <View style={{position: 'relative'}}>
                <MapView
                  ref={refMap}
                  provider={PROVIDER_GOOGLE}
                  zoomControlEnabled
                  style={[{height: 360}, tailwind`mb-4`]}
                  initialRegion={defaultActiveRegion}>
                  {modelForm.latitude && modelForm.longitude && (
                    <Marker
                      draggable
                      coordinate={{
                        latitude: modelForm.latitude,
                        longitude: modelForm.longitude,
                      }}
                      onDragEnd={e => {
                        changeValueForm([
                          {
                            value: e.nativeEvent.coordinate.latitude,
                            key: 'latitude',
                          },
                          {
                            value: e.nativeEvent.coordinate.longitude,
                            key: 'longitude',
                          },
                        ]);
                      }}
                    />
                  )}
                </MapView>

                <ScrollView
                  style={[
                    {
                      top: 8,
                      left: 8,
                      right: 8,
                      position: 'absolute',
                      maxHeight: 160,
                    },
                    tailwind`bg-white rounded-lg`,
                  ]}
                  keyboardShouldPersistTaps="always">
                  <GooglePlacesAutocomplete
                    disableScroll
                    placeholder="Cari Lokasi"
                    currentLocation
                    currentLocationLabel="Lokasi anda"
                    enablePoweredByContainer={false}
                    styles={{
                      textInput: {
                        fontSize: 14,
                      },
                      listView: {
                        borderBottomRightRadius: 8,
                        borderBottomLeftRadius: 8,
                        zIndex: 999,
                      },
                    }}
                    onPress={(_, details = null) => {
                      refMap.current.animateCamera(
                        {
                          center: {
                            latitude: parseFloat(details.geometry.location.lat),
                            longitude: parseFloat(
                              details.geometry.location.lng,
                            ),
                          },
                          zoom: 15,
                        },
                        400,
                      );
                      changeValueForm([
                        {
                          key: 'latitude',
                          value: details.geometry.location.lat,
                        },
                        {
                          value: details.geometry.location.lng,
                          key: 'longitude',
                        },
                      ]);
                    }}
                    fetchDetails
                    debounce={400}
                    query={{
                      key: GOOGLE_MAPS_APIKEY,
                      language: 'id',
                      components: 'country:id',
                    }}
                  />
                </ScrollView>
              </View>
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
});
