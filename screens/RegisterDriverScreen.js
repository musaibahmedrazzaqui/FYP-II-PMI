import React, {useState} from 'react';
import {useEffect} from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {fieldValidator} from '../helpers/fieldValidator';
import UUIDGenerator from 'react-native-uuid-generator';
import Background from '../components/Background';
import server from './globals';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import {theme} from '../core/theme';
import axios from 'axios';

export default function FoodScreen({navigation, route}) {
  const [email, setEmail] = useState({value: '', error: ''});
  const [uid, setUid] = useState();
  const [cnic, setCnic] = useState({value: '', error: ''});
  const [license, setLicense] = useState({value: '', error: ''});
  const [driverid, setDriverid] = useState('');
  console.log(route.params.userid);
  useEffect(() => {
    UUIDGenerator.getRandomUUID().then(uuid => {
      setDriverid(uuid);
    });
    if (route.params?.userid) {
      setUid(route.params.userid);
    } else {
      setUid(0);
    }
  }, []);
  const onSavePressed = () => {
    //Validate email Id through call at users table
    //Driver ID == CNIC + email
    // let uuid = "";
    console.log(uid);
    const fieldError = fieldValidator(cnic.value);
    const fieldError2 = fieldValidator(license.value);
    if (fieldError || fieldError2) {
      setCnic({...cnic, error: fieldError});
      setLicense({...license, error: fieldError2});
      return;
    }
    axios
      .post(`${server}/driver/register`, {
        DriverID: driverid,
        DriverUserID: uid,
        CNIC: cnic.value,
        LicenseNumber: license.value,
      })
      .then(() => {
        alert('Sucessfully registered!');
        navigation.navigate({
          name: 'RegisterVehicleScreen',
          params: {
            userid: uid,
          },
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    alert('Thankyou for registering as a Driver!');
    console.log(driverid, uid, cnic.value, license.value);
    navigation.reset({
      index: 0,
      routes: [{name: 'DriverHome'}],
    });
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      {/* <Logo /> */}
      <Header>Register As a Driver </Header>

      <TextInput
        label="Enter registered email ID"
        // returnKeyType="done"
        value={email.value}
        onChangeText={text => setEmail({value: text, error: ''})}
        returnKeyType="next"
        // value={email.value}
        // onChangeText={text => setEmail({value: text, error: ''})}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Enter CNIC Number"
        returnKeyType="next"
        value={cnic.value}
        onChangeText={text => setCnic({value: text, error: ''})}
        error={!!cnic.error}
        errorText={cnic.error}
      />
      <TextInput
        label="Enter License Number"
        returnKeyType="done"
        value={license.value}
        onChangeText={text => setLicense({value: text, error: ''})}
        error={!!license.error}
        errorText={license.error}
      />

      <Button mode="contained" onPress={onSavePressed}>
        Save
      </Button>
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
  description: {
    fontSize: 13,
    color: theme.colors.secondary,
    paddingTop: 8,
    paddingBottom: 8,
  },
  container_touchable: {
    borderWidth: 1,
    width: 290,
    borderLeftColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description_two: {
    fontSize: 16,
    color: theme.colors.secondary,
    paddingTop: 8,
    paddingBottom: 8,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
