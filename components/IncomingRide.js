import React, {useState, useEffect} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import tw from 'twrnc';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import server from '../screens/globals';

const data = [
  {
    id: '1',
    title: 'Offer a Ride',
    image: require('../assets/requests.png'),
    screen: 'OfferRideScreen',
  },
  {
    id: '2',
    title: 'Incoming Requests',
    image: require('../assets/requests.png'),
    screen: 'ListRideRequestsScreen',
  },
  {
    id: '3',
    title: 'Active Rides',
    image: require('../assets/requests.png'),
    screen: 'AllRidesScreen',
  },
  {
    id: '4',
    title: 'Passenger Created Rides',
    image: require('../assets/requests.png'),
    screen: 'GetPassengerRides',
  },
];

const navOptions = ({uid}) => {
  const [name, setName] = useState('');
  useEffect(() => {
    let url = `${server}/rides/getName/${uid}`;
    console.log(url);
    axios.get(url).then(res => {
      console.log(res.data.data[0].firstName);
      setName(res.data.data[0].firstName);
    });
  }, []);

  const Navigation = useNavigation();

  return (
    <View>
      <Text style={tw`m-2 font-bold text-8 text-center`}>Hi {name}!</Text>
      <Text style={tw`font-bold text-5 text-center`}>
        Welcome to Driver mode
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
            style={tw`p-3 m-3 rounded-sm shadow-sm `}>
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

export default navOptions;
