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

function HomeScreen({navigation, route}) {
  const Navigation = useNavigation();
  const [check, setCheck] = useState(false);
  const [checkone, setCheckone] = useState(false);
  const [userID, setUserID] = useState('');
  const [did, setdId] = useState();
  const isMounted = useRef(false);
  useEffect(() => {
    setUserID(route.params?.userid);
    axios.get(`${server}/driver/${route.params?.userid}`).then(res => {
      console.log('userid', userID);
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
    // };

    // rLkSb2QhQHgNc7ymoBQhFNy7N2Sz4FMD4c();
    // console.log(route.params?.userid);
  }, []);
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
                    userid: userID,
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
              onPress={() => Navigation.navigate('StartScreen')}
            />
          </View>
          {console.log(userID)}
          <NavOptions uid={userID} />
          {checkone === true && <IncomingRide uid={userID} />}
          {/* //Check if driver is registered only then show this component */}

          {check === false && <SecondNavOptions uid={userID} />}

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
