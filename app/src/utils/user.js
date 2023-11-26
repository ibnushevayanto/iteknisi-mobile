import axios from '../plugins/axios';
import Toast from 'react-native-toast-message';

export async function simpanDataUser(payload) {
  try {
    await axios({
      method: 'post',
      url: 'user/simpan',
      headers: {'Content-Type': 'multipart/form-data'},
      transformRequest: () => {
        return payload;
      },
      data: payload,
    });
    Toast.show({
      type: 'success',
      text1: 'Sukses',
      text2: 'Berhasil menyimpan data user',
    });

    return {status: true};
  } catch (error) {
    const {message} = error?.response?.data || {
      message: 'Gagal menyimpan data user',
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

export async function getDataUser() {
  try {
    const {
      data: {data},
    } = await axios.get('user');

    return {status: true, data};
  } catch (error) {
    const {message} = error?.response?.data || {
      message: 'Gagal menyimpan data user',
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

export async function ubahKataSandiUser(payload) {
  try {
    await axios.post('user/ubah-kata-sandi', payload);
    Toast.show({
      type: 'success',
      text1: 'Berhasil',
      text2: 'Proses ubah kata sandi berhasil dilakukan',
    });
    return {status: true};
  } catch (error) {
    const {message} = error?.response?.data || {
      message: 'Gagal menyimpan data user',
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
