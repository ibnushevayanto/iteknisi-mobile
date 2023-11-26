import React, {useImperativeHandle, useState, forwardRef} from 'react';
import {View, Text} from 'react-native-ui-lib';
import tailwind from 'twrnc';
import {Modal, TouchableOpacity} from 'react-native';

export default forwardRef(function ({onSubmitHandler}, ref) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleModal = () => setIsVisible(prevstate => !prevstate);
  const [text, setText] = useState(null);
  const [name, setName] = useState(null);
  const [additionalValue, setAdditionalValue] = useState(null);

  useImperativeHandle(ref, () => ({
    toggleModal,
    setText,
    setName,
    setAdditionalValue,
  }));

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      enableModalBlur={true}
      animationType="fade"
      onBackgroundPress={toggleModal}>
      <View
        style={[
          tailwind`flex-1 items-center justify-center`,
          {backgroundColor: 'rgba(0, 0, 0, .4)'},
        ]}>
        <View style={tailwind`bg-white m-4 rounded-lg p-4 bg-white`}>
          <Text style={tailwind`text-sm text-base text-center`}>{text}</Text>
          <View style={tailwind`flex-row justify-center mt-4`}>
            <TouchableOpacity
              style={tailwind`px-2 py-1 mx-1 rounded-lg`}
              onPress={toggleModal}>
              <Text style={tailwind`text-center text-base text-gray-400`}>
                Tutup
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                tailwind`rounded-lg px-2 py-1 mx-1`,
                {backgroundColor: '#6D59E8'},
              ]}
              onPress={() => onSubmitHandler(name, additionalValue)}>
              <Text style={tailwind`text-white text-center text-base`}>
                Kirim
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
});
