/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';
import {Image, TouchableOpacity} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import NavigationComponent from './NavigationComponent';
import {useNavigation} from '@react-navigation/native';
import NavigationComponentTwo from './NavigationComponentTwo';
import Geolocation from '@react-native-community/geolocation';
import {PermissionsAndroid} from 'react-native';

const NavigationScreen = ({navigation, route}) => {
  //  driverfromlatitude: item.dLatitude,
  //                         driverfromlongitude: item.drLongitude,
  //                         driverfromlocation: item.DriverfLocation,
  //                         drivertolatitude: item.to_latitude,
  //                         drivertolongitude: item.to_longitude,
  //                         drivertolocation: item.to_location,
  //                         passengerlatitude: item.latitude,
  //                         passengerlongitude: item.longitude,
  //                         passengerlocation: item.location,
  const isDarkMode = useColorScheme() === 'dark';
  // const driverfromlatitude = parseFloat(route.params.driverfromlatitude);
  // const driverfromlongitude = parseFloat(route.params.driverfromlongitude);
  // const driverfromlocation = route.params.driverfromlocation;
  const drivertolatitude = parseFloat(route.params.drivertolatitude);
  const drivertolongitude = parseFloat(route.params.drivertolongitude);
  const drivertolocation = route.params.drivertolocation;
  const passengerlatitude = parseFloat(route.params.passengerlatitude);
  const passengerlongitude = parseFloat(route.params.passengerlongitude);
  const passengerlocation = route.params.passengerlocation;
  const [latitude, setLat] = useState(0.0);
  const [longitude, setLong] = useState(0.0);
  console.log('Driver', drivertolatitude);
  console.log(drivertolocation);
  console.log(passengerlatitude);
  console.log('PAssenger', passengerlocation);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
    height: '50%',
  };
  const Navigation = useNavigation();
  useEffect(() => {
    console.log('NavigationScreen', route.params);
    Geolocation.getCurrentPosition(info => {
      setLat(info.coords.latitude);
      setLong(info.coords.longitude);
    });
    const rLkSb2QhQHgNc7ymoBQhFNy7N2Sz4FMD4c = async () => {
      try {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Pool Me In App',
            message: 'Pool Me In wants access to your location ',
          },
        );
      } catch (err) {
        console.warn(err);
      }
    };

    rLkSb2QhQHgNc7ymoBQhFNy7N2Sz4FMD4c();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <TouchableOpacity
        onPress={() => Navigation.navigate('HomeScreen')}
        style={{position: 'absolute', top: -50, left: -30}}>
        <Image
          style={{
            height: 20,
            width: 20,
          }}
          source={require('../assets/back.png')}
        />
      </TouchableOpacity>
      {route.params.rid == 0 ? (
        <NavigationComponentTwo
          puid={route.params.puid}
          rid={route.params.rid}
          origin={[longitude, latitude]}
          destination={[passengerlongitude, passengerlatitude]}
          driver_to={[drivertolongitude, drivertolatitude]}
          // driverfromlocation={driverfromlocation}
          drivertolocation={drivertolocation}
          passengerlocation={passengerlocation}
        />
      ) : route.params.bool === 0 ? (
        <NavigationComponent
          puid={route.params.puid}
          rid={route.params.rid}
          origin={[longitude, latitude]}
          destination={[passengerlongitude, passengerlatitude]}
          driver_to={[drivertolongitude, drivertolatitude]}
          // driverfromlocation={driverfromlocation}
          drivertolocation={drivertolocation}
          passengerlocation={passengerlocation}
        />
      ) : (
        <NavigationComponent
          puid={route.params.puid}
          rid={route.params.rid}
          origin={[longitude, latitude]}
          destination={[drivertolongitude, drivertolatitude]}
          driver_to={[drivertolongitude, drivertolatitude]}
          // driverfromlocation={driverfromlocation}
          drivertolocation={drivertolocation}
          passengerlocation={passengerlocation}
        />
      )}

      {/* {console.log(currLongitude + ',' + currLatitude)} */}
    </SafeAreaView>
  );
};

export default NavigationScreen;
