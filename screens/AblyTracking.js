import React, {useState, useEffect, useCallback} from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {View, StyleSheet, Button} from 'react-native';
import io from 'socket.io-client';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiZmFpemFubXVraHRhcjEiLCJhIjoiY2xjZW5obmpqMzY5ZTN3dDg3NGtpcGZrciJ9.OOU211_NDTEI4g0IL0_Izw',
);
const SOCKET_SERVER_URL = 'https://pmisocketserver-production.up.railway.app';

const AblyTracking = () => {
  const [counter, setCounter] = useState(0);
  const [driverLocation, setDriverLocation] = useState([
    67.04311014205486, 24.791446911566705,
  ]);
  const updateDriverLocation = useCallback(location => {
    setDriverLocation(location);
    console.log(location);
  }, []);
  useEffect(() => {
    // Connect to the server via Socket.IO
    const socket = io(SOCKET_SERVER_URL);
    console.log(SOCKET_SERVER_URL);
    // Receive driver's location data from the server
    socket.on('driverLocation', updateDriverLocation);

    // Disconnect from the server on component unmount
    return () => {
      socket.disconnect();
    };
  }, [updateDriverLocation]);

  const handleReload = () => {
    console.log('INSIDE HANDLE RELOAD');
    setCounter(counter + 1);
  };

  return (
    // <View style={styles.container}>
    <MapboxGL.MapView style={styles.map}>
      {console.log(driverLocation)}
      <MapboxGL.Camera
        zoomLevel={15}
        animationMode={'flyTo'}
        animationDuration={3000}
        centerCoordinate={driverLocation}
      />
      {driverLocation && (
        <MapboxGL.PointAnnotation
          id="driverLocation"
          anchor={{x: 0.5, y: 0.5}}
          coordinate={driverLocation}></MapboxGL.PointAnnotation>
      )}
    </MapboxGL.MapView>
    //   <View style={styles.buttonContainer}>
    //     <Button title="Reload" onPress={() => console.log('Button pressed')} />
    //   </View>
    // </View>
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
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
