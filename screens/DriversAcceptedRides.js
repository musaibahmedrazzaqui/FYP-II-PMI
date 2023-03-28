import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Linking,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {Text} from 'react-native-paper';
import {theme} from '../core/theme';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import server from './globals';
import Background from '../components/Background';
import BackButton from '../components/BackButton';
import Header from '../components/Header';
import FloatingButton from '../components/FloatingButton';
import FloatingButton2 from '../components/FloatingButton2';
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
const DriversAcceptedRides = ({navigation, route}) => {
  const [rides, setRides] = useState([]);
  const [latitude, setlatitude] = React.useState('0.0');
  const [longitude, setlongitude] = React.useState('0.0');
  const [rid, setRid] = useState();
  const [count, setCount] = useState(0);
  //   const [rid, setRid] = useState();

  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      setlatitude(info.coords.latitude);
      setlongitude(info.coords.longitude);
    });
    console.log('userid', route.params.userid);
    axios.get(`${server}/rides/${route.params?.userid}`).then(res => {
      // console.log('DID', did);
      const rid = res.data.data[0].RideID;
      console.log(res.data.data[0].RideID);
      // console.log(response);
      axios
        .get(
          `${server}/rides/driveracceptedrides/${route.params?.userid}/${rid}`,
        )
        .then(res => {
          const response = res.data;
          if (response.error == 0) {
            console.log('res.data', res.data.data);
            //   setRides(getRidedata(response.data));
            setRides(response.data);
            setCount(response.data.length);
            //   console.log(count);
          } else {
            console.log('error');
          }
        });
    });
  }, []);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [placename, setPlacename] = useState([]);
  const fetchData = async (lat, long) => {
    setIsLoading(true);
    try {
      console.log(lat, long);
      const response = await axios.get(`${server}/landmarks/${lat}/${long}`);
      console.log(response.data.placename);
      setPlacename(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const showModal = (lat, long) => {
    setModalVisible(true);
    fetchData(lat, long);
  };

  return (
    <Background>
      <ScrollView>
        <BackButton goBack={navigation.goBack} />
        <Text style={styles.header}>ACCEPTED REQUESTS ON YOUR RIDE</Text>
        {console.log('rides', rides)}
        {rides[0] && (
          <View
            style={[
              styles.rideDetails,
              rides[0].StatusID === 2 && styles.blurred,
            ]}>
            <TouchableOpacity>
              <Card>
                <Text
                  style={{
                    fontSize: 25,
                    marginLeft: 18,
                    marginTop: 20,
                    color: 'black',
                  }}>
                  Passenger Name: {rides[0].PassengerFName}
                  {rides[0].PassengerLName}
                </Text>
                {/* {getLocation(rides[item.id - 1])} */}
                <Card.Content>
                  <Text
                    style={{
                      fontSize: 18,
                      marginLeft: 0,
                      marginTop: 10,
                      color: 'black',
                    }}>
                    Nearest Landmark:
                  </Text>
                  <TouchableOpacity>
                    <Button
                      style={{
                        marginTop: -30,
                        marginLeft: 135,
                        borderRadius: 5,
                      }}
                      onPress={() =>
                        showModal(rides[0].PassengerLat, rides[0].PassengerLong)
                      }>
                      Show
                    </Button>
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 18,
                      marginLeft: 0,
                      marginTop: 10,
                      color: 'black',
                    }}>
                    Fare Decided: {rides[0].fareDecided} Rupees
                  </Text>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(`tel:${rides[0].Phone}`)}>
                    <View
                      style={{
                        padding: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={require('../assets/dial1.jpg')}
                        style={styles.imagetwo}
                      />
                      <Text style={styles.overlayTextTwo}>Press to Call!</Text>
                    </View>
                  </TouchableOpacity>
                </Card.Content>

                {rides[0].StatusID == 2 ? (
                  <View
                    style={{
                      padding: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={styles.image}
                      source={{
                        uri: 'https://www.freepnglogos.com/uploads/tick-png/tick-paddy-power-hotshot-jackpot-first-goalscorer-predictor-18.png',
                      }}
                    />

                    <Text style={styles.overlayText}>Passenger on Board!</Text>
                    <Button
                      style={{marginTop: -6}}
                      onPress={() => {
                        alert('Generating Receipt!');
                        navigation.navigate({
                          name: 'ReceiptScreen',
                          params: {
                            ride: rides[0],
                          },
                        });
                      }}>
                      Dropped?
                    </Button>
                  </View>
                ) : (
                  <View>
                    {rides[0].StatusID == 3 ? (
                      <View
                        style={{
                          padding: 10,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Image
                          style={styles.imagetwo}
                          source={require('../assets/bluetick.png')}
                        />

                        <Text style={styles.overlayTextThree}>
                          Passenger dropped!
                        </Text>
                      </View>
                    ) : (
                      <Card.Actions>
                        <Button
                          onPress={() => {
                            alert('navigating!');
                            // axios
                            //   .get(`${server}/rides/accept/driveraccept`, {
                            //     RideID: rides[0].RideID,
                            //     PassengerID: rides[0].PassengerID,
                            //     DriverID: rides[0].DriverID,
                            //     fareDecided: rides[0].fareDecided,
                            //   })
                            //   .then(res => {
                            //     console.log(res);
                            //   })
                            //   .catch(function (error) {
                            //     console.log(error);
                            //   });
                            navigation.navigate({
                              name: 'NavigationScreen',
                              params: {
                                puid: rides[0].PassengerID,
                                rid: rides[0].RideID,
                                drivertolatitude: rides[0].DestLat,
                                drivertolongitude: rides[0].DestLong,
                                drivertolocation: rides[0].DestLocation,
                                passengerlatitude: rides[0].PassengerLat,
                                passengerlongitude: rides[0].PassengerLong,
                                passengerlocation: rides[0].PassengerLocation,
                              },
                            });
                          }}>
                          Start Navigation
                        </Button>
                        <Button style={{color: 'red'}}>Reject</Button>
                      </Card.Actions>
                    )}
                  </View>
                )}
              </Card>
            </TouchableOpacity>
          </View>
        )}
        {rides[1] && (
          <View
            style={[
              styles.rideDetails,
              rides[1].StatusID === 2 && styles.blurred,
            ]}>
            <TouchableOpacity>
              <Card>
                <Text
                  style={{
                    fontSize: 25,
                    marginLeft: 18,
                    marginTop: 20,
                    color: 'black',
                  }}>
                  Passenger Name: {rides[1].PassengerFName}
                  {rides[1].PassengerLName}
                </Text>
                {/* {getLocation(rides[item.id - 1])} */}
                <Card.Content>
                  <Text
                    style={{
                      fontSize: 18,
                      marginLeft: 0,
                      marginTop: 10,
                      color: 'black',
                    }}>
                    Nearest Landmark:
                  </Text>
                  <TouchableOpacity>
                    <Button
                      style={{
                        marginTop: -30,
                        marginLeft: 135,
                        borderRadius: 5,
                      }}
                      onPress={() =>
                        showModal(rides[1].PassengerLat, rides[1].PassengerLong)
                      }>
                      Show
                    </Button>
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 18,
                      marginLeft: 0,
                      marginTop: 10,
                      color: 'black',
                    }}>
                    Fare Decided: {rides[1].fareDecided} Rupees
                  </Text>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(`tel:${rides[1].Phone}`)}>
                    <View
                      style={{
                        padding: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={require('../assets/dial1.jpg')}
                        style={styles.imagetwo}
                      />
                      <Text style={styles.overlayTextTwo}>Press to Call!</Text>
                    </View>
                  </TouchableOpacity>
                </Card.Content>

                {rides[1].StatusID == 2 ? (
                  <View
                    style={{
                      padding: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={styles.image}
                      source={{
                        uri: 'https://www.freepnglogos.com/uploads/tick-png/tick-paddy-power-hotshot-jackpot-first-goalscorer-predictor-18.png',
                      }}
                    />

                    <Text style={styles.overlayText}>Passenger on Board!</Text>
                    <Button
                      style={{marginTop: -6}}
                      onPress={() => {
                        alert('Generating Receipt!');
                        navigation.navigate({
                          name: 'ReceiptScreen',
                          params: {
                            ride: rides[1],
                          },
                        });
                      }}>
                      Dropped?
                    </Button>
                  </View>
                ) : (
                  <View>
                    {rides[1].StatusID == 3 ? (
                      <View
                        style={{
                          padding: 10,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Image
                          style={styles.imagetwo}
                          source={require('../assets/bluetick.png')}
                        />

                        <Text style={styles.overlayTextThree}>
                          Passenger dropped!
                        </Text>
                      </View>
                    ) : (
                      <Card.Actions>
                        <Button
                          onPress={() => {
                            alert('navigating!');
                            // axios
                            //   .get(`${server}/rides/accept/driveraccept`, {
                            //     RideID: rides[1].RideID,
                            //     PassengerID: rides[1].PassengerID,
                            //     DriverID: rides[1].DriverID,
                            //     fareDecided: rides[1].fareDecided,
                            //   })
                            //   .then(res => {
                            //     console.log(res);
                            //   })
                            //   .catch(function (error) {
                            //     console.log(error);
                            //   });
                            navigation.navigate({
                              name: 'NavigationScreen',
                              params: {
                                puid: rides[1].PassengerID,
                                rid: rides[1].RideID,
                                drivertolatitude: rides[1].DestLat,
                                drivertolongitude: rides[1].DestLong,
                                drivertolocation: rides[1].DestLocation,
                                passengerlatitude: rides[1].PassengerLat,
                                passengerlongitude: rides[1].PassengerLong,
                                passengerlocation: rides[1].PassengerLocation,
                              },
                            });
                          }}>
                          Start Navigation
                        </Button>
                        <Button style={{color: 'red'}}>Reject</Button>
                      </Card.Actions>
                    )}
                  </View>
                )}
              </Card>
            </TouchableOpacity>
          </View>
        )}
        <View
          style={{
            height: 50,
            width: 10,
            marginTop: 100,
            marginLeft: 50,
          }}>
          <Modal
            visible={modalVisible}
            animationType="slide"
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={styles.modalContent}>
              {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                <>
                  <Text style={styles.modalText}>
                    Nearest Landmark: {placename.placename}
                    {'\n'}
                    {'\n'} Distance (in km): {placename.distance}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={styles.button}>
                    <Text style={styles.text}>Go Previous Screen</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </Modal>
        </View>
      </ScrollView>

      <FloatingButton
        onPress={() =>
          navigation.navigate({
            name: 'NavigationScreen',
            params: {
              puid: 0,
              rid: rides[1].RideID,
              bool: 1,
              drivertolatitude: rides[1].DestLat,
              drivertolongitude: rides[1].DestLong,
              drivertolocation: rides[1].DestLocation,
              passengerlatitude: rides[1].PassengerLat,
              passengerlongitude: rides[1].PassengerLong,
              passengerlocation: rides[1].PassengerLocation,
            },
          })
        }
        title="Picked up everyone?"
        title2="Navigate to destination!"
      />
      <FloatingButton2
        onPress={() =>
          navigation.navigate({
            name: 'DriverEndScreen',
            params: {
              rides: rides,
            },
          })
        }
        title="Want to End ride?"
        title2="Click here!"
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

export default DriversAcceptedRides;
const styles = StyleSheet.create({
  header: {
    fontSize: 21,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 12,
    paddingLeft: 30,
    paddingTop: 40,
    justifyContent: 'center',
  },
  rideDetails: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  blurred: {
    opacity: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'green',
    paddingBottom: 5,
  },
  overlayTextThree: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
    paddingBottom: 5,
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 20,
  },
  overlayTextTwo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    paddingBottom: 5,
  },
  image: {
    width: 20,
    height: 20,
  },
  imagetwo: {
    width: 50,
    height: 50,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 19,
    marginBottom: 20,
  },
});
