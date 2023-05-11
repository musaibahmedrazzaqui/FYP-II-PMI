import React, {useState, useEffect} from 'react';
import {FlashList} from '@shopify/flash-list';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import tw from 'twrnc';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import server from '../screens/globals';
import Background from './Background';

const data = [
  {
    id: '1',
    title: 'Offer a Ride',
    image: require('../assets/offeraride.png'),
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
    image: require('../assets/activerequests.png'),
    screen: 'AllRidesScreen',
  },
  {
    id: '4',
    title: 'Passenger Created Rides',
    image: require('../assets/passengerrides.png'),
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
    <>
      <View style={{paddingBottom: 13}}>
        <Text style={tw`m-2 font-bold text-8 text-center text-gray-700`}>
          Hi {name}!
        </Text>
        <Text style={tw`text-5 text-center text-gray-500`}>
          Welcome to Driver Mode
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          width: '100%',
          color: '#000000',
          paddingBottom: 10,
        }}>
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
                marginBottom: '5%',
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

export default navOptions;
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
