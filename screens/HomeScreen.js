import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import tw from 'twrnc';
import server from './globals';

import NavOptions from '../components/NavOptions';
import SecondNavOptions from '../components/SecondNavOptions';
import IncomingRide from '../components/IncomingRide';
import {Icon} from 'react-native-elements';

import ReferOptions from '../components/ReferOptions';

import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen({navigation, route}) {
  const Navigation = useNavigation();
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
  return (
    <ScrollView>
      <SafeAreaView style={tw`bg-white h-full`}>
        <View style={tw`p-5`}>
          <View style={[styles.logoContainer, tw`mx-2 my-3 pt-1`]}>
            <Icon
              name="account-circle"
              style={tw` w-3`}
              color={'gray'}
              type="material"
              size={35}
              onPress={() =>
                navigation.navigate({
                  name: 'SettingsScreen',
                  params: {
                    userid: showdata,
                  },
                })
              }
            />
            <Text style={tw`text-2xl font-bold`}>Pool Me In</Text>
            <Icon
              name="logout"
              style={tw` w-9`}
              color={'gray'}
              type="material"
              size={35}
              onPress={() => loggedout()}
            />
          </View>
          {console.log(showdata)}
          <NavOptions uid={showdata} />
          {checkone === true && <IncomingRide uid={showdata} />}
          {/* //Check if driver is registered only then show this component */}

          {check === false && <SecondNavOptions uid={showdata} />}

          <ReferOptions />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  logoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
