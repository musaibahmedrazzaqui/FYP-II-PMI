/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import axios from 'axios';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import {theme} from '../core/theme';
import {emailValidator} from '../helpers/emailValidator';
import {passwordValidator} from '../helpers/passwordValidator';
import server from './globals';
import {sha256} from 'react-native-sha256';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [userid, setUid] = useState('');

  const [hashed, setHashed] = useState({value: '', error: ''});

  useEffect(() => {
    async function fetch() {
      const showdata = await AsyncStorage.getItem('userdata');
      console.log('seemytits', showdata);
    }
  }, []);

  async function onLoginPressed() {
    console.log(server);
    console.log(email.value);
    console.log(password.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return;
    }

    console.log(hashed.value);
    axios
      .post(`${server}/users/login`, {
        emailID: email.value,
        password: hashed.value,
      })
      .then( res => {
        console.log(email.value);
        console.log('sdaaaaaaaaaaaaaa', res);
        // setUid(obj[0].userID);
        if (res.data.error === 0) {
          alert('Sucessfully logged in!');
          // console.log(userid);
          console.log('mujhe dekho', res.data.token);
          var uid = res.data.data[0].userID;
          const userdata =  AsyncStorage.setItem(
            'userdata',
            res.data.data[0].userID.toString(),
          );

          navigation.navigate({
            name: 'NewHome',
            params: {
              userid: uid,
            },
          });
        } else if (res.data.error == 4) {
          alert('Email and passwords do not match');
          navigation.reset({
            index: 0,
            routes: [{name: 'LoginScreen'}],
          });
        } else if (res.data.error == 3) {
          alert(
            'Please verify your email by clicking the verification link in your registered email!',
          );
          navigation.reset({
            index: 0,
            routes: [{name: 'LoginScreen'}],
          });
        } else if(res.data.error==5){
          alert("Referral not entered!")
          console.log(res.data.data[0])
           navigation.navigate({
             name: 'EnterReferral',
             params: {
               userid: res.data.data[0].userID,
             },
           });
        } else {
          alert('Email does not exist');
          navigation.reset({
            index: 0,
            routes: [{name: 'LoginScreen'}],
          });
        }
        //
      })
      .catch(function (error) {
        console.log(error);
        // alert(error);
      });
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Welcome back.</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({value: text, error: ''})}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => (
          setPassword({value: text, error: ''}),
          sha256(text).then(hash => {
            setHashed({value: hash, error: ''});
          })
        )}
        autoCapitalize="none"
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}>
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
