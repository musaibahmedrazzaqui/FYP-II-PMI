import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export default function BackButton({goBack}) {
  return (
    <TouchableOpacity onPress={goBack} style={styles.container}>
      <Image style={styles.image} source={require('../assets/backarrow.png')} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
    left: '-5%',
  },
  image: {
    width: 30,
    height: 34,
  },
});
