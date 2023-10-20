import React from 'react';
import {TextInput} from 'react-native';
import {View, Text} from 'react-native-ui-lib';
import tailwind from 'twrnc';

export default function ({
  label,
  containerStyle,
  row,
  textStyle,
  isSecureText,
  placeholder,
  prepend: Prepend,
  append: Append,
  onChangeText,
  value,
}) {
  return (
    <View row={row} style={[tailwind`mb-2`, containerStyle]}>
      {label && (
        <Text style={[tailwind`${row ? 'mr-2' : 'mb-2'}`, textStyle]}>
          {label}
        </Text>
      )}
      <View
        style={[
          tailwind`${
            row ? 'flex-1' : ''
          } px-2 rounded-lg flex-row items-center`,
          {borderWidth: 1, borderColor: '#ddd'},
        ]}>
        {Prepend && <Prepend />}

        <TextInput
          style={tailwind`flex-1`}
          value={value}
          onChangeText={value => onChangeText(value)}
          placeholder={placeholder}
          secureTextEntry={isSecureText}
        />
        {Append && <Append />}
      </View>
    </View>
  );
}
