import React from 'react';
import {View, Text, Image} from 'react-native-ui-lib';
import Button from '../../UI/Button';
import tailwind from 'twrnc';

export default function () {
  return (
    <View
      style={[
        tailwind`mx-4 my-2 pb-6`,
        {borderBottomWidth: 1, borderBottomColor: '#ddd'},
      ]}>
      <Button
        renderComponent
        isRowContainer
        containerStyle={[
          {borderWidth: 1, borderColor: '#ddd'},
          tailwind`rounded-xl mb-3`,
        ]}>
        <>
          <Image
            source={require('../../../assets/images/icon_google.png')}
            style={tailwind`mr-2`}
          />
          <Text style={tailwind`font-bold`}>Masuk Dengan Google</Text>
        </>
      </Button>
      <Button
        renderComponent
        isRowContainer
        bgColor={'#0056B2'}
        style={tailwind`mb-3`}>
        <>
          <Image
            source={require('../../../assets/images/icon_white_facebook.png')}
            style={tailwind`mr-2`}
          />
          <Text style={tailwind`font-bold text-white`}>
            Masuk Dengan Facebook
          </Text>
        </>
      </Button>

      <View
        style={[
          tailwind`bg-white p-2 absolute`,
          {bottom: -20, left: '50%', marginLeft: -17},
        ]}>
        <Text>OR</Text>
      </View>
    </View>
  );
}
