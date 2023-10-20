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
      message: 'Gagal Mendapatkan Data Penugasan',
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
