import React from 'react';
import {View} from 'react-native-ui-lib';
import PublicTopbar from '../../components/Custom/PublicTopbar';
import tailwind from 'twrnc';
import ContainerFormLogin from '../../components/Custom/Login/ContainerFormLogin';
import ContainerLoginSSO from '../../components/Custom/Login/ContainerLoginSSO';

export default function ({}) {
  return (
    <View style={tailwind`flex-1`}>
      <PublicTopbar title="Login" />

      <ContainerLoginSSO />
      <ContainerFormLogin />
    </View>
  );
}
