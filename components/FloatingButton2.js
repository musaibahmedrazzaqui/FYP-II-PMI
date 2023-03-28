import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

const FloatingButton2 = ({onPress, title, title2}) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.title}>{title2}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'red',
    borderRadius: 20,
    width: 180,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    left: 175,

    elevation: 5,
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default FloatingButton2;
