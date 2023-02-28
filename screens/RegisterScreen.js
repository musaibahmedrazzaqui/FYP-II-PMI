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
  const phoneInput = useRef(null);
  const onSignUpPressed = () => {
    // const nameError = nameValidator(name.value)
    // const emailError = emailValidator(email.value)
    // const passwordError = passwordValidator(password.value)
    // if (emailError || passwordError || nameError) {
    //   setName({ ...name, error: nameError })
    //   setEmail({ ...email, error: emailError })
    //   setPassword({ ...password, error: passwordError })
    //   return
    // }
    if (firstName.value == '') {
      alert('First Name cannot be empty.');
    } else if (
      /[!@#$%^&*(),.?":{}|<>+-_/|]/g.test(firstName.value) ||
      /\d+/g.test(firstName.value)
    ) {
      alert('First Name cannot have any numbers or special characters.');
    } else if (lastName.value == '') {
      alert('Last Name cannot be empty.');
    } else if (
      /[!@#$%^&*(),.?":{}|<>+-_/|]/g.test(lastName.value) ||
      /\d+/g.test(lastName.value)
    ) {
      alert('Last Name cannot have any numbers or special characters.');
    } else if (gender.value == '') {
      alert('Gender cannot be empty.');
    } else if (
      /[!@#$%^&*(),.?":{}|<>]/g.test(firstName) ||
      /\d+/g.test(firstName)
    ) {
      alert('First Name cannot have any numbers or special characters.');
    } else if (email.value == '') {
      alert('Email cannot be empty.');
    } else if (password.value == '') {
      alert('Password cannot be empty.');
    } else if (formattedphonenumber.value == '') {
      alert('Phone number cannot be empty.');
    } else {
      axios
        .post('https://pmi-backend-production.up.railway.app/users/register', {
          firstName: firstName.value,
          lastName: lastName.value,
          instituteID: 1,
          levelID: 1,
          gender: gender.value,
          emailID: email.value,
          password: password.value,
          profileImageUrl: 's',
          dateJoined: '2022-12-22',
          phone: formattedphonenumber.value,
        })
        .then(() => {
          alert('Sucessfully submitted!');
          navigation.reset({
            index: 0,
            routes: [{name: 'LoginScreen'}],
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
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
        errorText={firstName.error}
      />
      <TextInput
        label="Last Name"
        returnKeyType="next"
        value={lastName.value}
        onChangeText={text => setLastName({value: text, error: ''})}
        error={!!lastName.error}
        errorText={lastName.error}
      />
      <TextInput
        label="Gender"
        returnKeyType="next"
        value={gender.value}
        onChangeText={text => setGender({value: text, error: ''})}
        error={!!lastName.error}
        errorText={lastName.error}
      />
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
        onChangeText={text => setPassword({value: text, error: ''})}
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
