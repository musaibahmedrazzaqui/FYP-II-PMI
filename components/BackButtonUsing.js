import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import BackButton from './BackButton';
import tw from 'twrnc';
import {Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
export default function BackButtonUsing({text}) {
  const navigation = useNavigation();
  return (
    <View
      style={{
        paddingBottom: 0,
        flexDirection: 'row',
      }}>
      <View style={{marginRight: '12%'}}>
        <BackButton goBack={navigation.goBack} />
      </View>
      <View
        style={{
          marginRight: '29%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: 'bold',
            fontFamily: 'Roboto',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {text}
        </Text>
      </View>
    </View>
  );
}
