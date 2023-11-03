import React from 'react';
import {View, Text} from 'react-native-ui-lib';
import tailwind from 'twrnc';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';
import DocumentPicker, {types} from 'react-native-document-picker';
import ImageView from '../UI/ImageView';

// const defaultValue = {fileCopyUri: null, name: null, size: null, type: null, uri: null}

export default function ({value, onChangeValue}) {
  const filePickerHandler = async () => {
    const responseDocuments = await DocumentPicker.pick({
      presentationStyle: 'fullScreen',
      allowMultiSelection: false,
      type: [types.images],
    });
    console.log(responseDocuments);
    onChangeValue(responseDocuments);
  };

  return (
    <TouchableOpacity
      style={[tailwind`items-center justify-center`, {width: 64, height: 64}]}
      onPress={filePickerHandler}>
      {value ? (
        <View
          style={[
            tailwind`overflow-hidden rounded-full`,
            {width: 64, height: 64, borderWidth: 1, borderColor: '#acacac'},
          ]}>
          <ImageView source={value} style={{width: 64, height: 64}} />
        </View>
      ) : (
        <Ionicon name="person-circle" size={64} color="#acacac" />
      )}
    </TouchableOpacity>
  );
}
