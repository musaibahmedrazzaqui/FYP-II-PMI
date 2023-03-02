import React from 'react';
import {useState, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {Platform} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import LocationButton from '../components/LocationButton';
import axios from 'axios';
import server from './globals';
import Entypo from 'react-native-vector-icons/Entypo';
// import BackButton from '../components/BackButton';
MapboxGL.setAccessToken(
  'pk.eyJ1IjoibXVzYWliYWhtZWRyYXp6YXF1aSIsImEiOiJjbGFud3ZlemEwMGRiM25sc2dlbW1vMmRxIn0.426C1RaWyDpDv9XJ8Odigg',
);

const FromScreen = ({navigation, route}) => {
  const [latitude, setlatitude] = React.useState(0.0);
  const [longitude, setlongitude] = React.useState(0.0);
  const [places, setPlaces] = useState('');
  const [did, setDid] = useState();
  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      setlatitude(info.coords.latitude);
      setlongitude(info.coords.longitude);
      console.log('uidFrom Screen' + route.params?.userid);
    });
    axios.get(`${server}/driver/${route.params?.userid}`).then(res => {
      // console.log('userid', route.);
      const response = res.data.error;

      console.log(response);
      if (response == 0) {
        console.log('driverid From Screen' + res.data.data[0].DriverID);
        setDid(res.data.data[0].DriverID);
        let drid = res.data.data[0].DriverID;
      } else {
        setDid(0);
        // setCheck(false);
      }
    });
  }, []);
  const [textTwo, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
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
  // const [text, onChangeText] = useState('');

  const coordinate = [longitude, latitude];
  const onButtonPressed = () => {
    //console.log(text);
    setPlaces(textTwo);
    const sLower = textTwo.toLowerCase();
    console.log('slower', sLower);
    let srcCoord = null;
    getCoordinates(sLower);
    // console.log('srcCoord', srcCoord);
  };

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
    setlatitude(latLng[1]);
    setlongitude(latLng[0]);
    // setPlace(place.features[0].place_name);
    coord = {lat: latLng[1], lng: latLng[0]};
    console.log('coord', coord);
    console.log('places' + textTwo);
    axios
      .post(`${server}/rides/driverlocation`, {
        latitude: latLng[1],
        longitude: latLng[0],
        driverUserId: route.params.userid,
        location: textTwo,
        driverID: did,
      })
      .then(() => {
        alert('Sucessfully added!');
      })
      .catch(function (error) {
        console.log(error);
        alert(error);
      });

    return coord;
  };

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          label="Address"
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
                  }}>
                  <Text style={styles.suggestiontwo}>
                    {suggestion.place_name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
        <MapboxGL.MapView style={styles.map} zoomEnabled logoEnabled={false}>
          {/* <MapboxGL.UserLocation
            visible={true}
            onUpdate={onUserLocationUpdate}
          /> */}
          {console.log(longitude)}
          {console.log(latitude)}
          <MapboxGL.Camera
            zoomLevel={15}
            centerCoordinate={[longitude, latitude]}
          />
          <MapboxGL.PointAnnotation
            anchor={{x: 0.5, y: 0.5}}
            coordinate={[longitude, latitude]}>
            <View>
              <Entypo name="location-pin" size={24} color="black" />
            </View>
          </MapboxGL.PointAnnotation>

          {/* </MapboxGL.Camera> */}
        </MapboxGL.MapView>
        <LocationButton mode="contained" onPress={onButtonPressed}>
          Save
        </LocationButton>
        {/* <LocationButton
          mode="contained"
          onPress={navigation.navigate({
            name: 'FoodScreen',
            params: {
              fromlatitude: latitude,
              fromlongitude: longitude,
              userid: route.params?.userid,
            },
          })}>
          Done
        </LocationButton> */}
      </View>
    </View>
  );
};

export default FromScreen;

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 350,
    marginLeft: 125,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
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
    paddingLeft: 70,
    marginRight: 70,
    maxWidth: 600,
  },
  texton: {
    color: 'black',
    padding: 10,
    height: 700,
    width: 600,
  },
  container: {
    height: 700,
    width: 600,
  },
  map: {
    flex: 1,
  },
});

export async function hasLocationPermission() {
  if (
    Platform.OS === 'web' ||
    Platform.OS === 'ios' ||
    (Platform.OS === 'android' && Platform.Version < 23)
  ) {
    return true;
  }
  const isGranted = await MapboxGL.requestAndroidLocationPermissions();

  return isGranted;
}
