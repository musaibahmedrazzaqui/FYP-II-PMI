// import {View, Text, StyleSheet} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header';
import tw from 'twrnc';
import {Icon} from 'react-native-elements';
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
  Dimensions,
  TouchableWithoutFeedback,
  Animated,
  Easing,
} from 'react-native';
// import Sidebar from './Sidebar';
import Navbar from '../components/NavBar';
import {SafeAreaView} from 'react-native';
const {width, height} = Dimensions.get('window');
const PassengerHome = ({navigation, route}) => {
  const Navigation = useNavigation();
  // const { width, height } = Dimensions.get("window");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [check, setCheck] = useState(false);
  const [checkone, setCheckone] = useState(false);
  const [userID, setUserID] = useState('');
  const [did, setdId] = useState();
  const [showdata, setShowdata] = useState(null);
  const isMounted = useRef(false);
  async function fetch() {
    const data = await AsyncStorage.getItem('userdata');
    console.log('data', data);
    setShowdata(await AsyncStorage.getItem('userdata'));
  }
  async function loggedout(key) {
    try {
      await AsyncStorage.removeItem('userdata');

      console.log(`Item ${key} has been removed from AsyncStorage.`);
      navigation.replace('StartScreen');
    } catch (error) {
      console.log(`Error removing item ${key} from AsyncStorage: ${error}`);
    }
  }
  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log('positionnnnnnnn', position);
        setlatitude(latitude);
        setlongitude(longitude);

        // fetchData();
        // do something with latitude and longitude
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 2000, maximumAge: 1000},
    );
    fetch();
  }, []);

  useEffect(() => {
    if (showdata !== null) {
      setUserID(route.params?.userid);
      console.log('showData', showdata);
      let url = `${server}/driver/${showdata}`;
      console.log(url);
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
  }, [showdata]);

  const toggleSidebar = () => {
    if (isSidebarOpen) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  };

  return (
    <View>
      <View style={[styles.logoContainer]}>
        <TouchableOpacity
          onPress={toggleSidebar}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            style={styles.image}
            source={require('../assets/sidebar.jpg')}
          />
        </TouchableOpacity>

        <Text
          style={{
            color: 'darkblue',
            fontSize: 25,
            fontWeight: 'bold',
            marginLeft: 'auto',
          }}>
          Pool Me In
        </Text>
        <TouchableOpacity
          onPress={() => loggedout()}
          style={{marginLeft: 'auto'}}>
          <Image
            style={styles.image}
            source={require('../assets/logouticon.png')}
          />
        </TouchableOpacity>
      </View>
      {showdata && (
        <NavPassenger
          uid={showdata}
          latitude={latitude}
          longitude={longitude}
        />
      )}

      {/* Main content of HomeScreen */}
      {/* ... */}

      {/* Sidebar */}

      {isSidebarOpen == true && (
        <>
          <Navbar
            uid={showdata}
            isOpen={isSidebarOpen}
            onClose={toggleSidebar}
          />
          <TouchableOpacity
            style={styles.toggleButtonTwo}
            onPress={toggleSidebar}>
            <Image
              style={styles.image}
              source={require('../assets/close-window.png')}
            />
          </TouchableOpacity>
        </>
      )}

      {/* Toggle button to open/close Sidebar */}
    </View>
  );
};

export default PassengerHome;
const styles = StyleSheet.create({
  container: {
    // Other styles for the main container of HomeScreen
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.06,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  toggleButtonTwo: {
    position: 'absolute',
    marginLeft: '70%',
    alignSelf: 'flex-start',
  },
  image: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
});
