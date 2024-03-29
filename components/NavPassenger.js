import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';
import server from '../screens/globals';
import axios from 'axios';
import Background from './Background';
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
    image: require('../assets/livetracking.png'),
    screen: 'AblyTracking',
  },
  {
    id: '4',
    title: 'View Ride Requests',
    image: require('../assets/booking.png'),
    screen: 'ListPassengerRides',
  },
];

const NavPassenger = ({uid, latitude, longitude}) => {
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
    <>
      <View style={{paddingBottom: 13}}>
        <Text style={tw`m-2 font-bold text-8 text-center text-gray-700`}>
          Hi {name}!
        </Text>
        <Text style={tw`text-5 text-center text-gray-500`}>
          Welcome to Passenger Mode
        </Text>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          vertical
          renderItem={({item}) => (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '7%',
              }}>
              <TouchableOpacity
                sytle={[styles.item]}
                onPress={() =>
                  Navigation.navigate({
                    name: item.screen,
                    params: {
                      userid: uid,
                    },
                  })
                }
                style={[
                  tw`p-3 rounded-lg bg-gray-200`,
                  {width: 270, height: 100, alignItems: 'center'},
                ]}>
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
                  <Text style={[tw`text-black font-bold py-2 text-center`]}>
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </>
  );
};

export default NavPassenger;
const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingRight: 200,
    alignItems: 'center',
    flexGrow: 1,
    backgroundColor: '#000000',
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  name: {fontSize: 17},
  phoneNumber: {
    opacity: 0.6,
    fontSize: 14,
    paddingVertical: 5,
  },

  floatingActionButton: {
    backgroundColor: 'red',
    width: 55,
    height: 55,
    position: 'absolute',
    bottom: 45,
    right: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButton: {
    flexGrow: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
  },

  actionText: {
    textAlign: 'center',
    maxWidth: '70@s',
    paddingTop: '5@s',
    fontSize: '14@s',
    color: '#ffffff',
  },
  actionTextStyle: {
    padding: '40@s',
  },
});
