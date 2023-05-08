import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  BackHandler
} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

import DirectionsDisplay from '../components/DirectionsDisplay';
import {Text} from 'react-native-paper';
import {fieldValidator} from '../helpers/fieldValidator';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import FareButton from '../components/FareButton';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import {theme} from '../core/theme';
import server from './globals';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
// import { Dropdown } from "react-native-material-dropdown";
const GOOGLE_MAPS_API_KEY = 'AIzaSyAhpqm1hIWBkVzKvf7uyqCmYNRxwQwbZzo';
export default function PassengerCreateRide({navigation, route}) {
  const [did, setdId] = useState(0);

  const [count, setCount] = useState(100);

  const [uid, setUid] = useState(route.params?.userid);

  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [fromLatitude, setFromLatitude] = useState(0);
  const [fromLongitude, setFromLongitude] = useState(0);
  const [toLatitude, setToLatitude] = useState(0);
  const [toLongitude, setToLongitude] = useState(0);
  const [shouldRenderComponent, setShouldRenderComponent] = useState(false);

  // const {navigate} = this.props.navigation;

  useEffect(() => {
    axios.get(`${server}/driver/${uid}`).then(res => {
      const response = res.data;
      if (response.error == 0) {
        console.log(response.data[0].DriverID);
        setdId(response.data[0].DriverID);
      } else {
        setdId(0);
      }
      // console.log(response.data[0].DriverID);
      console.log('DID', did);
    });

    // console.log(route.params?.userid);
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("PassengerHome")
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [])
  );
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
  const onLoginPressed = () => {
    // console.log(cars);

    axios
      .post(`${server}/rides/passengercreateride`, {
        userID: uid,
        latitude: fromLatitude,
        longitude: fromLongitude,
        location: fromLocation,
        to_latitude: toLatitude,
        to_longitude: toLongitude,
        to_location: toLocation,
      })
      .then(res => {
        alert('Sucessfully posted!');
        navigation.navigate({
          name: 'ListPassengerRides',
          params: {
            userid: uid,
          },
        });
        console.log('passengerrideid', res.data.data);
        // const rid = res.data.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />

      {/* <Logo /> */}

      <View style={styles.searchContainer}>
        <Header>Where are you travelling to?</Header>
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
        <>
          <DirectionsDisplay
            start={[fromLongitude, fromLatitude]}
            end={[toLongitude, toLatitude]}
          />
          <Button
            style={{marginBottom: '25%'}}
            mode="contained"
            onPress={onLoginPressed}>
            Save
          </Button>
        </>
      )}

      {/* </ScrollView> */}
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  description: {
    fontSize: 13,
    color: theme.colors.secondary,
    paddingTop: 8,
    paddingBottom: 8,
  },
  container_touchable: {
    borderWidth: 1,
    width: 290,
    borderLeftColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description_two: {
    fontSize: 16,
    color: theme.colors.secondary,
    paddingTop: 8,
    paddingBottom: 8,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },

  button: {
    width: 300,
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  suggestiontwo: {
    paddingTop: 5,

    maxWidth: 600,
  },
  texton: {
    color: 'black',
    padding: 10,
    height: 700,
    width: 600,
  },
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
    marginTop: '15%',
  },
});
const googlePlacesStyles = StyleSheet.create({
  container: {
    flex: 0,
  },
  textInput: {
    fontSize: 16,
    height: 50,
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
