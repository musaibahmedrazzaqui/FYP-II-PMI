import React, {useState} from 'react';
import {useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import server from './globals';
import Background from '../components/Background';
import BackButton from '../components/BackButton';
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
const ListRideRequestsScreen = ({navigation, route}) => {
  const [rides, setRides] = useState([]);
  const [latitude, setlatitude] = React.useState('0.0');
  const [longitude, setlongitude] = React.useState('0.0');
  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      setlatitude(info.coords.latitude);
      setlongitude(info.coords.longitude);
    });
    // console.log('ssssssssss');
    axios
      .get(`${server}/rides/riderequests/${route.params?.userid}`)
      .then(res => {
        const response = res.data;
        if (response.error == 0) {
          console.log(res.data.data);
          setRides(getRidedata(response.data));
        } else {
          console.log('error');
        }
      });
  }, []);

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      {console.log(rides)}
      <FlatList
        data={rides}
        keyExtractor={item => item.key.toString()}
        renderItem={({item}) => (
          <View style={{padding: 10}}>
            <TouchableOpacity>
              <Card>
                <Text
                  style={{
                    fontSize: 25,
                    marginLeft: 18,
                    marginTop: 20,
                    color: 'black',
                  }}>
                  Passenger Name: {item.firstName} {item.lastName}
                </Text>
                {/* {getLocation(rides[item.id - 1])} */}
                <Card.Content>
                  <Title>Pickup from: {item.location.slice(0, 28)}</Title>
                  <Text
                    style={{
                      fontSize: 18,
                      marginLeft: 0,
                      marginTop: 10,
                      color: 'black',
                    }}>
                    Fare willing to pay: {item.userFare} Rupees
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      marginLeft: 0,
                      marginTop: 10,
                      color: 'black',
                    }}>
                    You requested: {item.driverFare} Rupees
                  </Text>
                </Card.Content>
                {/* <Card.Cover source={{uri: 'https://picsum.photos/700'}} /> */}
                <Card.Actions>
                  <Button
                    onPress={() => {
                      // if (emailError || passwordError) {
                      //   setEmail({ ...email, error: emailError });
                      //   setPassword({ ...password, error: passwordError });
                      //   return;
                      // }
                      // setFrom('true');

                      navigation.navigate({
                        name: 'NavigationScreen',
                        params: {
                          driverfromlatitude: item.dLatitude,
                          driverfromlongitude: item.drLongitude,
                          driverfromlocation: item.DriverfLocation,
                          drivertolatitude: item.to_latitude,
                          drivertolongitude: item.to_longitude,
                          drivertolocation: item.to_location,
                          passengerlatitude: item.latitude,
                          passengerlongitude: item.longitude,
                          passengerlocation: item.location,
                        },
                      });
                    }}>
                    Accept
                  </Button>
                  <Button style={{color: 'red'}}>Reject</Button>
                </Card.Actions>
              </Card>
            </TouchableOpacity>
          </View>
        )}
      />
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

export default ListRideRequestsScreen;
