import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Text} from 'react-native-paper';
import Background from '../components/Background';

import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import axios from 'axios';
// import InstituteData from './helperInstitute';
import {Picker} from '@react-native-picker/picker';
import {theme} from '../core/theme';
import PhoneInput from 'react-native-phone-number-input';
import {emailValidator} from '../helpers/emailValidator';
import {passwordValidator} from '../helpers/passwordValidator';
import {nameValidator} from '../helpers/nameValidator';
import server from './globals';
import {sha256} from 'react-native-sha256';
export default function RegisterScreen({navigation}) {
  const [firstName, setFirstName] = useState({value: '', error: ''});

  const [institute, setInstitute] = useState('');
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
  const [selectedGender, setSelectedGender] = useState('male');

  const handleGenderChange = gender => {
    setSelectedGender(gender);
    setGender({value: gender, error: ''});
  };
  const phoneInput = useRef(null);
  const onSignUpPressed = async () => {
    console.log(institute);
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
    } else if (email.value == '') {
      alert('Email cannot be empty.');
    } else if (hashed.value == '') {
      alert('Password cannot be empty.');
    } else if (formattedphonenumber.value == '') {
      alert('Phone number cannot be empty.');
    } else if (institute == '') {
      alert('Please select institute!');
    } else if (gender.value == '') {
      alert('Please select gender!');
    } else {
      //Encode SHA256

      console.log(hashed.value);
      console.log(institute);
      axios
        .post(`${server}/users/register`, {
          firstName: firstName.value,
          lastName: lastName.value,
          instituteID: institute,
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
            // let insertid = res.data.insertId;
            axios
              .post(`${server}/mailer/send-email`, {
                email: email.value,
              })
              .then(() => {
                console.log('email sent', res.data.insertId);
                let url = `${server}/blockchain/addaddress/${res.data.data.insertId}`;
                console.log(url);
                axios.get(url).then(() => {
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'LoginScreen'}],
                  });
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
  const InstituteData = [
    {
      id: '1',
      title: 'National University of Computer and Emerging Sciences',
    },
    {
      id: '2',
      title: 'Karachi University',
    },
    {
      id: '3',
      title: 'Systems Limited',
    },
    {
      id: '4',
      title: 'NED University',
    },
    {
      id: '5',
      title: 'Sir Syed University',
    },
    {
      id: '6',
      title: 'SZABIST',
    },
    {
      id: '7',
      title: 'Agha Khan University',
    },
    {
      id: '8',
      title: 'Dow University',
    },
    {
      id: '9',
      title: 'Habib University',
    },
    {
      id: '10',
      title: 'IBA',
    },
    {
      id: '11',
      title: 'IOBM',
    },
    {
      id: '12',
      title: 'Indus Valley School of Arts',
    },
    {
      id: '13',
      title: 'DHA suffa University',
    },
    {
      id: '14',
      title: 'Bahria University',
    },
    {
      id: '15',
      title: 'NUST PNEC',
    },
    {
      id: '16',
      title: 'Iqra University',
    },
    {
      id: '17',
      title: 'Ziauddin University',
    },
    {
      id: '18',
      title: 'MAJU',
    },
    {
      id: '19',
      title: '10Pearls',
    },
    {
      id: '20',
      title: 'Folio3',
    },
    {
      id: '21',
      title: 'Astera Software',
    },
    {
      id: '22',
      title: 'ibex pakistan',
    },
    {
      id: '23',
      title: 'FTC',
    },
    {
      id: '24',
      title: 'Contour Software',
    },
    {
      id: '25',
      title: 'bazaar technologies',
    },
    {
      id: '26',
      title: 'Daraz office',
    },
    {
      id: '27',
      title: 'Sofy.ai',
    },
    {
      id: '28',
      title: 'Securiti.ai',
    },
    {
      id: '29',
      title: 'afiniti',
    },
    {
      id: '30',
      title: 'HBL tower',
    },
    {
      id: '31',
      title: 'Meezan Bank Head office',
    },
    {
      id: '32',
      title: 'PSO house',
    },
    {
      id: '33',
      title: 'Dolmen Clifton',
    },
  ];

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
      <View style={{width: 300}}>
        <Picker
          selectedValue={selectedGender}
          onValueChange={handleGenderChange}>
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>
      {console.log(gender.value)}
      <View style={{width: 300}}>
        <Picker
          selectedValue={institute}
          onValueChange={(itemValue, itemIndex) => setInstitute(itemValue)}>
          <Picker.Item label="Select your Institute" value={null} />
          {InstituteData.map(institute => (
            <Picker.Item
              key={institute.id}
              label={`${institute.title}`}
              value={institute.id}
            />
          ))}
          <Picker.Item label="Other" value={0} />
        </Picker>
      </View>
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

      {/* {console.log(institute)} */}
      <Button mode="contained" onPress={onSignUpPressed} style={{marginTop: 0}}>
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
    marginBottom: 25,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  container: {
    // padding: 20,
    height: '90%',
    width: 300,
    // alignSelf: 'center',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
