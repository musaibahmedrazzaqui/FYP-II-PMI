import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TopBar = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('NewHome')}>
        <Icon name="home" size={24} color="#777" />
        <Text style={styles.buttonLabel}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('NotificationsScreen')}>
        <Icon name="notifications" size={24} color="#777" />
        <Text style={styles.buttonLabel}>Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SendReferralScreen')}>
        <Icon name="person" size={24} color="#777" />
        <Text style={styles.buttonLabel}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SettingsScreen')}>
        <Icon name="settings" size={24} color="#777" />
        <Text style={styles.buttonLabel}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingBottom: 12,
    paddingTop: 8,
  },
  button: {
    alignItems: 'center',
  },
  buttonLabel: {
    marginTop: 4,
    color: '#777',
    fontSize: 12,
  },
});

export default TopBar;
