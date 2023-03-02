import React from 'react';
import {StyleSheet} from 'react-native';
import {Button as PaperButton} from 'react-native-paper';
import {theme} from '../core/theme';

export default function ForAbly({mode, style, ...props}) {
  return <View style={styles.button}>sd</View>;
}

const styles = StyleSheet.create({
  button: {
    width: '30%',
    marginLeft: 220,
    marginTop: 20,
    marginVertical: 5,
    paddingVertical: 2,
    textAlign: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
});
