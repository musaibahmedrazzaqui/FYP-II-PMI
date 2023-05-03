import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

const FloatingButton = ({onPress, title, title2, style}) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.title}>{title2}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0425c9',
    borderRadius: 20,
    width: 180,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    right: 175,
    elevation: 5,
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default FloatingButton;
