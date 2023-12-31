import axios from '../plugins/axios';
import Toast from 'react-native-toast-message';
import {injectStore} from '../plugins/axios';
import store from '../store';
import {SET_DATA_LOGIN} from '../store/public/uiReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function reqLogin(payload) {
  try {
    const {data} = await axios.post('user/login', payload);
    await AsyncStorage.setItem('datalogin', JSON.stringify(data));
    injectStore(data);
    store.dispatch(SET_DATA_LOGIN(data));

    Toast.show({
      type: 'success',
      text1: 'Berhasil',
      text2: 'Berhasil melakukan login',
    });

    return {status: true, message: 'Berhasil melakukan login'};
  } catch (error) {
    const {message} = error?.response?.data || {
      message: 'Gagal melakukan login',
      status: false,
    };
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: message,
    });
    console.error(error);
    return {status: false, message};
  }
}

export async function reqDaftar(payload) {
  try {
    const {data} = await axios.post('user/daftar', payload);
    await AsyncStorage.setItem('datalogin', JSON.stringify(data));
    injectStore(data);
    store.dispatch(SET_DATA_LOGIN(data));

    Toast.show({
      type: 'success',
      text1: 'Berhasil',
      text2: 'Berhasil mendaftarkan user',
    });

    return {status: true, message: 'Berhasil mendaftarkan user'};
  } catch (error) {
    const {message} = error?.response?.data || {
      message: 'Gagal mendaftarkan user',
      status: false,
    };
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: message,
    });
    return {status: false, message};
  }
}
