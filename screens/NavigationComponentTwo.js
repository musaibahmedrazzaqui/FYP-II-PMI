/* eslint-disable comma-dangle */
import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {Image, TouchableOpacity} from 'react-native';
import MapboxNavigation from '@homee/react-native-mapbox-navigation';
import {useNavigation} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import server from './globals';
import axios from 'axios';
const Navigation = props => {
  const [location, setLocation] = useState(null);
  const Navigat = useNavigation();
  const {origin, destination} = props;
  const [visible, setVisible] = React.useState(false);
  const DRIVER_API_URL =
    'https://pmisocketserver-production.up.railway.app/driver-location';
  //const DRIVER_API_URL = 'http://10.0.2.2:3000/driver-location';
  useEffect(() => {
    console.log('PROPS', props);
    const watchId = Geolocation.watchPosition(
      position => {
        const {longitude, latitude} = position.coords;

        // Send location data to the server via HTTP POST request
        axios.post(DRIVER_API_URL, {longitude, latitude});

        setLocation([longitude, latitude]);
      },
      error => console.log('Error getting location:', error),
      {enableHighAccuracy: true, distanceFilter: 10},
    );
    console.log('propsssssss', props.puid);
    console.log('riddddddddd', props.rid);
    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);
  const containerStyle = {backgroundColor: 'white', padding: 20};
  // mode="contained" onPress={onButtonPressed}

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => Navigat.navigate('DriverHome')}
        style={{position: 'absolute', top: -50, left: -30}}>
        <Image
          style={{
            height: 20,
            width: 20,
          }}
          source={require('../assets/back.png')}
        />
      </TouchableOpacity>
      <View style={styles.mapContainer}>
        {/* {console.log(origin)} */}
        <MapboxNavigation
          showsEndOfRouteFeedback={true}
          shouldSimulateRoute={false}
          origin={origin}
          destination={destination}
          showsEndOfRouteFeedback={false}
          hideStatusView
          onLocationChange={event => {
            // console.log('onLocationChange', event.nativeEvent.latitude);
            setLocation([
              event.nativeEvent.longitude,
              event.nativeEvent.latitude,
            ]);
            axios.post(DRIVER_API_URL, location);
            // console.log(location[0]);
          }}
          onRouteProgressChange={event => {
            // console.log('onRouteProgressChange', event.nativeEvent);
          }}
          onError={event => {
            const {message} = event.nativeEvent;
            // eslint-disable-next-line no-alert
            alert(message);
          }}
          onArrive={async event => {
            try {
              alert('You have reached your destination');
              console.log('Reached Destination', event.nativeEvent);
              if (props.puid !== 0) {
                const res = await axios.get(
                  `${server}/rides/updatestatus/${props.puid}/${props.rid}`,
                );
                console.log(res.data);
                Navigat.navigate('DriverHome');
              } else {
                console.log('HIIIIIIIIIIIIIIIII');
              }
            } catch (error) {
              console.error(error);
              // Handle the error gracefully, for example, show a toast message or an alert box
            }
          }}
          onCancelNavigation={event => {
            alert('Cancelled navigation event');
            Navigat.navigate('DriverHome');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '50%',
  },
  mapContainer: {
    flex: 1,
  },
});

export default Navigation;
