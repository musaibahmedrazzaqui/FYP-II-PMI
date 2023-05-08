import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Linking,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
  BackHandler,
  Modal,
} from 'react-native';
import PickupDestination from '../components/PickupDestination3';
import {theme} from '../core/theme';
import BackButton from '../components/BackButton';
import axios from 'axios';
import server from './globals';
import Background from '../components/Background';
import Header from '../components/Header';
import { useFocusEffect } from '@react-navigation/native';
// import Background from '../components/Background';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
// import {ScrollView} from 'react-native-web';
const AllRidesScreen = ({navigation, route}) => {
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
  // const [rides, setRides] = useState([]);
  const [months, setMonths] = useState(monthNames);
  const [isModalopen, setismodalopen] = useState(false);
  const [isModalopencompleted, setismodalopencompleted] = useState(false);
  const [scheduledRideData, setscheduledRideData] = useState([]);
  const [activeRideData, setactiveRideData] = useState([]);
  const [completedRideData, setcompletedRideData] = useState([]);
  const [selectedride, setselectedride] = useState(null);
  const [selectedItem, setSelectedItem] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("DriverHome")
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [])
  );
  const availableRides = [
    {
      id: 1,
      name: 'John Doe',
      fare: 'Honda Civic',
      reg_no: 'AAA-000',
      show: false,
    },
    {
      id: 2,
      name: 'Jane Doe',
      fare: 'Toyota Camry',
      reg_no: 'AAA-001',
      show: false,
    },
    {
      id: 3,
      name: 'Musaib ahmed Razzaqui',
      fare: 'Ford Fusion',
      reg_no: 'AAA-003',
      show: false,
    },
    {
      id: 4,
      name: 'Faizan Mukhtar',
      fare: 'Chevrolet Cruze',
      reg_no: 'AAA-002',
      show: false,
    },
    {
      id: 5,
      name: 'Affan ul Haq',
      fare: 'Suzuki FX',
      reg_no: 'AAA-005',
      show: false,
    },
  ];

  const [activeTab, setActiveTab] = useState(1);

  const handleTabPress = tabNumber => {
    setActiveTab(tabNumber);
  };
  const handleItemPress = item => {
    setIsLoading(true);
    setselectedride(item);
    // setSelectedItem(item);
    console.log('ITEM', item);
    axios
      .get(
        `${server}/rides/driveracceptedrides/${item.DriverUserID}/${item.RideID}`,
      )
      .then(res => {
        const response = res.data;
        if (response.error == 0) {
          console.log('res.data', res.data.data);
          if (res.data.data.length > 0) {
            setSelectedItem(response.data);
            if (activeTab == 1) {
              setismodalopen(true);
            } else if (activeTab == 3) {
              setismodalopencompleted(true);
            }
            setIsLoading(false);
          } else {
            alert('This ride has no passengers');
          }

          // setCount(response.data.length);
          //   console.log(count);
        } else {
          console.log('error');
        }
      });
    // setismodalopen(true);
  };
  const handleItemPressActive = item => {
    setIsLoading(true);
    console.log('ITEM', item);
    navigation.navigate({
      name: 'DriversAcceptedRides',
      params: {
        ride: item,
      },
    });
    // setismodalopen(true);
  };
  const handleActivateRide = ride => {
    try {
      console.log(ride.DriverUserID);
      axios
        .get(
          `${server}/rides/handleActiveRide/${ride.RideID}/${ride.DriverUserID}`,
        )
        .then(res => {
          console.log('RESSSSSSSSSSSS', res.data);
          if (res.data.error == 2) {
            Alert.alert('Oops!', res.data.data, [
              {text: 'OK', onPress: () => null},
            ]);
          } else if (res.data.error == 0) {
            Alert.alert('Hurray!', 'Successfully activated this ride', [
              {
                text: 'OK',
                onPress: () => {
                  fetchDataactive();
                  fetchData();
                  handleTabPress(2);
                },
              },
            ]);
          }
        });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      // setRefreshing(false);
    }
  };
  const parsescheduledridesdate = response => {
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
    setIsLoading(true);
    try {
      // console.log(lat, long);
      const response = await axios.get(
        `${server}/rides/getridesformodal/${route.params.userid}`,
      );
      // console.log(response.data.data);
      setscheduledRideData(parsescheduledridesdate(response.data.data));
      // setRefreshing(false);
      // setPlacename(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      // setRefreshing(false);
    }
  };
  const fetchDataCompleted = async () => {
    setIsLoading(true);
    try {
      // console.log(lat, long);
      const response = await axios.get(
        `${server}/rides/getdriverscompletedrides/${route.params.userid}`,
      );
      console.log(response.data.data);
      // console.log(response.data.data);
      setcompletedRideData(response.data.data);
      // setRefreshing(false);
      // setPlacename(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      // setRefreshing(false);
    }
  };
  const fetchDataactive = async () => {
    setIsLoading(true);
    try {
      // console.log(lat, long);
      const response = await axios.get(
        `${server}/rides/getdriversactiverides/${route.params.userid}`,
      );
      console.log(response.data.data);
      // console.log(response.data.data);
      setactiveRideData(response.data.data);
      // setRefreshing(false);
      // setPlacename(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      // setRefreshing(false);
    }
  };
  useEffect(() => {
    fetchData();
    fetchDataCompleted();
    fetchDataactive();
  }, []);

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <View style={styles.container}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={activeTab === 1 ? styles.activeTabButton : styles.tabButton}
            onPress={() => handleTabPress(1)}>
            <Text
              style={activeTab === 1 ? styles.activeTabText : styles.tabText}>
              Scheduled
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={activeTab === 2 ? styles.activeTabButton : styles.tabButton}
            onPress={() => handleTabPress(2)}>
            <Text
              style={activeTab === 2 ? styles.activeTabText : styles.tabText}>
              Active
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={activeTab === 3 ? styles.activeTabButton : styles.tabButton}
            onPress={() => handleTabPress(3)}>
            <Text
              style={activeTab === 3 ? styles.activeTabText : styles.tabText}>
              Completed
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <ScrollView>
            {activeTab === 1 &&
              scheduledRideData.map((ride, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      marginTop: '7%',
                      backgroundColor: 'lightgrey',
                      borderRadius: 20,
                      elevation: 5,
                      shadowOffset: 5,
                      shadowColor: 'black',
                    }}>
                    <PickupDestination
                      key={index}
                      loc1={ride.location
                        .toString()
                        .split(' ')
                        .slice(0, 2)
                        .join(' ')}
                      loc2={ride.to_location
                        .toString()
                        .split(' ')
                        .slice(0, 2)
                        .join(' ')}
                      onPress={() => {
                        console.log(`${ride.RideID} pressed`);
                        handleItemPress(ride);
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        textAlign: 'center',
                        marginTop: '4%',
                        color: 'black',
                        fontWeight: 'bold',
                      }}>
                      Scheduled Departure
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        textAlign: 'center',
                        marginTop: '1%',
                        marginBottom: '3%',
                        fontFamily: 'Roboto',
                        color: 'black',
                      }}>
                      {ride.datetime.getUTCDate()}{' '}
                      {months[ride.datetime.getUTCMonth()]}{' '}
                      {ride.datetime.getUTCFullYear()}
                      {/* </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        marginLeft: 18,
                        marginTop: '2%',
                        color: 'black',
                      }}> */}{' '}
                      {ride.datetime.getUTCHours()}:
                      {ride.datetime
                        .getUTCMinutes()
                        .toString()
                        .padStart(2, '0')}{' '}
                      {ride.datetime.getUTCHours() < 12 ? (
                        <Text>AM</Text>
                      ) : (
                        <Text>PM</Text>
                      )}
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        textAlign: 'center',
                        marginTop: '1%',
                        marginBottom: '3%',
                        color: 'red',
                        fontWeight: 'bold',
                      }}>
                      Seats Left: {ride.numberOfPeople}
                    </Text>
                    <Button
                      mode="contained"
                      style={{
                        backgroundColor: 'green',
                        marginBottom: '4%',
                      }}
                      onPress={() => handleActivateRide(ride)}>
                      Activate Ride
                    </Button>
                  </View>
                );
              })}
            {activeTab === 2 &&
              activeRideData.map((ride, index) => {
                return (
                  <PickupDestination
                    key={index}
                    loc1={ride.location
                      .toString()
                      .split(' ')
                      .slice(0, 2)
                      .join(' ')}
                    loc2={ride.to_location
                      .toString()
                      .split(' ')
                      .slice(0, 2)
                      .join(' ')}
                    onPress={() => {
                      console.log(`${ride.RideID} pressed`);
                      handleItemPressActive(ride);
                    }}
                  />
                );
              })}
            {activeTab === 3 &&
              completedRideData.map((ride, index) => {
                return (
                  <PickupDestination
                    key={index}
                    loc1={ride.location
                      .toString()
                      .split(' ')
                      .slice(0, 2)
                      .join(' ')}
                    loc2={ride.to_location
                      .toString()
                      .split(' ')
                      .slice(0, 2)
                      .join(' ')}
                    onPress={() => {
                      console.log(`${ride.RideID} pressed`);
                      handleItemPress(ride);
                    }}
                  />
                );
              })}
          </ScrollView>
        </View>
        {isModalopen &&
          (isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <View style={styles.modalContent}>
              {/* {console.log(
            parseFloat(selectedItem?.latitude),
            parseFloat(selectedItem?.longitude),
          )} */}

              <Modal visible={isModalopen} animationType="slide">
                <Button
                  mode="contained"
                  style={{
                    marginLeft: 'auto',
                    backgroundColor: 'red',
                    color: 'white',
                  }}
                  onPress={() => {
                    setismodalopen(false);
                  }}>
                  Close!
                </Button>
                <Text
                  style={{
                    fontSize: 20,
                    color: 'black',
                    fontWeight: 'bold',
                    fontFamily: 'Roboto',
                    textAlign: 'center',
                  }}>
                  Ride ID#: {selectedride.RideID}
                </Text>
                <PickupDestination
                  // key={index}
                  loc1={selectedride.location
                    .toString()
                    .split(' ')
                    .slice(0, 2)
                    .join(' ')}
                  loc2={selectedride.to_location
                    .toString()
                    .split(' ')
                    .slice(0, 2)
                    .join(' ')}
                />
                <ScrollView>
                  {selectedItem.map((selectedItem, index) => {
                    return (
                      <View style={[styles.rideDetails]}>
                        <Card>
                          <Card.Content>
                            <View styles={styles.insidecontent}>
                              <Text
                                style={{
                                  fontSize: 25,
                                  marginLeft: 18,
                                  marginTop: 20,
                                  color: 'black',
                                  fontWeight: 'bold',
                                }}>
                                Passenger Name: {selectedItem.PassengerFName}
                                {selectedItem.PassengerLName}
                              </Text>
                              {/* {getLocation(rides[item.id - 1])} */}

                              <Text
                                style={{
                                  fontSize: 18,
                                  marginLeft: 18,
                                  marginTop: 10,
                                  color: 'black',
                                  fontWeight: 'bold',
                                }}>
                                Fare Decided: {selectedItem.fareDecided} Rupees
                              </Text>
                              <TouchableOpacity
                                onPress={() =>
                                  Linking.openURL(`tel:${selectedItem.Phone}`)
                                }>
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
                                  <Text style={styles.overlayTextTwo}>
                                    Press to Call!
                                  </Text>
                                </View>
                              </TouchableOpacity>
                            </View>
                          </Card.Content>
                        </Card>
                      </View>
                    );
                  })}
                </ScrollView>
              </Modal>
            </View>
          ))}
        {isModalopencompleted &&
          (isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <View style={styles.modalContent}>
              {/* {console.log(
            parseFloat(selectedItem?.latitude),
            parseFloat(selectedItem?.longitude),
          )} */}

              <Modal visible={isModalopencompleted} animationType="slide">
                <Button
                  mode="contained"
                  style={{
                    marginLeft: 'auto',
                    backgroundColor: 'red',
                    color: 'white',
                  }}
                  onPress={() => {
                    setismodalopencompleted(false);
                  }}>
                  Close!
                </Button>
                <Text
                  style={{
                    fontSize: 20,
                    color: 'black',
                    fontWeight: 'bold',
                    fontFamily: 'Roboto',
                    textAlign: 'center',
                  }}>
                  Ride ID#: {selectedride.RideID}
                </Text>
                <PickupDestination
                  // key={index}
                  loc1={selectedride.location
                    .toString()
                    .split(' ')
                    .slice(0, 2)
                    .join(' ')}
                  loc2={selectedride.to_location
                    .toString()
                    .split(' ')
                    .slice(0, 2)
                    .join(' ')}
                />
                <ScrollView>
                  {selectedItem.map((selectedItem, index) => {
                    return (
                      <View style={[styles.rideDetails]}>
                        <Card>
                          <Card.Content>
                            <View styles={styles.insidecontent}>
                              <Text
                                style={{
                                  fontSize: 25,
                                  marginLeft: 18,
                                  marginTop: 2,
                                  color: 'black',
                                  fontWeight: 'bold',
                                }}>
                                Passenger Name: {selectedItem.PassengerFName}
                                {selectedItem.PassengerLName}
                              </Text>
                              {/* {getLocation(rides[item.id - 1])} */}

                              <Text
                                style={{
                                  fontSize: 18,
                                  marginLeft: 18,
                                  marginTop: 10,
                                  color: 'black',
                                  fontWeight: 'bold',
                                }}>
                                Fare Received: {selectedItem.fareDecided} Rupees
                              </Text>
                              <TouchableOpacity
                                onPress={() =>
                                  Linking.openURL(`tel:${selectedItem.Phone}`)
                                }>
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
                                  <Text style={styles.overlayTextTwo}>
                                    Press to Call!
                                  </Text>
                                </View>
                                <Button
                                  mode="contained"
                                  onPress={() => {
                                    navigation.navigate({
                                      name: 'ReceiptScreen',
                                      params: {
                                        ride: selectedItem,
                                      },
                                    });
                                  }}>
                                  Send a Review!
                                </Button>
                              </TouchableOpacity>
                            </View>
                          </Card.Content>
                        </Card>
                      </View>
                    );
                  })}
                </ScrollView>
              </Modal>
            </View>
          ))}
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: '4%',
    marginTop: '5%',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: '5%',
    borderRadius: 20, // <-- add this line to make the button rounded
    marginHorizontal: 5, // <-- add this line to create some space between buttons
  },
  activeTabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    backgroundColor: theme.colors.primary,
    borderRadius: 20, // <-- add this line to make the button rounded
    marginHorizontal: 5, // <-- add this line to create some space between buttons
  },

  tabText: {
    fontSize: 15,
    color: '#333',
  },
  activeTabText: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    width: 300,
    paddingHorizontal: 20,
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
  rideDetails: {
    backgroundColor: 'offwhite',
    marginLeft: '8%',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    width: '85%',
    elevation: 10,
  },
  insidecontent: {
    flex: 1,
    borderRadius: 10,
    borderColor: 'black',
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  modalText: {
    fontSize: 19,
    marginBottom: 20,
  },
});

export default AllRidesScreen;
