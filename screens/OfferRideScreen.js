import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
  Image,
} from 'react-native';
import {Text} from 'react-native-paper';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

import DirectionsDisplay from '../components/DirectionsDisplay';
import Geolocation from '@react-native-community/geolocation';
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
// import { Dropdown } from "react-native-material-dropdown";

const GOOGLE_MAPS_API_KEY = 'AIzaSyAhpqm1hIWBkVzKvf7uyqCmYNRxwQwbZzo';
export default function OfferRideScreen({navigation, route}) {
  const [from, setFrom] = useState('true');
  const [did, setdId] = useState(0);
  const [to, setTo] = useState({value: '', error: ''});
  const [seats, setSeats] = useState({value: '', error: ''});
  const [fare, setFare] = useState({value: 100, error: ''});
  const [count, setCount] = useState(100);
  const [vehicle, setVehicle] = useState({value: '', error: ''});
  const [selected, setSelected] = React.useState('');
  const [uid, setUid] = useState(route.params?.userid);
  const [cars, setCars] = useState([]);
  const [places, setPlaces] = useState('');
  const [fromlatitude, setfLatitude] = useState(0.0);

  const [fromlongitude, setfLongitude] = useState(0.0);
  const [tolatitude, settLatitude] = useState(0.0);
  const [tolongitude, settLongitude] = useState(0.0);
  const [textTwo, setValue] = useState('');
  const [textThree, setValuetwo] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const [suggestionstwo, setSuggestionsTwo] = useState([]);

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
    axios.get(`${server}/vehicle/getvehicles/${uid}`).then(res => {
      const response = res.data;
      // console.log(res.data);
      setCars(response.data);
      //  setdId(response.data[0].DriverID);
    });
    console.log('FROM' + fromlatitude + '   ' + fromlongitude);

    console.log('TO' + tolatitude + '   ' + tolongitude);
    // console.log(route.params?.userid);
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
  const incrementCount = () => {
    // Update state with incremented value
    setCount(count + 50);
  };
  const decrementCount = () => {
    setCount(count - 50);
  };
  const getPlaceName = async (latitude, longitude) => {
    // code to get coordinates by making API calls to mapbox endpoint

    // const req =
    //   'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    //   longitude +
    //   ',' +
    //   latitude +
    //   '.json?bbox=66.747436523,24.639527881,67.473907471,25.111714983&access_token=pk.eyJ1IjoicG9vbG1laW4iLCJhIjoiY2xndmJvMWJhMHR0MjNmbzVveG5qNTZ6cCJ9.UIciTcObMi46b9dxG6Ptnw';
    const req =
      'https://nominatim.openstreetmap.org/reverse?lat=' +
      latitude +
      '&lon=' +
      longitude +
      '&format=json';

    // console.log('req', req);

    let coord = null;
    let res = null;

    // axios.get
    try {
      // console.log('before axiosos');
      console.log('REQ', req);
      axios.get(req).then(res => {
        console.log(res);
        const place = res.data;
        setValue(
          place.display_name.toString().split(' ').slice(0, 9).join(' '),
        );
        return textTwo;
      });
      //console.log(await res);
    } catch (e) {
      console.log(e); // eslint-disable-line
    }

    if (res == null) {
      return;
    }

    // const place = await res.data;
    // console.log(
    //   'PLACE',
    //   place.display_name.toString().split(' ').slice(0, 9).join(' '),
    // );
    // console.log('place', place.features[0].place_name);

    // setValue(place.display_name.toString().split(' ').slice(0, 9).join(' '));
    // return place.display_name.toString().split(' ').slice(0, 9).join(' ');
    // setPlace(place.features[0].place_name);
    // coord = {lat: latLng[1], lng: latLng[0]};
    // console.log('coord', coord);
    // console.log('places' + textTwo);
  };

  const onLoginPressed = () => {
    // console.log(cars);
    // console.log('FROM' + fromlatitude + '   ' + fromlongitude);

    // console.log('TO' + tolatitude + '   ' + tolongitude);
    const fieldError = fieldValidator(fare.value);
    const fieldError2 = fieldValidator(seats.value);
    if (fieldError || fieldError2) {
      setFare({...fare, error: fieldError});
      setSeats({...seats, error: fieldError2});
      return;
    }
    axios
      .post(`${server}/rides/addnew`, {
        DriverID: did,
        numberOfPeople: seats.value,
        fareEntered: count,
        vehicleID: vehicle.value,
      })
      .then(res => {
        alert('Sucessfully posted!');
        console.log(
          'did',
          did,
          'seats',
          seats.value,
          'fare',
          fare.value,
          'vehcile',
          vehicle.value,
        );
        console.log('RIDEIDDDDDDDDD', res.data.data);
        const rid = res.data.data;

        axios
          .post(`${server}/rides/driverlocation`, {
            RideID: rid,
            latitude: fromlatitude,
            longitude: fromlongitude,
            driverUserId: route.params.userid,
            location: textTwo,
            driverID: did,
          })
          .then(() => {
            axios
              .post(`${server}/rides/driverlocationto`, {
                RideID: rid,
                to_latitude: tolatitude,
                to_longitude: tolatitude,
                to_driverUserId: route.params.userid,
                to_location: textThree,
                to_driverID: did,
              })
              .then(() => {})
              .catch(function (error) {
                console.log(error);
                alert(error);
              });
          })
          .catch(function (error) {
            console.log(error);
            alert(error);
          });
        navigation.navigate({
          name: 'FromScreen',
          params: {
            userid: uid,
            loc1: textTwo,
            loc2: textThree,
            fromcoord: [fromlongitude, fromlatitude],
            tocoord: [tolongitude, tolatitude],
          },
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleChange = async event => {
    const {eventCount, target, text} = event.nativeEvent;
    var newText = event.nativeEvent.text;
    var str = newText.toString();
    setValue(str);
    // console.log(str);

    const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${str}.json?bbox=66.747436523,24.639527881,67.473907471,25.111714983&access_token=pk.eyJ1IjoicG9vbG1laW4iLCJhIjoiY2xndmJvMWJhMHR0MjNmbzVveG5qNTZ6cCJ9.UIciTcObMi46b9dxG6Ptnw`;
    let response;
    try {
      response = await fetch(endpoint);
      const results = await response.json();
      setSuggestions(results?.features);
      console.log(suggestions);
    } catch (error) {
      console.log(error);
    }
    //console.log(endpoint);
    // const results = await response.json();
    // console.log(results);
  };
  const handleChangetwo = async event => {
    const {eventCount, target, text} = event.nativeEvent;
    var newText = event.nativeEvent.text;
    var str = newText.toString();
    setValuetwo(str);
    // console.log(str);

    const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${str}.json?bbox=66.747436523,24.639527881,67.473907471,25.111714983&access_token=pk.eyJ1IjoicG9vbG1laW4iLCJhIjoiY2xndmJvMWJhMHR0MjNmbzVveG5qNTZ6cCJ9.UIciTcObMi46b9dxG6Ptnw`;
    let response;
    try {
      response = await fetch(endpoint);
      const results = await response.json();
      setSuggestionsTwo(results?.features);
      console.log(suggestions);
    } catch (error) {
      console.log(error);
    }
    //console.log(endpoint);
    // const results = await response.json();
    // console.log(results);
  };
  // const [text, onChangeText] = useState('');

  //   const coordinate = [longitude, latitude];

  const getCoordinates = async name => {
    // code to get coordinates by making API calls to mapbox endpoint

    const req =
      'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
      name +
      '.json?bbox=66.747436523,24.639527881,67.473907471,25.111714983&access_token=pk.eyJ1IjoicG9vbG1laW4iLCJhIjoiY2xndmJvMWJhMHR0MjNmbzVveG5qNTZ6cCJ9.UIciTcObMi46b9dxG6Ptnw';

    console.log('req', req);

    let coord = null;
    let res = null;

    // axios.get
    try {
      // console.log('before axiosos');
      res = await axios.get(req);
      //console.log(await res);
    } catch (e) {
      console.log(e); // eslint-disable-line
    }

    if (res == null) {
      return;
    }

    const place = await res.data;
    // console.log('place', place);
    if (!place.features.length) {
      // check whether the coordinates are returned for the Place
      console.log('features : ' + place.features[0].geometry);
      return;
    }

    const latLng = place.features[0].geometry.coordinates;
    setfLatitude(latLng[1]);
    setfLongitude(latLng[0]);
    // setPlace(place.features[0].place_name);
    coord = {lat: latLng[1], lng: latLng[0]};
    console.log('coord', coord);
    console.log('places' + textTwo);
    // axios
    //   .post(`${server}/rides/driverlocation`, {
    //     latitude: latLng[1],
    //     longitude: latLng[0],
    //     driverUserId: route.params.userid,
    //     location: textTwo,
    //     driverID: did,
    //   })
    //   .then(() => {
    //     alert('Sucessfully added!');
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //     alert(error);
    //   });

    return coord;
  };
  const getCoordinatestwo = async name => {
    // code to get coordinates by making API calls to mapbox endpoint

    const req =
      'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
      name +
      '.json?bbox=66.747436523,24.639527881,67.473907471,25.111714983&access_token=pk.eyJ1IjoicG9vbG1laW4iLCJhIjoiY2xndmJvMWJhMHR0MjNmbzVveG5qNTZ6cCJ9.UIciTcObMi46b9dxG6Ptnw';

    console.log('req', req);

    let coord = null;
    let res = null;

    // axios.get
    try {
      // console.log('before axiosos');
      res = await axios.get(req);
      //console.log(await res);
    } catch (e) {
      console.log(e); // eslint-disable-line
    }

    if (res == null) {
      return;
    }

    const place = await res.data;
    // console.log('place', place);
    if (!place.features.length) {
      // check whether the coordinates are returned for the Place
      console.log('features : ' + place.features[0].geometry);
      return;
    }

    const latLng = place.features[0].geometry.coordinates;
    settLatitude(latLng[1]);
    settLongitude(latLng[0]);
    // setPlace(place.features[0].place_name);
    coord = {lat: latLng[1], lng: latLng[0]};
    console.log('coord', coord);
    console.log('places' + textTwo);
    // axios
    //   .post(`${server}/rides/driverlocation`, {
    //     latitude: latLng[1],
    //     longitude: latLng[0],
    //     driverUserId: route.params.userid,
    //     location: textTwo,
    //     driverID: did,
    //   })
    //   .then(() => {
    //     alert('Sucessfully added!');
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //     alert(error);
    //   });

    return coord;
  };
  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      {did === 0 ? (
        <>
          <Header>You need to register as a driver first</Header>
          <Button
            onPress={() => {
              navigation.navigate({
                name: 'RegisterDriverScreen',
                params: {
                  userid: uid,
                },
              });
            }}>
            Register as a Driver
          </Button>
        </>
      ) : (
        <Background>
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
            <Text style={styles.description}>
              Which vehicle will you take today?
            </Text>
            {/* {getVehicleInfo()} */}

            <Text style={styles.description}>Registered Vehicles:</Text>
            {cars.map(user => (
              <View key={user.vehicleID}>
                <TouchableOpacity
                  onPress={() =>
                    setVehicle({value: user.vehicleID, error: ''})
                  }>
                  <Text>{user.Manufacturer + ' ' + user.Model}</Text>
                </TouchableOpacity>
                {/* <Text>{user.Manufactuer}</Text> */}
              </View>
            ))}

            <Text style={styles.description}>Choose your fare:</Text>
            <FareButton onPress={incrementCount}>+</FareButton>
            <Text>{count}</Text>
            <FareButton onPress={decrementCount}>-</FareButton>
            <TextInput
              label="Number of maximum passengers"
              returnKeyType="done"
              value={seats.value}
              onChangeText={text => setSeats({value: text, error: ''})}
              error={!!seats.error}
              errorText={seats.error}
            />
          </View>

          {/* <Button mode="contained" onPress={onLoginPressed}>
            Save
          </Button> */}
        </Background>
      )}
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
  icon: {
    marginTop: 4,
    width: 30,
    height: 15,
  },
  suggestionthree: {
    alignItems: 'center',
    paddingTop: 5,
    flexDirection: 'row',
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
