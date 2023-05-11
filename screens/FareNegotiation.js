import React, {useEffect, useState} from 'react';
import {Text} from 'react-native-paper';
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  BackHandler,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {theme} from '../core/theme';
import Background from '../components/Background';
import server from './globals';
import TextInput from '../components/TextInput';
import FareButton from '../components/FareButton';
import {Avatar, Button, Card, Title} from 'react-native-paper';
import Logo from '../components/Logo';
import Header from '../components/Header';
// import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import axios from 'axios';
import BackButton from '../components/BackButton';

export default function FareNegotiation({navigation, route}) {
  console.log(route.params.rides);
  const rides = route.params.rides;
  const [fare, setFare] = useState({value: '', error: ''});
  const [text, setValue] = useState('');

  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  const [suggestions, setSuggestions] = useState([]);
  const [places, setPlaces] = useState('');
  const [count, setCount] = useState(route.params.rides.fareEntered);
  const [location, setLocation] = useState();
  useEffect(() => {
    console.log('HI brother');
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('PassengerHome');
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );
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
      res = await axios.get(req);
      //console.log(await res);
    } catch (e) {
      console.log(e); // eslint-disable-line
    }

    if (res == null) {
      return;
    }

    const place = res.data;
    console.log(
      'PLACE',
      place.display_name.toString().split(' ').slice(0, 9).join(' '),
    );
    // console.log('place', place.features[0].place_name);

    setValue(place.display_name.toString().split(' ').slice(0, 9).join(' '));
    return place.display_name.toString().split(' ').slice(0, 9).join(' ');
    // setPlace(place.features[0].place_name);
    // coord = {lat: latLng[1], lng: latLng[0]};
    // console.log('coord', coord);
    // console.log('places' + textTwo);
  };
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
    setLatitude(latLng[1]);
    setLongitude(latLng[0]);
    // setPlace(place.features[0].place_name);
    coord = {lat: latLng[1], lng: latLng[0]};
    console.log('coord', coord);
    console.log('places' + textTwo);

    return coord;
  };
  const incrementCount = () => {
    // Update state with incremented value
    setCount(parseInt(count) + 10);
  };
  const decrementCount = () => {
    setCount(parseInt(count) - 10);
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
  return (
    <ScrollView>
      <Background>
        <BackButton goBack={navigation.goBack} />

        <Text style={styles.header}>Let's Start Your Ride!</Text>
        <Paragraph>
          Negotiate Fare here. Click on Request Ride to send request to
          driver...
        </Paragraph>
        <Card>
          <Text
            style={{
              fontSize: 25,
              marginLeft: 18,
              marginTop: 20,
              color: 'black',
            }}>
            Driver: {rides.firstName} {rides.lastName}
          </Text>
          {/* {getLocation(rides[item.id - 1])} */}
          <Card.Content>
            <Title>Going to {rides.to_location.split(',')[0]}</Title>
            <Text>Fare Requested {rides.fareEntered} Rupees</Text>
            {/* <TextInput
            label="Enter your fare & wait for driver to accept request"
            returnKeyType="done"
            value={fare.value}
            onChangeText={text => setFare({value: text, error: ''})}
          /> */}
            <Text style={styles.description}>Choose your fare:</Text>
            <View style={{alignItems: 'center', flex: 2, flexDirection: 'row'}}>
              <FareButton onPress={incrementCount}>+</FareButton>
              <Text>{count}</Text>
              <FareButton onPress={decrementCount}>-</FareButton>
            </View>
            <TextInput
              style={styles.input}
              label="From Where"
              value={text}
              onChange={text => handleChange(text)}
              isTyping={text !== ''}
            />
            {suggestions?.length > 0 && (
              <View style={styles.suggestion}>
                <TouchableOpacity
                  style={styles.suggestionthree}
                  // key={index}
                  onPress={() => {
                    console.log(
                      getPlaceName(
                        route.params.latitude,
                        route.params.longitude,
                      ),
                    );
                    setLatitude(route.params.latitude);
                    setLongitude(route.params.setLongitude);
                    setSuggestions([]);
                    setPlaces('Use Current Location');
                    getPlaceName(route.params.latitude, route.params.longitude);
                  }}>
                  <Image
                    source={require('../assets/geolcoation.jpg')}
                    style={styles.icon}
                    resizeMode="contain"
                  />
                  <Text style={styles.suggestiontwo}>Use Current Location</Text>
                </TouchableOpacity>
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
                        let srcCoord = null;
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
          </Card.Content>
          {/* <Card.Cover source={{uri: 'https://picsum.photos/700'}} /> */}
          <Card.Actions>
            <Button
              onPress={() => {
                console.log('text', text, latitude, longitude);
                if (text != '') {
                  axios
                    .post(`${server}/rides/addnegotiation`, {
                      driverFare: route.params.rides.fareEntered,
                      userFare: count,
                      finalFare: 0,
                      rideID: route.params.rides.RideID,
                      userLatitude: latitude,
                      userLongitude: longitude,
                      location: text,
                      userID: route.params.userid,
                    })
                    .then(() => {
                      alert('Request Sent to the driver!');
                      navigation.navigate('NewHome');
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                } else {
                  alert('Enter a location!');
                }
              }}>
              Send request
            </Button>
            <Button style={{color: 'red'}}></Button>
          </Card.Actions>
        </Card>
      </Background>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 21,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingTop: 460,
    paddingVertical: 12,
  },
  suggestionthree: {
    alignItems: 'center',
    paddingTop: 5,
    flexDirection: 'row',
    maxWidth: 600,
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
});
