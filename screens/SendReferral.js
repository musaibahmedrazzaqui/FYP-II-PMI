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
const SendReferral = () => {
  const [email, setEmail] = useState('');
  const [userEmail, setuseremail] = useState('');
  const [showdata, setShowdata] = useState(null);
  const [referralCode, setReferralCode] = useState('');
  const [codeGenerated, setCodeGenerated] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
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
    setEmail(text);
    setIsValidEmail(validateEmail(text));
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
        .post(`${server}/referral/sendcode`, {
          FromUserID: showdata,
          ToUserEmail: email,
          referralCode: referralCode,
        })
        .then(res => {
          console.log('code sent', res);
          // navigation.reset({
          //     index: 0,
          //     routes: [{ name: 'LoginScreen' }],
          // });
        })
        .catch(function (error) {
          console.log(error);
        });
      axios
        .post(`${server}/mailer/send-email-referral`, {
          FromUserID: showdata,
          ToUserEmail: email,
          referralCode: referralCode,
        })
        .then(res => {
          console.log('email sent', res);
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
  const generateCode = () => {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setReferralCode(code);
    setCodeGenerated(true);
  };

  const validateEmail = email => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  return (
    <Background>
      <Header>Send Referral Code to a valid Email Address</Header>
      <Text>Enter a valid email to enable the button!</Text>
      <TextInput
        label="Enter Email"
        value={email}
        onChangeText={handleEmailChange}
      />
      {codeGenerated ? (
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
          <Button
            mode="contained"
            onPress={handlePress}
            disabled={!isValidEmail}>
            Send
          </Button>
        </View>
      ) : (
        <Button
          mode="contained"
          onPress={generateCode}
          disabled={!isValidEmail}>
          Generate Code
        </Button>
      )}
    </Background>
  );
};

export default SendReferral;
