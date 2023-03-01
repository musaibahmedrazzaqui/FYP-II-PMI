import React, {useState, useCallback} from 'react';
import {useEffect} from 'react';
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
const AvailableRidesScreen = ({navigation, route}) => {
  const [rides, setRides] = useState([]);
  const [show, setShow] = useState(false);
  const [uid, setUid] = useState(route.params?.userid);
  const [did, setdId] = useState();
  const [latitude, setlatitude] = React.useState('0.0');
  const [longitude, setlongitude] = React.useState('0.0');
  const updateState = useCallback(async () => {
    axios
      .get(`${server}/rides/checkifleft/${route.params?.userid}`)
      .then(res => {
        const response = res.data;
        if (response.error === 0) {
          console.log(res.data.data);
          alert('Driver coming to your location!');
          navigation.reset({
            index: 0,
            routes: [{name: 'AblyTracking'}],
          });
        } else {
          console.log('not found');
        }
      });
  }, []);
  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      setlatitude(info.coords.latitude);
      setlongitude(info.coords.longitude);
    });
    console.log('ssssssssss');
    axios.get(`${server}/rides/getrides/${route.params?.userid}`).then(res => {
      console.log('DID ');
      const response = res.data;
      if (response.error == 0) {
        console.log(res.data.length);
        setRides(getRidedata(response.data));
      } else {
        console.log('error');
      }
    });
    setInterval(updateState, 3000);
  }, [updateState]);
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
                  {item.name}
                </Text>
                {/* {getLocation(rides[item.id - 1])} */}
                <Card.Content>
                  <Title>Pickup from {item.location.slice(0, 30)}</Title>
                  <Title>Going To {item.to_location.slice(0, 30)}</Title>
                  <Text>Fare willing to pay {item.fareEntered} Rupees</Text>
                  <Text>
                    Car Taking:{' '}
                    {item.Manufacturer + ' ' + item.Model + ' ' + item.Year}
                  </Text>
                  <Text></Text>
                  <Text>Number of Passengers: {item.numberOfPeople}</Text>
                </Card.Content>
                {/* <Card.Cover source={{uri: 'https://picsum.photos/700'}} /> */}
                <Card.Actions>
                  <Button
                    onPress={() => {
                      navigation.navigate({
                        name: 'FareNegotiation',
                        params: {
                          rides: item,
                          latitude: latitude,
                          longitude: longitude,
                          userid: uid,
                        },
                      });
                    }}>
                    Negotiate Fare
                  </Button>
                  <Button style={{fontSize: '12'}}>Request ride</Button>
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

export default AvailableRidesScreen;
