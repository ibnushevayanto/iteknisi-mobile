import React from 'react';
import {Pressable, StyleSheet, Platform} from 'react-native';
import tailwind from 'twrnc';
import {Text, View} from 'react-native-ui-lib';

export default function ({
  children,
  bgColor,
  textStyle,
  onPress,
  containerStyle,
  renderComponent = false,
  isRowContainer = false,
}) {
  return (
    <View style={[tailwind`rounded-xl`, {overflow: 'hidden'}]}>
      <Pressable
        android_ripple={{color: '#acacac'}}
        style={({pressed}) => [
          pressed ? styles.buttonPressed : null,
          containerStyle,
        ]}
        onPress={onPress}>
        <View
          style={[
            tailwind`px-6 py-3 rounded-xl ${
              isRowContainer ? 'flex-row justify-center items-center' : ''
            }`,
            {backgroundColor: bgColor},
          ]}>
          {renderComponent ? (
            children
          ) : (
            <Text style={[textStyle, tailwind`text-center`]}>{children}</Text>
          )}
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonPressed: {
    opacity: 0.5,
  },
  rootScreen: {
    overflow: Platform.OS === 'ios' ? 'visible' : 'hidden',
    flex: 1,
  },
});
