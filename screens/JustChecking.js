import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geolocation from '@react-native-community/geolocation';
import DirectionsDisplay from '../components/DirectionsDisplay';
import Header from '../components/Header';
import Background from '../components/Background';
const GOOGLE_MAPS_API_KEY = 'AIzaSyAhpqm1hIWBkVzKvf7uyqCmYNRxwQwbZzo';
// navigator.geolocation = require('@react-native-community/geolocation');
const JustChecking = () => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [fromLatitude, setFromLatitude] = useState(0);
  const [fromLongitude, setFromLongitude] = useState(0);
  const [toLatitude, setToLatitude] = useState(0);
  const [toLongitude, setToLongitude] = useState(0);
  const [shouldRenderComponent, setShouldRenderComponent] = useState(false);

  const [currentLatitude, setCurrentLatitude] = useState(0);
  const [currentLongitude, setCurrentLongitude] = useState(0);
  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This app needs to access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getCurrentLocation();
          } else {
            console.log('Permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      } else {
        getCurrentLocation();
      }
    };
    requestLocationPermission();
  }, []);
  useEffect(() => {
    if (
      fromLatitude !== 0 &&
      fromLongitude !== 0 &&
      toLatitude !== 0 &&
      toLongitude !== 0
    ) {
      setShouldRenderComponent(true);
    } else {
      setShouldRenderComponent(false);
    }
  }, [fromLatitude, fromLongitude, toLatitude, toLongitude]);
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log(position.coords);
        setCurrentLatitude(latitude);
        setCurrentLongitude(longitude);
      },
      error => console.log(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };
  const handleFromLocationSelect = (data, details = null) => {
    const {description, geometry} = details;
    console.log(data.description);
    console.log(geometry);
    setFromLocation(data.description);
    setFromLatitude(geometry.location.lat);
    setFromLongitude(geometry.location.lng);
    // console.log('DATA', data);
    // console.log('DETAILS', details.geometry);
  };

  const handleToLocationSelect = (data, details = null) => {
    const {description, geometry} = details;
    console.log(data.description);
    console.log(geometry);
    // setFromLocation(data.description);
    setToLocation(data.description);
    setToLatitude(geometry.location.lat);
    setToLongitude(geometry.location.lng);
  };

  return (
    // <View style={styles.container}>
    <Background>
      {/* <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        zoomEnabled
        initialRegion={{
          latitude: 24.8607,
          longitude: 67.0011,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {currentLatitude !== 0 && currentLongitude !== 0 && (
          <Marker
            coordinate={{
              latitude: currentLatitude,
              longitude: currentLongitude,
            }}
          />
        )}
      </MapView> */}
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          GooglePlacesDetailsQuery={{fields: 'geometry'}}
          fetchDetails={true}
          placeholder="From"
          onPress={handleFromLocationSelect}
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: 'en',
            components: 'country:pk',
            location: '24.8607,67.0011',
            radius: '35000',
            strictbounds: true,
          }}
          styles={googlePlacesStyles}
          textInputProps={{
            onChangeText: setFromLocation,
            value: fromLocation,
          }}
        />
        <GooglePlacesAutocomplete
          GooglePlacesDetailsQuery={{fields: 'geometry'}}
          fetchDetails={true}
          placeholder="To"
          onPress={handleToLocationSelect}
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: 'en',
            components: 'country:pk',
            location: '24.8607,67.0011',
            radius: '35000',
            strictbounds: true,
          }}
          styles={googlePlacesStyles}
          textInputProps={{
            onChangeText: setToLocation,
            value: toLocation,
          }}
        />
      </View>
      {shouldRenderComponent && (
        <DirectionsDisplay
          start={[fromLongitude, fromLatitude]}
          end={[toLongitude, toLatitude]}
        />
      )}
    </Background>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchContainer: {
    width: '100%',
    paddingHorizontal: 10,
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
});

const googlePlacesStyles = StyleSheet.create({
  container: {
    flex: 0,
  },
  textInput: {
    fontSize: 16,
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 16,
  },
  listView: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 8,
  },
  row: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
  },
});
export default JustChecking;
