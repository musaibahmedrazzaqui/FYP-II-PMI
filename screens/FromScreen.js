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
import DirectionsMap from './DirectionsMap';
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
  const fromcoord = route.params.fromcoord;
  const tocoord = route.params.tocoord;
  const [did, setDid] = useState();
  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      setlatitude(info.coords.latitude);
      setlongitude(info.coords.longitude);
      console.log('uidFrom Screen' + route.params?.userid);
      console.log('fromCoord', fromcoord);
      console.log('toCoord', tocoord);
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

  return (
    <View style={styles.container}>
      <DirectionsMap
        loc1={route.params.loc1}
        loc2={route.params.loc2}
        start={fromcoord}
        end={tocoord}
        uid={route.params?.userid}
        pass={route.params?.pass}
      />
    </View>
  );
};

export default FromScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
