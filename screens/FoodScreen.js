import React, {useState, useEffect} from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {fieldValidator} from '../helpers/fieldValidator';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import FareButton from '../components/FareButton';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import {theme} from '../core/theme';
import server from './globals';
import axios from 'axios';
// import { Dropdown } from "react-native-material-dropdown";
import {Picker} from '@react-native-picker/picker';
import {SelectList} from 'react-native-dropdown-select-list';
const getCardata = response => {
  // console.log('hereeee', response.data);
  let carData = response.data;
  // console.log('Car data', carData);
  const keys = Object.keys(carData);
  console.log('Keys', keys);
  return keys.map(key => {
    let caData = carData[key];
    // console.log(caData);
    return {key: key, ...caData};
  });
};
export default function FoodScreen({navigation, route}) {
  const [from, setFrom] = useState('true');
  const [did, setdId] = useState();
  const [to, setTo] = useState({value: '', error: ''});
  const [seats, setSeats] = useState({value: '', error: ''});
  const [fare, setFare] = useState({value: 100, error: ''});
  const [count, setCount] = useState(100);
  const [vehicle, setVehicle] = useState({value: '', error: ''});
  const [selected, setSelected] = React.useState('');
  const [uid, setUid] = useState(route.params?.userid);
  const [cars, setCars] = useState([]);
  const [fromlatitude, setfLatitude] = useState(route.params?.fromlatitude);
  const [fromlongitude, setfLongitude] = useState(route.params?.fromlongitude);
  const [tolatitude, settLatitude] = useState(route.params?.tolatitude);
  const [tolongitude, settLongitude] = useState(route.params?.tolongitude);
  // const {navigate} = this.props.navigation;

  useEffect(() => {
    axios.get(`${server}/driver/${uid}`).then(res => {
      const response = res.data;
      // console.log(response.data[0].DriverID);
      setdId(response.data[0].DriverID);
    });
    axios.get(`${server}/vehicle/getvehicles/${uid}`).then(res => {
      const response = res.data;
      // console.log(res.data);
      setCars(response.data);
      //  setdId(response.data[0].DriverID);
    });
    console.log('FROM' + fromlatitude + '   ' + fromlongitude);

    console.log('TO' + tolatitude + '   ' + tolongitude);
    // console.log(route.params?.userid);
  }, []);
  const incrementCount = () => {
    // Update state with incremented value
    setCount(count + 50);
  };
  const decrementCount = () => {
    setCount(count - 50);
  };

  const onFromPressed = () => {
    navigation.navigate({
      name: 'FromScreen',
      params: {
        userid: uid,
      },
    });
  };
  const onToPressed = () => {
    navigation.navigate({
      name: 'ToScreen',
      params: {
        userid: uid,
      },
    });
  };
  const onLoginPressed = () => {
    // if (emailError || passwordError) {
    //   setEmail({ ...email, error: emailError });
    //   setPassword({ ...password, error: passwordError });
    //   return;
    // }
    console.log(cars);
    console.log('FROM' + fromlatitude + '   ' + fromlongitude);

    console.log('TO' + tolatitude + '   ' + tolongitude);
    const fieldError = fieldValidator(fare.value);
    const fieldError2 = fieldValidator(seats.value);
    if (fieldError || fieldError2) {
      setFare({...fare, error: fieldError});
      setSeats({...seats, error: fieldError2});
      return;
    }
    axios
      .post(`${server}/rides/addnew`, {
        DriverID: did,
        numberOfPeople: seats.value,
        fareEntered: count,
        vehicleID: vehicle.value,
      })
      .then(() => {
        alert('Sucessfully registered!');
        console.log(
          'did',
          did,
          'seats',
          seats.value,
          'fare',
          fare.value,
          'vehcile',
          vehicle.value,
        );
        navigation.navigate({
          name: 'HomeScreen',
          params: {
            userid: uid,
          },
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    alert('Thankyou for registering as a Driver!');
    axios.get(`${server}/rides/${did}`).then(res => {
      console.log('DID', did);
      const response = res.data.error;
      if (response == 0) {
        setFrom('true');
        navigation.navigate({
          name: 'HomeScreen',
          params: {post: from},
        });
      } else {
        navigation.navigate({
          name: 'HomeScreen',
        });
      }
    });
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      {/* <Logo /> */}
      <Header>Where are you travelling to?</Header>
      <TouchableOpacity onPress={onFromPressed}>
        <View style={styles.container_touchable} margin="2%">
          <Text style={styles.description_two}>From where?</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onToPressed}>
        <View style={styles.container_touchable} margin="5%">
          <Text style={styles.description_two}>To where?</Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.description}>Which vehicle will you take today?</Text>
      {/* {getVehicleInfo()} */}

      <Text style={styles.description}>Registered Vehicles:</Text>
      {cars.map(user => (
        <View key={user.vehicleID}>
          <TouchableOpacity
            onPress={() => setVehicle({value: user.vehicleID, error: ''})}>
            <Text>{user.Manufacturer + ' ' + user.Model}</Text>
          </TouchableOpacity>
          {/* <Text>{user.Manufactuer}</Text> */}
        </View>
      ))}
      {/* <TextInput
        label="Enter Vehicle (one of shown above)"
        returnKeyType="done"
        value={vehicle.value}
        onChangeText={text => setVehicle({value: text, error: ''})}
        error={!!vehicle.error}
        errorText={vehicle.error}
      /> */}
      <Text style={styles.description}>Choose your fare:</Text>
      <FareButton onPress={incrementCount}>+</FareButton>
      <Text>{count}</Text>
      <FareButton onPress={decrementCount}>-</FareButton>
      <TextInput
        label="Number of maximum passengers"
        returnKeyType="done"
        value={seats.value}
        onChangeText={text => setSeats({value: text, error: ''})}
        error={!!seats.error}
        errorText={seats.error}
      />
      <Button mode="contained" onPress={onLoginPressed}>
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
