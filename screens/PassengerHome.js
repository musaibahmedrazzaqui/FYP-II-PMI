// import {View, Text, StyleSheet} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
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
const PassengerHome = ({navigation, route}) => {
  const Navigation = useNavigation();
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
      Navigation.navigate('StartScreen');
      console.log(`Item ${key} has been removed from AsyncStorage.`);
    } catch (error) {
      console.log(`Error removing item ${key} from AsyncStorage: ${error}`);
    }
  }
  useEffect(() => {
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
    <View style={styles.container}>
      <View style={[styles.logoContainer]}>
        <Text style={[{color: 'darkblue'}, tw`text-2xl font-bold ml-33 mt-2`]}>
          Pool Me In
        </Text>
        <TouchableOpacity
          // style={tw` w-9`}
          style={{
            alignItems: 'flex-end',
            marginRight: 10,
            marginTop: 12,
            height: 25,
            width: 25,
          }}
          onPress={() => {
            loggedout();
          }}>
          <Image
            style={styles.image}
            source={require('../assets/logouticon.png')}></Image>
        </TouchableOpacity>
        {/* <Icon
          name="logout"
          style={tw` w-9`}
          color={'gray'}
          type="material"
          size={35}
          onPress={() => loggedout()}
        /> */}
      </View>
      {showdata && <NavPassenger uid={showdata} />}

      {/* Main content of HomeScreen */}
      {/* ... */}

      {/* Sidebar */}
      {isSidebarOpen == true ? (
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

      {/* Toggle button to open/close Sidebar */}
    </View>
  );
};

export default PassengerHome;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Other styles for the main container of HomeScreen
  },
  image: {
    width: 24,
    height: 24,
  },
  toggleButton: {
    position: 'absolute',
    top: 18,
    right: 340,
    padding: 8,
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    borderRadius: 8,
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
    flex: 0,
    marginTop: 15,
    marginRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
