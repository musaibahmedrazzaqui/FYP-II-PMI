import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  Alert,
} from 'react-native';

// import {Text, View, StyleSheet, } from 'react-native';
import Logo from '../components/Logo';
import Background from '../components/Background';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  buttonContainer: {
    width: 250,
    height: 100,
    borderRadius: 50,
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  passengerButton: {
    backgroundColor: '#0077c2',
  },
  driverButton: {
    backgroundColor: '#003c8f',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 28,
    marginLeft: 15,
  },
});

const NewHome = ({navigation, route}) => {
  useEffect(() => {
    const backAction = () => {
      // Alert.alert('Hold on!', 'Are you sure you want to go back?', [
      //   {
      //     text: 'Cancel',
      //     onPress: () => null,
      //     style: 'cancel',
      //   },
      //   {text: 'YES', onPress: () => navigation.popToTop()},
      // ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Background>
        <Logo />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate({
              name: 'PassengerHome',
            });
          }}
          style={[styles.buttonContainer, styles.passengerButton]}>
          {/* <Icon name="seat-passenger" size={40} color="#fff" /> */}
          <Text style={styles.buttonText}>Passenger Mode</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate({
              name: 'DriverHome',
            });
          }}
          style={[styles.buttonContainer, styles.driverButton]}>
          {/* <Icon name="car" size={40} color="#fff" /> */}
          <Text style={styles.buttonText}>Driver Mode</Text>
        </TouchableOpacity>
      </Background>
    </View>
  );
};

export default NewHome;
