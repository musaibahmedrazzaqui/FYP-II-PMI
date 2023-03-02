import React, {useState, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity, SafeAreaView} from 'react-native';
import {Text} from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import axios from 'axios';
import {theme} from '../core/theme';
import PhoneInput from 'react-native-phone-number-input';
import {emailValidator} from '../helpers/emailValidator';
import {passwordValidator} from '../helpers/passwordValidator';
import {nameValidator} from '../helpers/nameValidator';
import server from './globals';
import {sha256} from 'react-native-sha256';
export default function RegisterScreen({navigation}) {
  const [firstName, setFirstName] = useState({value: '', error: ''});
  const [lastName, setLastName] = useState({value: '', error: ''});
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [gender, setGender] = useState({value: '', error: ''});
  const [formattedphonenumber, setFormattedPhonenumber] = useState({
    value: '',
    error: '',
  });
  const [phonenumber, setPhonenumber] = useState('');
  const [hashed, setHashed] = useState({value: '', error: ''});
  // let hashed = '';
  const phoneInput = useRef(null);
  const onSignUpPressed = async () => {
    if (firstName.value == '') {
      alert('First Name cannot be empty.');
    } else if (
      /[!@#$%^&*(),.?":{}|<>+-/|]/g.test(firstName.value) ||
      /\d+/g.test(firstName.value)
    ) {
      alert('First Name cannot have any numbers or special characters.');
    } else if (lastName.value == '') {
      alert('Last Name cannot be empty.');
    } else if (
      /[!@#$%^&*(),.?":{}|<>+-/|]/g.test(lastName.value) ||
      /\d+/g.test(lastName.value)
    ) {
      alert('Last Name cannot have any numbers or special characters.');
    } else if (gender.value == '') {
      alert('Gender cannot be empty.');
    } else if (/^(male|female)$/g.test(gender.value)) {
      alert('Gender should be Male or Female.');
    } else if (email.value == '') {
      alert('Email cannot be empty.');
    } else if (hashed.value == '') {
      alert('Password cannot be empty.');
    } else if (formattedphonenumber.value == '') {
      alert('Phone number cannot be empty.');
    } else {
      //Encode SHA256

      console.log(hashed.value);
      axios
        .post(`${server}/users/register`, {
          firstName: firstName.value,
          lastName: lastName.value,
          instituteID: 1,
          levelID: 1,
          gender: gender.value,
          emailID: email.value,
          password: hashed.value,
          profileImageUrl: 's',
          dateJoined: '2022-12-22',
          phone: formattedphonenumber.value,
        })
        .then(res => {
          if (res.data.error === 0) {
            alert(
              'Sucessfully submitted! Please check your email to verify your account and complete your sign up process.',
            );
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
          } else if (res.data.error === 2) {
            alert(res.data.data);
          } else {
            alert('INTERNAL ERROR! Please contact support');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const convertSHA = () => {
    //Encode SHA256
    sha256(password.value).then(hash => {
      setHashed({value: hash, error: ''});
    });
    onSignUpPressed();
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="First Name"
        returnKeyType="next"
        value={firstName.value}
        onChangeText={text => setFirstName({value: text, error: ''})}
        error={!!firstName.error}
        autoCapitalize="words"
        errorText={firstName.error}
      />
      <TextInput
        label="Last Name"
        returnKeyType="next"
        value={lastName.value}
        onChangeText={text => setLastName({value: text, error: ''})}
        autoCapitalize="words"
        error={!!lastName.error}
        errorText={lastName.error}
      />
      <TextInput
        label="Gender"
        returnKeyType="next"
        value={gender.value}
        onChangeText={text => setGender({value: text, error: ''})}
        autoCapitalize="words"
        error={!!lastName.error}
        errorText={lastName.error}
      />
      {console.log(gender.value.toUpperCase() != 'MALE')}
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
        returnKeyType="next"
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
      <PhoneInput
        ref={phoneInput}
        defaultValue={phonenumber}
        defaultCode="PK"
        layout="first"
        onChangeText={text => {
          setPhonenumber(text);
        }}
        onChangeFormattedText={text => {
          setFormattedPhonenumber({value: text, error: ''});
        }}
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{marginTop: 24}}>
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
