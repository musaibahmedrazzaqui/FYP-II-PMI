import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {lineString} from '@turf/helpers';

import PickupDestination from '../components/PickupDestination';
import centroid from '@turf/centroid';
import LocationButton from '../components/LocationButton';
import {useNavigation} from '@react-navigation/native';
MapboxGL.setAccessToken(
  'pk.eyJ1IjoicG9vbG1laW4iLCJhIjoiY2xndmJvMWJhMHR0MjNmbzVveG5qNTZ6cCJ9.UIciTcObMi46b9dxG6Ptnw',
);
const DirectionsDisplay = ({start, end}) => {
  const [routeGeoJSON, setRouteGeoJSON] = useState(null);
  const mapRef = useRef(null);
  useEffect(() => {
    const fetchDirections = async () => {
      const accessToken =
        'pk.eyJ1IjoicG9vbG1laW4iLCJhIjoiY2xndmJvMWJhMHR0MjNmbzVveG5qNTZ6cCJ9.UIciTcObMi46b9dxG6Ptnw';
      const requestUrl = `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${start};${end}?geometries=geojson&access_token=${accessToken}`;
      console.log(requestUrl);
      try {
        const response = await fetch(requestUrl);
        const data = await response.json();
        console.log('DATAAAAa', data);
        const route = data.routes[0].geometry;
        setRouteGeoJSON(lineString(route.coordinates));
      } catch (error) {
        console.error(error);
      }
    };

    fetchDirections();
  }, [start, end]);

  const handleSetCamera = () => {
    const coordinates = [start, end];
    const centerCoordinate = centroid({
      type: 'FeatureCollection',
      features: coordinates.map((coordinate, index) => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: coordinate,
        },
        properties: {
          id: index.toString(),
        },
      })),
    }).geometry.coordinates;
    {
      mapRef.current != null &&
        mapRef.current.setCamera({
          centerCoordinate: centerCoordinate,
          zoomLevel: 8,
          animationDuration: 2000,
        });
    }
  };

  const handleOnDidFinishLoadingMap = () => {
    handleSetCamera();
  };
  const Navigat = useNavigation();
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView
          ref={mapRef}
          style={{flex: 1}}
          zoomEnabled
          onDidFinishLoadingMap={handleOnDidFinishLoadingMap}>
          <MapboxGL.Camera zoomLevel={12} centerCoordinate={start} />

          <MapboxGL.PointAnnotation id="start" coordinate={start} />

          <MapboxGL.PointAnnotation id="end" coordinate={end} />

          {routeGeoJSON && (
            <MapboxGL.ShapeSource
              id="routeSource"
              shape={routeGeoJSON}
              onPress={() => console.log('route clicked')}>
              <MapboxGL.LineLayer
                id="routeFill"
                style={{lineColor: '#00B0FF', lineWidth: 7}}
              />
            </MapboxGL.ShapeSource>
          )}
        </MapboxGL.MapView>
      </View>
    </View>
  );
};

export default DirectionsDisplay;
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
  container: {
    height: '100%',
    width: 450,
  },
});
