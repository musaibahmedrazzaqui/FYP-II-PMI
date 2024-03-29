import React, {useState, useEffect, useCallback} from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Geolocation from '@react-native-community/geolocation';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  BackHandler
} from 'react-native';
import io from 'socket.io-client';
import axios from 'axios';
import server from './globals';
import { useFocusEffect } from '@react-navigation/native';
// import { Card } from 'react-native-paper';
import {Avatar, Button, Card, Title} from 'react-native-paper';
import BackButton from '../components/BackButton';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoicG9vbG1laW4iLCJhIjoiY2xndmJvMWJhMHR0MjNmbzVveG5qNTZ6cCJ9.UIciTcObMi46b9dxG6Ptnw',
);
const SOCKET_SERVER_URL = 'https://pmisocketserver-production.up.railway.app';

const AblyTracking = ({navigation, route}) => {
  const [counter, setCounter] = useState(0);
  const [latitude, setLat] = useState(0.0);
  const [longitude, setLong] = useState(0.0);
  const [check, setCheck] = useState();
  const [driverId, setdriverid] = useState(0);
  const [driverLocation, setDriverLocation] = useState([
    67.04311014205486, 24.791446911566705,
  ]);
  const [dataforably, setData] = useState([]);
  const updateDriverLocation = useCallback(location => {
    setDriverLocation(location);
    // console.log(location);
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
    // console.log(route.params.rides);
    Geolocation.getCurrentPosition(info => {
      setLat(info.coords.latitude);
      setLong(info.coords.longitude);
    });

    let url = `${server}/rides/forably/${route.params?.userid}`;
    const socket = io(SOCKET_SERVER_URL);
    axios.get(url).then(res => {
      console.log(url);
      const response = res.data;
      console.log(response.data[0]);
      if (response.error == 0) {
        // console.log('respose', response);
        console.log(res.data.data[0]);
        setData(res.data.data[0]);
        setdriverid(res.data.data[0].DriverID);
        console.log('DRIVERID', res.data.data[0].DriverID);
        socket.emit('subscribe', res.data.data[0].DriverID);
        socket.on('driverLocation', location => {
          setDriverLocation(location);
        });
        setCheck(5);
      } else {
        alert('No active rides yet');
        console.log('error');
      }
    });
    // Connect to the server via Socket.IO

    // console.log(SOCKET_SERVER_URL);
    // Receive driver's location data from the server
    // socket.emit('join', driverId);

    // Disconnect from the server on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);
  const handlePress = () => {
    Linking.openURL(`tel:${dataforably.phone}`);
  };
  return (
    // <View style={styles.container}>
    <>
      {check && (
        <MapboxGL.MapView style={styles.map}>
          {/* {console.log(dataforably.DestLat)} */}
          <MapboxGL.Camera
            zoomLevel={13}
            animationMode={'flyTo'}
            animationDuration={3000}
            centerCoordinate={driverLocation}
          />
          <MapboxGL.PointAnnotation
            id="currentlocation"
            title="current location"
            anchor={{x: 0.5, y: 0.5}}
            coordinate={[dataforably.PassLong, dataforably.PassLat]}>
            <MapboxGL.Callout title="Your Marker Title">
              <View>
                <Text>Your current location</Text>
              </View>
            </MapboxGL.Callout>
          </MapboxGL.PointAnnotation>
          <MapboxGL.PointAnnotation
            id="finallocation"
            title="Destination"
            anchor={{x: 0.5, y: 0.5}}
            coordinate={[dataforably.DestLong, dataforably.DestLat]}>
            <MapboxGL.Callout title="Your Marker Title">
              <View>
                <Text>Destination</Text>
              </View>
            </MapboxGL.Callout>
          </MapboxGL.PointAnnotation>

          {driverLocation && (
            <MapboxGL.PointAnnotation
              id="driverLocation"
              title="Driver's location"
              anchor={{x: 0.5, y: 0.5}}
              coordinate={driverLocation}>
              <MapboxGL.Callout title="Your Marker Title">
                <View>
                  <Text>Driver's Location</Text>
                </View>
              </MapboxGL.Callout>
            </MapboxGL.PointAnnotation>
          )}
        </MapboxGL.MapView>
      )}
      <View>
        <Card>
          <BackButton goBack={navigation.goBack} />
          <Text
            style={{
              fontSize: 25,
              marginLeft: 18,
              marginTop: 20,
              color: 'black',
            }}>
            Driver: {dataforably.firstName} {dataforably.lastName}
          </Text>
          {/* {getLocation(rides[item.id - 1])} */}
          <Card.Content>
            <Title>Destination: {dataforably.DestLocation}</Title>

            <TouchableOpacity onPress={handlePress}>
              <Image
                source={require('../assets/dial1.jpg')}
                style={styles.image}
              />
            </TouchableOpacity>

            <Text style={{color: 'black', fontSize: 20, fontStyle: 'italic'}}>
              Fare Decided: {dataforably.fareDecided} Rupees
            </Text>
          </Card.Content>
          {/* <Card.Cover source={{uri: 'https://picsum.photos/700'}} /> */}
        </Card>
      </View>
    </>
  );
};

export default AblyTracking;

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  image: {
    width: 70,
    height: 70,
    marginBottom: 1,
    marginTop: -75,
    marginLeft: 290,
  },
});
