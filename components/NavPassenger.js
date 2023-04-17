import React, {useState, useEffect} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';
import server from '../screens/globals';
import axios from 'axios';
const data = [
  {
    id: '1',
    title: 'Take a Ride',
    image: require('../assets/get_a_ride.png'),
    screen: 'AvailableRidesScreen',
  },
  {
    id: '2',
    title: 'Create a Ride',
    image: require('../assets/car.png'),
    screen: 'PassengerCreateRide',
  },
  {
    id: '3',
    title: 'Open Live Tracking of Incoming Rides',
    image: require('../assets/booking.png'),
    screen: 'AblyTracking',
  },
];

const NavPassenger = ({uid}) => {
  const Navigation = useNavigation();
  const [name, setName] = useState('');
  useEffect(() => {
    console.log('uidddddddddddddddd', uid);
    let url = `${server}/rides/getName/${uid}`;
    console.log(url);
    axios
      .get(url)
      .then(res => {
        console.log('sdasdsad', res.data.data[0].firstName);
        setName(res.data.data[0].firstName);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <View>
      <Text style={tw`m-2 font-bold text-8 text-center`}>Hi {name}!</Text>
      <Text style={tw`font-bold text-5 text-center`}>
        Welcome to Passenger mode
      </Text>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        vertical
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              Navigation.navigate({
                name: item.screen,
                params: {
                  userid: uid,
                },
              })
            }
            style={tw`p-3 m-3 rounded-sm shadow-sm`}>
            <View>
              <Image
                style={{
                  width: 90,
                  height: 50,
                  resizeMode: 'contain',
                  alignSelf: 'center',
                }}
                source={item.image}
              />
              <Text style={[tw`text-black font-bold py-2 text-center`, '']}>
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default NavPassenger;
