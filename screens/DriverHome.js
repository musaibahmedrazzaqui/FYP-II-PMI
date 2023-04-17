// import {View, Text, StyleSheet} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import PickupDestination from '../components/PickupDestination3';
import tw from 'twrnc';
import {Icon} from 'react-native-elements';
import SecondNavOptions from '../components/SecondNavOptions';
import Pickup from '../components/PickupDestination2';
import {Picker} from '@react-native-picker/picker';
import Geolocation from '@react-native-community/geolocation';
import IncomingRide from '../components/IncomingRide';
import NavPassenger from '../components/NavPassenger';
import axios from 'axios';
import server from './globals';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Linking,
  Modal,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from 'react-native';

// import Sidebar from './Sidebar';
import Navbar from '../components/NavBar';
import {SafeAreaView} from 'react-native';

const DriverHome = ({navigation, route}) => {
  const Navigation = useNavigation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [latitude, setlatitude] = React.useState('0.0');
  const [longitude, setlongitude] = React.useState('0.0');
  const [check, setCheck] = useState(false);
  const [rideidx, setrideidx] = useState();
  const [checkone, setCheckone] = useState(false);
  const [userID, setUserID] = useState('');
  const [ridedata, setRideData] = useState([]);
  const [passridedata, setPassRideData] = useState([]);
  const [did, setdId] = useState();
  const [showdata, setShowdata] = useState(null);
  const [location, setLocation] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const isMounted = useRef(false);
  async function fetch() {
    const data = await AsyncStorage.getItem('userdata');
    console.log('data', data);
    setShowdata(await AsyncStorage.getItem('userdata'));
  }
  async function fetchagain() {
    setUserID(route.params?.userid);
    console.log('showData', showdata);
    let url = `${server}/driver/${showdata}`;
    console.log(url);
    let urltwo = `${server}/rides/getuniqueallwithcolumns/${showdata}`;
    axios
      .get(urltwo)
      .then(res => {
        if (res) {
          console.log('status', res.data.data[0].emailID);
          const status = res.data.data[0].status;
          if (status == 1) {
            console.log('statusssssss', res.data.data[0].status);
            setPassRideData(res.data.data);
            showModal();
            alert(
              `${res.data.data[0].firstName} ${res.data.data[0].lastName} accepted your request.`,
            );
          } else if (status == -1) {
            alert(
              `${res.data.data[0].firstName} ${res.data.data[0].lastName} rejected ypur request.`,
            );
          } else {
            alert('No response from user');
          }
        }
        // console.log('OYEHPYE', res.data.data[0]);
      })
      .catch(err => {
        console.log(err);
      });
    // setRefreshing(false);
    axios.get(url).then(res => {
      // console.log('userid', userID);
      const response = res.data.error;

      console.log(response);
      if (response == 0) {
        console.log('driverid' + res.data.data[0].DriverID);
        setdId(res.data.data[0].DriverID);
        let drid = res.data.data[0].DriverID;
        setCheck(true);
        axios.get(`${server}/rides/${drid}`).then(res => {
          console.log('DID ', drid);
          const response = res.data.error;
          if (response == 0) {
            setCheckone(true);
          } else {
            setCheckone(false);
          }
        });
      } else {
        setdId(0);
        setCheck(false);
        setCheckone(false);
      }
    });
  }
  async function loggedout(key) {
    try {
      await AsyncStorage.removeItem('userdata');
      Navigation.navigate('StartScreen');
      console.log(`Item ${key} has been removed from AsyncStorage.`);
    } catch (error) {
      console.log(`Error removing item ${key} from AsyncStorage: ${error}`);
    }
  }
  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      setlatitude(info.coords.latitude);
      setlongitude(info.coords.longitude);
    });

    fetch();
  }, []);

  useEffect(() => {
    if (showdata !== null) {
      getCoordinates(latitude, longitude);
      fetchagain();
    }
  }, [showdata]);
  const handleRefresh = () => {
    setRefreshing(true);
    fetchagain();
    setRefreshing(false);
  };

  const toggleSidebar = () => {
    if (isSidebarOpen) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  };
  const getCoordinates = async (latitude, longitude) => {
    // code to get coordinates by making API calls to mapbox endpoint

    // const req =
    //   'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    //   longitude +
    //   ',' +
    //   latitude +
    //   '.json?bbox=66.747436523,24.639527881,67.473907471,25.111714983&access_token=pk.eyJ1IjoiZmFpemFubXVraHRhcjEiLCJhIjoiY2xjZW5obmpqMzY5ZTN3dDg3NGtpcGZrciJ9.OOU211_NDTEI4g0IL0_Izw';
    const req =
      'https://nominatim.openstreetmap.org/reverse?lat=' +
      latitude +
      '&lon=' +
      longitude +
      '&format=json';

    // console.log('req', req);

    let coord = null;
    let res = null;

    // axios.get
    try {
      // console.log('before axiosos');
      axios.get(req).then(res => {
        const place = res.data;
        console.log('PLACE', place.display_name);
        // console.log('place', place.features[0].place_name);

        setLocation(place.display_name);
      });
      //console.log(await res);
    } catch (e) {
      console.log(e); // eslint-disable-line
    }

    if (res == null) {
      return;
    }

    // setPlace(place.features[0].place_name);
    // coord = {lat: latLng[1], lng: latLng[0]};
    // console.log('coord', coord);
    // console.log('places' + textTwo);
  };
  async function addtoride(passridedata, rid) {
    let url = `${server}/driver/${showdata}`;
    console.log(url);
    axios
      .get(url)
      .then(res => {
        console.log(res.data.data[0].DriverID);
        axios
          .post(`${server}/driver/addtoride`, {
            passridedata: passridedata,
            did: res.data.data[0].DriverID,
            rid: rid,
          })
          .then(() => {
            console.log('buton presed');
            axios
              .post(`${server}/mailer/send-email`, {
                email: email.value,
              })
              .then(() => {
                console.log('email sent');
                navigation.reset({
                  index: 0,
                  routes: [{name: 'LoginScreen'}],
                });
              })
              .catch(function (error) {
                console.log(error);
              });
            navigation.navigate({
              name: 'DriversAcceptedRides',
              params: {
                userid: showdata,
              },
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }
  async function createnew(passridedata, did) {
    let url = `${server}/driver/${showdata}`;
    console.log(url);
    axios
      .get(url)
      .then(res => {
        console.log(res.data.data[0].DriverID);
        axios
          .post(`${server}/driver/createnewridefpass`, {
            passridedata: passridedata,
            did: res.data.data[0].DriverID,
            lat: latitude,
            long: longitude,
            loc: location,
          })
          .then(() => {
            console.log('buton presed');
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async () => {
    setIsLoading(true);
    try {
      // console.log(lat, long);
      const response = await axios.get(
        `${server}/rides/getridesformodal/${showdata}`,
      );
      // console.log(response.data.data);
      setRideData(response.data.data);
      // setRefreshing(false);
      // setPlacename(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      // setRefreshing(false);
    }
  };
  const showModal = () => {
    setModalVisible(true);
    fetchData();
  };
  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }>
      <View style={[styles.logoContainer, tw`mx-2 my-3 pt-1`]}>
        <Text style={tw`text-2xl font-bold ml-33 mt-2`}>Pool Me In</Text>
        <Icon
          name="logout"
          style={tw` w-9`}
          color={'gray'}
          type="material"
          size={35}
          onPress={() => loggedout()}
        />
      </View>
      {checkone === true && <IncomingRide uid={showdata} />}
      {check === false && <SecondNavOptions uid={showdata} />}
      {/* Main content of HomeScreen */}
      {/* ... */}

      {/* Sidebar */}
      {isSidebarOpen == true ? (
        <>
          <Navbar isOpen={isSidebarOpen} onClose={toggleSidebar} />
          <TouchableOpacity
            style={styles.toggleButtonTwo}
            onPress={toggleSidebar}>
            <Image
              style={styles.image}
              source={require('../assets/close-window.png')}></Image>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity style={styles.toggleButton} onPress={toggleSidebar}>
            <Image
              style={styles.image}
              source={require('../assets/sidebar.jpg')}></Image>
          </TouchableOpacity>
        </>
      )}

      <Modal
        // style={{height: '75%'}}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <ScrollView contentContainerStyle={styles.modalContent}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              {/* {console.log('RIDEDATA', passridedata[0])} */}
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: 'bold',
                  marginBottom: 10,
                  marginTop: -50,
                }}>
                Passenger: {passridedata[0]?.firstName}{' '}
                {passridedata[0]?.lastName}
              </Text>
              <Text
                style={{fontSize: 22, fontWeight: 'bold', marginBottom: 10}}>
                Fare: {passridedata[0]?.fare}
              </Text>
              <Pickup
                loc1={passridedata[0]?.pickup
                  .toString()
                  .split(' ')
                  .slice(0, 6)
                  .join(' ')}
                loc2={passridedata[0]?.destination
                  .toString()
                  .split(' ')
                  .slice(0, 6)
                  .join(' ')}
              />

              <Text
                style={{
                  fontFamily: 'Roboto',
                  fontWeight: 'bold',
                  fontSize: 17,
                  textAlign: 'center',
                  marginTop: 15,
                }}>
                Here are your active rides. {'\n'} Tap on any one of them to add
                this passenger to that ride, or create a new one if you cant
                find a relevant active ride:
              </Text>
              {ridedata.map(ride => (
                <PickupDestination
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
                    addtoride(passridedata, ride.RideID);
                  }}
                />
              ))}
              <TouchableOpacity
                onPress={() => {
                  createnew(passridedata);
                }}
                style={styles.buttonblue}>
                <Text style={{color: 'black', fontSize: 20}}>
                  Create New Ride
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.button}>
                <Text style={styles.text}>Close</Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </Modal>
    </ScrollView>
  );
};

export default DriverHome;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Other styles for the main container of HomeScreen
  },
  image: {
    width: 24,
    height: 24,
  },
  button: {
    position: 'absolute',
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 20,
    top: 0,
    bottom: 650,
    right: 10,
    left: 300,
  },
  buttonblue: {
    paddingVertical: 26,
    paddingHorizontal: 106,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // backgroundColor: 'lightgrey',

    borderRadius: 5,
    marginVertical: 20,
    marginBottom: -10,
  },

  text: {
    color: '#fff',
    fontSize: 16,
  },
  toggleButton: {
    position: 'absolute',
    top: 18,
    right: 350,
    padding: 8,
    backgroundColor: 'transparent',
    borderRadius: 8,
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
  toggleButtonTwo: {
    position: 'absolute',
    top: 18,
    right: 100,
    padding: 8,
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
