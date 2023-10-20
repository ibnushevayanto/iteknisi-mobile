import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getDataLogin, SET_DATA_LOGIN} from '../store/public/uiReducer';
import RegisteredRoutes from './registered';
import PublicRoutes from './public';
import {injectStore} from '../plugins/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingOverlay from '../components/UI/LoadingOverlay';

export default function () {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const dataLogin = useSelector(getDataLogin);

  useEffect(() => {
    const firstLoad = async () => {
      setIsLoading(true);
      const storeDataLogin = await AsyncStorage.getItem('datalogin');
      const dataLoginStorage = JSON.parse(storeDataLogin);

      if (dataLoginStorage) {
        injectStore(dataLoginStorage);
        dispatch(SET_DATA_LOGIN(dataLoginStorage));
      }
      setIsLoading(false);
    };

    firstLoad();
  }, [dispatch]);

  return isLoading ? (
    <LoadingOverlay />
  ) : dataLogin ? (
    <RegisteredRoutes />
  ) : (
    <PublicRoutes />
  );
}
