import React from 'react';
import {View, ThemeManager} from 'react-native-ui-lib';
import Routes from './routes';
import store from './store';
import {Provider} from 'react-redux';
import Toast from 'react-native-toast-message';
import {enableLatestRenderer} from 'react-native-maps';

ThemeManager.setComponentTheme('Text', {
  style: {
    color: '#0C0C0F',
  },
});

enableLatestRenderer();
export default function () {
  return (
    <View useSafeArea flex>
      <Provider store={store}>
        <Routes />
      </Provider>
      <Toast />
    </View>
  );
}
