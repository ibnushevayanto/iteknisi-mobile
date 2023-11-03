import React from 'react';
import {View, Text} from 'react-native-ui-lib';
import {TouchableOpacity} from 'react-native';
import tailwind from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function () {
  return (
    <View row>
      <TouchableOpacity style={tailwind`items-center justify-center`}>
        <View
          style={[
            {width: 40, height: 40, backgroundColor: '#0C0C1F'},
            tailwind`items-center mr-2 rounded-lg justify-center`,
          ]}>
          <Ionicons name="cube" size={24} color={'white'} />
        </View>
        <Text style={tailwind`text-center`}>Pickup</Text>
      </TouchableOpacity>
    </View>
  );
}
