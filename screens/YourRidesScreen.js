import React, {useState, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {theme} from '../core/theme';
import {useEffect} from 'react';
import FareButton from '../components/FareButton';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import Geolocation from '@react-native-community/geolocation';
import Background from '../components/Background';
import BackButton from '../components/BackButton';
import RNRestart from 'react-native-restart';
import server from './globals';
import axios from 'axios';
// import FareNegotiation from './FareNegotiation';
const getRidedata = response => {
  console.log('hereeee', response);
  let rData = response;
  // console.log('Car data', carData);
  const keys = Object.keys(rData);
  console.log('Keys', keys);
  return keys.map(key => {
    let rideData = rData[key];
    // console.log(caData);
    return {key: key, ...rideData};
  });
};
const YourRidesScreen = ({navigation, route}) => {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    console.log(route.params.userID);
    axios
      .get(`${server}/rides/checkifleft/${route.params?.userID}`)
      .then(res => {
        const response = res.data;
        if (response.error == 0) {
          //   console.log(response);
          //   console.log(res.data.data);
          setRides(getRidedata(response.data));
          // alert('Driver coming to your location!');
        } else {
          console.log('not found');
        }
      });
    // setInterval(updateState, 3000);
  }, []);

  return (
    <Background>
      {/* <Logo /> */}
      <Text style={styles.header}>Let's Start Your Ride!</Text>
      <Paragraph>Your Rides are here</Paragraph>
      <Card>
        <Text
          style={{
            fontSize: 25,
            marginLeft: 18,
            marginTop: 20,
            color: 'black',
          }}>
          Driver: {route.params.rides.firstName} {route.params.rides.lastName}
        </Text>
        {/* {getLocation(rides[item.id - 1])} */}
        <Card.Content>
          <Title>Going to {route.params.rides.to_location.slice(0, 28)}</Title>
          <Text>Fare Decided {route.params.userFare} Rupees</Text>
          {/* <TextInput
            label="Enter your fare & wait for driver to accept request"
            returnKeyType="done"
            value={fare.value}
            onChangeText={text => setFare({value: text, error: ''})}
          /> */}
          {/* <Text style={styles.description}>Choose your fare:</Text> */}
        </Card.Content>
        {/* <Card.Cover source={{uri: 'https://picsum.photos/700'}} /> */}
        <Card.Actions>
          <Button
            onPress={() => {
              axios
                .get(`${server}/rides/checkifleft/${route.params?.userID}`)
                .then(res => {
                  console.log('HI');
                  const response = res.data;
                  if (response.error == 0) {
                    console.log(response);
                    //   console.log(res.data.data);
                    // setRides(getRidedata(response.data));
                    alert('Driver coming to your location!');
                    navigation.navigate({
                      name: 'AblyTracking',
                      params: {
                        rides: route.params.rides,
                        //   userFare: count,
                        fareDecided: route.params.userFare,
                        userid: route.params.userID,
                      },
                    });
                  } else {
                    console.log('not found');
                    alert("Driver hasn't accepted your ride yet");
                  }
                });
            }}>
            Track Ride
          </Button>
          <Button style={{color: 'red'}}>Cancel Request</Button>
        </Card.Actions>
      </Card>
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

export default YourRidesScreen;
const styles = StyleSheet.create({
  header: {
    fontSize: 21,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingTop: 460,
    paddingVertical: 12,
  },
});
