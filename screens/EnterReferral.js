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
const EnterReferral = () => {
  const [email, setEmail] = useState('');
  const [userEmail, setuseremail] = useState('');
  const [showdata, setShowdata] = useState(null);
  const [referralCode, setReferralCode] = useState('');
  async function fetch() {
    const data = await AsyncStorage.getItem('userdata');
    console.log('data', data);
    setShowdata(await AsyncStorage.getItem('userdata'));
    let url = `${server}/rides/getName/${data}`;
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
    setReferralCode(text);
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
  const handlePress = () => {
    if (userEmail == email) {
      showAlert();
    } else {
      axios
        .post(`${server}/referral/validatecode`, {
          referralCode: referralCode,
          email: userEmail,
        })
        .then(res => {
          let response = res.data.data;
          if (response.length > 0) {
            Alert.alert('Correct!', 'Redirecting you to Home!');
          }
          // console.log('code sent', res);
          console.log('res', res.data.data[0]);
          // navigation.reset({
          //     index: 0,
          //     routes: [{ name: 'LoginScreen' }],
          // });
        })
        .catch(function (error) {
          console.log(error);
        });
      Alert.alert(
        'Email Sent!',
        `Email has been sent to ${email} !`,
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        {cancelable: true},
      );
    }
  };
  return (
    <Background>
      <Header>
        Enter the Referral Code you received to start using PoolMeIn!
      </Header>
      {/* <Text>Enter a valid email to enable the button!</Text> */}
      <TextInput
        label="Enter code"
        value={referralCode}
        onChangeText={handleEmailChange}
      />

      <View style={{width: '75%'}}>
        <Card style={{marginVertical: 5}}>
          <Card.Title
            style={{textAlign: 'center'}}
            title="Your Referral Code"
          />
          <Card.Content>
            <Text
              style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
              {referralCode}
            </Text>
          </Card.Content>
        </Card>
        <Button mode="contained" onPress={handlePress}>
          Validate
        </Button>
      </View>
    </Background>
  );
};

export default EnterReferral;
