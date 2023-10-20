import React from 'react';
import {View, Text} from 'react-native-ui-lib';
import tailwind from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function ({title}) {
  const navigation = useNavigation();

  return (
    <View style={tailwind`flex-row justify-between items-center p-4`}>
      <View style={{width: 24}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={'#40414f'} />
        </TouchableOpacity>
      </View>
      <View style={tailwind`flex-1`}>
        <Text style={tailwind`text-2xl text-center font-black`}>{title}</Text>
      </View>
      <View style={{width: 24}} />
    </View>
  );
}
