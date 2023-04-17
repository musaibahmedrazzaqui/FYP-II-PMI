import React, {useState, useEffect} from 'react';
import {TouchableOpacity, StyleSheet, View, ScrollView} from 'react-native';
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
// import { Dropdown } from "react-native-material-dropdown";
export default function PassengerCreateRide({navigation, route}) {
  const [did, setdId] = useState(0);

  const [count, setCount] = useState(100);

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

    console.log('FROM' + fromlatitude + '   ' + fromlongitude);

    console.log('TO' + tolatitude + '   ' + tolongitude);
    // console.log(route.params?.userid);
  }, []);

  const onLoginPressed = () => {
    // console.log(cars);
    console.log('FROM' + fromlatitude + '   ' + fromlongitude);

    console.log('TO' + tolatitude + '   ' + tolongitude);

    axios
      .post(`${server}/rides/passengercreateride`, {
        userID: uid,
        latitude: fromlatitude,
        longitude: fromlongitude,
        location: textTwo,
        to_latitude: tolatitude,
        to_longitude: tolongitude,
        to_location: textThree,
      })
      .then(res => {
        alert('Sucessfully posted!');

        console.log('passengerrideid', res.data.data);
        // const rid = res.data.data;

        navigation.navigate({
          name: 'FromScreen',
          params: {
            userid: uid,
            loc1: textTwo,
            loc2: textThree,
            fromcoord: [fromlongitude, fromlatitude],
            tocoord: [tolongitude, tolatitude],
            pass: true,
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

    const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${str}.json?bbox=66.747436523,24.639527881,67.473907471,25.111714983&access_token=pk.eyJ1IjoiZmFpemFubXVraHRhcjEiLCJhIjoiY2xjZW5obmpqMzY5ZTN3dDg3NGtpcGZrciJ9.OOU211_NDTEI4g0IL0_Izw`;
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

    const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${str}.json?bbox=66.747436523,24.639527881,67.473907471,25.111714983&access_token=pk.eyJ1IjoiZmFpemFubXVraHRhcjEiLCJhIjoiY2xjZW5obmpqMzY5ZTN3dDg3NGtpcGZrciJ9.OOU211_NDTEI4g0IL0_Izw`;
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
      '.json?bbox=66.747436523,24.639527881,67.473907471,25.111714983&access_token=pk.eyJ1IjoiZmFpemFubXVraHRhcjEiLCJhIjoiY2xjZW5obmpqMzY5ZTN3dDg3NGtpcGZrciJ9.OOU211_NDTEI4g0IL0_Izw';

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

    return coord;
  };
  const getCoordinatestwo = async name => {
    // code to get coordinates by making API calls to mapbox endpoint

    const req =
      'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
      name +
      '.json?bbox=66.747436523,24.639527881,67.473907471,25.111714983&access_token=pk.eyJ1IjoiZmFpemFubXVraHRhcjEiLCJhIjoiY2xjZW5obmpqMzY5ZTN3dDg3NGtpcGZrciJ9.OOU211_NDTEI4g0IL0_Izw';

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
    return coord;
  };
  return (
    <Background>
      <BackButton goBack={navigation.goBack} />

      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          marginTop: 15,
          width: 300,
        }}>
        {/* <Logo /> */}
        <Header>Where are you travelling to?</Header>
        <TextInput
          style={styles.input}
          label="From Where"
          value={textTwo}
          onChange={textTwo => handleChange(textTwo)}
          isTyping={textTwo !== ''}
        />
        {/* {calll()} */}
        {suggestions?.length > 0 && (
          <View style={styles.suggestion}>
            {suggestions.map((suggestion, index) => {
              return (
                <TouchableOpacity
                  style={styles.suggestiontwo}
                  key={index}
                  onPress={() => {
                    setValue(suggestion.place_name);
                    setSuggestions([]);
                    setPlaces(suggestion.place_name);
                    const sLower = suggestion.place_name.toLowerCase();
                    console.log('slower', sLower);
                    // let srcCoord = null;
                    getCoordinates(sLower);
                  }}>
                  <Text style={styles.suggestiontwo}>
                    {suggestion.place_name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
        <TextInput
          style={styles.input}
          label="To Where"
          value={textThree}
          onChange={textThree => handleChangetwo(textThree)}
          isTyping={textThree !== ''}
        />
        {suggestionstwo?.length > 0 && (
          <View style={styles.suggestion}>
            {suggestionstwo.map((suggestiontwo, index) => {
              return (
                <TouchableOpacity
                  style={styles.suggestiontwo}
                  key={index}
                  onPress={() => {
                    setValuetwo(suggestiontwo.place_name);
                    setSuggestionsTwo([]);
                    setPlaces(suggestiontwo.place_name);
                    const sLower = suggestiontwo.place_name.toLowerCase();
                    console.log('slower', sLower);
                    // let srcCoord = null;
                    getCoordinatestwo(sLower);
                  }}>
                  <Text style={styles.suggestiontwo}>
                    {suggestiontwo.place_name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        <Button mode="contained" onPress={onLoginPressed}>
          Save
        </Button>
      </ScrollView>
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
});
