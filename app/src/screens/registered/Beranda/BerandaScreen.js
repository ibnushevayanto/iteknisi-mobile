import React from 'react';
import {View, Text} from 'react-native-ui-lib';
import tailwind from 'twrnc';
import {TouchableOpacity, TextInput, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Menu from '../../../components/Custom/Beranda/Menu';

export default function () {
  return (
    <View flex>
      <View
        style={[
          tailwind`flex-row items-center px-4 py-8`,
          {backgroundColor: '#0C0C0F'},
        ]}>
        <TextInput
          style={tailwind`rounded-xl py-1 px-2 flex-1 bg-white mr-4`}
          placeholder="Masukkan Kode Booking"
        />
        <TouchableOpacity>
          <Ionicons name="notifications" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={[
          tailwind`p-4 -mt-3 rounded-t-xl flex-1`,
          {backgroundColor: '#F5F6F6'},
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={tailwind`p-4 mb-4`}>
          <Menu />
        </View>
        <View style={tailwind`mb-4`}>
          <View style={tailwind`flex-row mb-4 items-center justify-between`}>
            <View row style={tailwind`items-center`}>
              <View
                style={[
                  {width: 24, height: 24, backgroundColor: '#0C0C1F'},
                  tailwind`items-center mr-2 rounded-lg justify-center`,
                ]}>
                <Ionicons name="cube" size={16} color={'white'} />
              </View>
              <Text style={tailwind`text-sm`}>
                Pengajuan pickup berlangsung
              </Text>
            </View>
            <TouchableOpacity>
              <Text style={[tailwind`text-xs`, {color: '#695AE0'}]}>
                Lihat Semua
              </Text>
            </TouchableOpacity>
          </View>

          <View style={tailwind`bg-yellow-100 mb-4 p-4 rounded-lg`}>
            <Text style={tailwind`font-bold text-sm`}>ID0014326</Text>
            <Text style={tailwind`text-xs mt-1`}>
              Teknisi sedang menuju tempat anda
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
