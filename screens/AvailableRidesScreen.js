import React, {useState, useCallback} from 'react';
import {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  RefreshControl,
  PermissionsAndroid,
} from 'react-native';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import Geolocation from '@react-native-community/geolocation';
import Background from '../components/Background';
import BackButton from '../components/BackButton';
import RNRestart from 'react-native-restart';
import server from './globals';
import axios from 'axios';
import PickupDestination from '../components/PickupDestination2';
// import FareNegotiation from './FareNegotiation';

const AvailableRidesScreen = ({navigation, route}) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const [rides, setRides] = useState([]);
  const [months, setMonths] = useState(monthNames);
  const [sortedrides, setsortedrides] = useState([]);
  const [show, setShow] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [uid, setUid] = useState(route.params?.userid);
  const [did, setdId] = useState();
  const [latitude, setlatitude] = React.useState(route.params?.lat);
  const [longitude, setlongitude] = React.useState(route.params?.long);
  function calculateDistance(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295; // Math.PI / 180
    var c = Math.cos;
    var a =
      0.5 -
      c((lat2 - lat1) * p) / 2 +
      (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;
    const distance = 12742 * Math.asin(Math.sqrt(a));
    console.log('Distance: ', distance);
    return distance;
  }

  const getRidedata = response => {
    // console.log('hereeee', response);
    let rData = response;

    // console.log('Car data', carData);
    const keys = Object.keys(rData);
    console.log('Keys', keys);
    return keys.map(key => {
      let rideData = rData[key];
      console.log('SSSSSSSSSSSSS', rideData.datetime);
      const dateform = new Date(rideData.datetime);
      rideData.datetime = dateform;
      //  console.log(caData);
      return {key: key, ...rideData};
    });
  };
  const fetchData = async () => {
    await axios
      .get(`${server}/rides/getrides/${route.params?.userid}`)
      .then(res => {
        // console.log('DID ');
        const response = res.data;
        if (response.error == 0) {
          console.log(res.data.length);
          setRides(getRidedata(response.data));
          // sortArray();
        } else {
          console.log('error');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  function sortArray() {
    console.log('inside sort array', latitude, longitude);
    const sortedArray = rides.sort((a, b) => {
      const distanceA = calculateDistance(
        latitude,
        longitude,
        a.DriverLat,
        a.DriverLong,
      );
      const distanceB = calculateDistance(
        latitude,
        longitude,
        b.DriverLat,
        b.DriverLong,
      );
      return distanceA - distanceB;
    });
    setRides(getRidedata(sortedArray));
  }
  useEffect(() => {
    // requestLocationPermission();
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log('positionnnnnnnn', position);
        setlatitude(latitude);
        setlongitude(longitude);

        // do something with latitude and longitude
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 2000, maximumAge: 1000},
    );
    fetchData();
    // sortArray();
  }, []);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    console.log('on refersh');
    setRefreshing(true);
    // fetch new data or do any necessary processing
    // setData([...]); // set the new data array
    fetchData();
    setRefreshing(false);
  };
  const getLocation = async data => {
    console.log(data.id);
    // const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${data.location}.json?types=place%2Cpostcode%2Caddress&limit=1&access_token=pk.eyJ1IjoibXVzYWliYWhtZWRyYXp6YXF1aSIsImEiOiJjbGFud3ZlemEwMGRiM25sc2dlbW1vMmRxIn0.426C1RaWyDpDv9XJ8Odigg`;
    // const response = await fetch(endpoint);
    // //console.log(endpoint);
    // const results = await response.json();
    // console.log(results);
  };
  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      {/* {isSorted && ()} */}
      {/* {console.log(rides)} */}
      <Button
        onPress={() => {
          sortArray();
        }}>
        Sort by Current Location
      </Button>
      {rides[0] ? (
        // {new Date(item.datetime)}
        <FlatList
          data={rides}
          keyExtractor={item => item.key.toString()}
          renderItem={({item}) => (
            <View style={{padding: 10}}>
              <TouchableOpacity
                onPress={() => {
                  axios
                    .get(
                      `${server}/rides/checkforrequest/${route.params?.userid}/${item.RideID}`,
                    )
                    .then(res => {
                      // console.log('DID ');
                      const response = res.data;
                      if (response.error == 0) {
                        navigation.navigate({
                          name: 'FareNegotiation',
                          params: {
                            rides: item,
                            latitude: latitude,
                            longitude: longitude,
                            userid: uid,
                          },
                        });
                        console.log(res.data.length);
                        setRides(getRidedata(response.data));
                      } else {
                        console.log('error');
                        alert(response.data);
                      }
                    });
                }}>
                <Card style={{width: 280}}>
                  <Text
                    style={{
                      fontSize: 25,
                      marginLeft: 18,
                      marginTop: 20,
                      color: 'black',
                    }}>
                    Driver: {item.firstName} {item.lastName}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      marginLeft: 18,
                      marginTop: 20,
                      color: 'black',
                    }}>
                    Date Leaving: {item.datetime.getUTCDate()}{' '}
                    {months[item.datetime.getUTCMonth()]}{' '}
                    {item.datetime.getUTCFullYear()}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      marginLeft: 18,
                      marginTop: 20,
                      color: 'black',
                    }}>
                    Time Leaving: {item.datetime.getUTCHours()}:
                    {item.datetime.getUTCMinutes().toString().padStart(2, '0')}{' '}
                    {item.datetime.getUTCHours() < 12 ? (
                      <Text>AM</Text>
                    ) : (
                      <Text>PM</Text>
                    )}
                  </Text>
                  {/* {getLocation(rides[item.id - 1])} */}
                  <Card.Content>
                    {/* <Title>Driver Currently in: {item.location}</Title>
                    <Title>Going To {item.to_location}</Title> */}
                    <PickupDestination
                      loc1={item.location}
                      loc2={item.to_location}
                    />
                    <Text>Fare Asked: {item.fareEntered} Rupees</Text>
                    <Text>
                      Car:{' '}
                      {item.Manufacturer + ' ' + item.Model + ' ' + item.Year}
                    </Text>
                    <Text>
                      Number of Seats Available: {item.numberOfPeople}
                    </Text>
                  </Card.Content>
                  {/* <Card.Cover source={{uri: 'https://picsum.photos/700'}} /> */}
                  {/* <Card.Actions>
                    <Button
                      onPress={() => {
                        axios
                          .get(
                            `${server}/rides/checkforrequest/${route.params?.userid}/${item.RideID}`,
                          )
                          .then(res => {
                            // console.log('DID ');
                            const response = res.data;
                            if (response.error == 0) {
                              navigation.navigate({
                                name: 'FareNegotiation',
                                params: {
                                  rides: item,
                                  latitude: latitude,
                                  longitude: longitude,
                                  userid: uid,
                                },
                              });
                              console.log(res.data.length);
                              setRides(getRidedata(response.data));
                            } else {
                              console.log('error');
                              alert(response.data);
                            }
                          });
                      }}>
                      Negotiate Fare
                    </Button>
                    <Button style={{fontSize: '12'}}>Request ride</Button>
                  </Card.Actions> */}
                </Card>
              </TouchableOpacity>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <View
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <Text style={styles.header}>NO RIDES available YET</Text>
        </View>
      )}
    </Background>
  );
};
//  import { View, Text } from 'react-native'
//  import React from 'react'

//  const ListRideRequestsScreen = () => {
//    return (
//      <View>
//        <Text>ListRideRequestsScreen</Text>
//      </View>
//    )
//  }

export default AvailableRidesScreen;
const styles = StyleSheet.create({
  header: {
    fontSize: 21,
    fontWeight: 'bold',
    paddingVertical: 12,
  },
});
