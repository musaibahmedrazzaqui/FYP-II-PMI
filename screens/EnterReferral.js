import {View, Text, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import server from './globals';
// import {Alert} from 'react-native-paper';
import axios from 'axios';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import {Card} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
const EnterReferral = ({navigation, route}) => {
  const [email, setEmail] = useState('');
  const [userEmail, setuseremail] = useState('');
  const [showdata, setShowdata] = useState(null);
  const [referralCode, setReferralCode] = useState('');
  const [codeGenerated, setCodeGenerated] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  async function fetch() {
    const data = await AsyncStorage.getItem('userdata');
    console.log('data', data);
    console.log('uid', route.params.userid);
    setShowdata(await AsyncStorage.getItem('userdata'));
    let url = `${server}/rides/getName/${route.params.userid}`;
    console.log(url);
    axios.get(url).then(res => {
      //    console.log(res.data.data[0].firstName);
      setuseremail(res.data.data[0].emailID);
    });
  }
  useEffect(() => {
    fetch();
  }, []);

  const handleEmailChange = text => {
    setEmail(text);
    // setIsValidEmail(validateEmail(text));
  };
  const showAlert = () => {
    Alert.alert(
      'Uhoh! Error found',
      'Please enter a different email than your own!',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
        },
      ],
      {cancelable: false},
    );
  };

  const generateCode = () => {
    console.log(userEmail);
    axios
      .post(`${server}/referral/validatecode`, {
        ToUserEmail: userEmail,
        referralCode: email,
      })
      .then(res => {
        if (res.data.error == 0) {
          console.log(res.data.data[0]);
          axios
            .post(`${server}/blockchain/pushcode`, {
              FromUserID: res.data.data[0].FromUserID,
              ToUserEmail: userEmail,
              referralCode: email,
            })
            .then(res => {
              if (res) {
                axios
                  .get(`${server}/rides/referral-entered/${userEmail}`)
                  .then(res => {
                    console.log('RES', res);

                    alert(
                      'Referral code entered Sucessfully. Redirecting you to login page!',
                    );
                    navigation.navigate({name: 'LoginScreen'});
                  });
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          alert(
            "You don't have a valid referral code! \n Every user needs a referral to use our app. Please ask your friends and fanily to send you a 8-digit code on your registered email address",
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Background>
      <Header>Enter Referral Code.</Header>
      <TextInput
        label="Enter Code"
        value={email}
        onChangeText={handleEmailChange}
      />
      {email.length === 8 ? (
        <Button mode="contained" onPress={generateCode}>
          {console.log('it is i ', email)}
          Enter!
        </Button>
      ) : (
        <Button
          mode="contained"
          onPress={generateCode}
          disabled={!isValidEmail}>
          Enter!
          {console.log(email)}
        </Button>
      )}
    </Background>
  );
};

export default EnterReferral;
