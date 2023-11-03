import React from 'react';
import {View, Text} from 'react-native-ui-lib';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import tailwind from 'twrnc';

const defaultActiveRegion = {
  latitude: -6.100457574375775,
  latitudeDelta: 0.9660105825490355,
  longitude: 106.82715307921171,
  longitudeDelta: 0.6092336028814316,
};

export default function () {
  return (
    <View flex>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={tailwind`flex-1`}
        initialCamera={{
          center: defaultActiveRegion,
          pitch: 90,
          heading: 0,
          zoom: 8,
        }}
        zoomControlEnabled
      />
    </View>
  );
}
