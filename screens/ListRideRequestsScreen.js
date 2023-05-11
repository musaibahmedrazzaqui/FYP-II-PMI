import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  RefreshControl,
  ScrollView,
  BackHandler,
} from 'react-native';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import BackButtonUsing from '../components/BackButtonUsing';
import server from './globals';
import Background from '../components/Background';
import BackButton from '../components/BackButton';
import PickupDestination from '../components/PickupDestination3';
import {useFocusEffect} from '@react-navigation/native';
// import server from './globals';
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
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('DriverHome');
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );
  const fetchData = async () => {
    console.log(route.params?.userid);
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
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      setlatitude(info.coords.latitude);
      setlongitude(info.coords.longitude);
    });
    // console.log('ssssssssss');

    fetchData();
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
  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      {console.log(rides)}
      {rides[0] ? (
        <FlatList
          data={rides}
          keyExtractor={item => item.key.toString()}
          renderItem={({item}) => (
            <View style={{padding: 10}}>
              <TouchableOpacity>
                <Card style={{elevation: 15}}>
                  <Text
                    style={{color: 'black', fontSize: 15, fontStyle: 'italic'}}>
                    Ride ID#:{item.RideID}
                  </Text>
                  <PickupDestination
                    loc1={item.DriverfLocation.toString()
                      .split(' ')
                      .slice(0, 2)
                      .join(' ')}
                    loc2={item.to_location
                      .toString()
                      .split(' ')
                      .slice(0, 2)
                      .join(' ')}
                  />
                  <Text
                    style={{
                      fontSize: 25,
                      marginLeft: 18,
                      marginTop: 5,
                      color: 'black',
                    }}>
                    Passenger Name: {item.firstName} {item.lastName}
                  </Text>

                  {/* {getLocation(rides[item.id - 1])} */}
                  <Card.Content>
                    <Title>Pickup from: {item.location}</Title>
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
                        axios
                          .post(`${server}/rides/accept`, {
                            RideID: item.RideID,
                            PassengerID: item.userid,
                            DriverID: item.DriverUserID,
                            fareDecided: item.userFare,
                          })
                          .then(() => {
                            navigation.navigate({
                              name: 'DriverHome',
                            });
                          })
                          .catch(function (error) {
                            console.log(error);
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
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <View>
          <ScrollView
            contentContainerStyle={{justifyContent: 'center'}}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <Text style={styles.header}>NO RIDE REQUEST YET</Text>
            <Text style={{fontSize: 17}}>Pull to refresh</Text>
          </ScrollView>
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

export default ListRideRequestsScreen;
const styles = StyleSheet.create({
  header: {
    fontSize: 21,
    fontWeight: 'bold',
    paddingVertical: 12,
  },
});
