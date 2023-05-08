import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
  Image,
  BackHandler
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Text} from 'react-native-paper';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import { useFocusEffect } from '@react-navigation/native';
import DirectionsDisplay from '../components/DirectionsDisplay';
import Geolocation from '@react-native-community/geolocation';
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
import {Picker} from '@react-native-picker/picker';
// import { Dropdown } from "react-native-material-dropdown";

const GOOGLE_MAPS_API_KEY = 'AIzaSyAhpqm1hIWBkVzKvf7uyqCmYNRxwQwbZzo';
export default function OfferRideScreen({navigation, route}) {
  // const now = new Date();
  // const timezoneOffset = 5 * 60 * 60 * 1000; // 5 hours ahead of UTC
  // const karachiTime = new Date(now.getTime() + timezoneOffset).toISOString();
  // console.log('karachitime', karachiTime);

  const [from, setFrom] = useState('true');
  const [did, setdId] = useState(0);
  const [to, setTo] = useState({value: '', error: ''});
  const [seatingCapacity, setSeatingCapacity] = useState(1);
  const [seats, setSeats] = useState({value: 'null', error: ''});
  const [fare, setFare] = useState({value: 100, error: ''});
  const [count, setCount] = useState(100);
  const [vehicle, setVehicle] = useState({value: 0, error: ''});
  const [selected, setSelected] = React.useState('');
  const [uid, setUid] = useState(route.params?.userid);
  const [cars, setCars] = useState([]);

  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [fromLatitude, setFromLatitude] = useState(0);
  const [fromLongitude, setFromLongitude] = useState(0);
  const [toLatitude, setToLatitude] = useState(0);
  const [toLongitude, setToLongitude] = useState(0);
  const [shouldRenderComponent, setShouldRenderComponent] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  // const {navigate} = this.props.navigation;

  useEffect(() => {
    axios.get(`${server}/driver/${uid}`).then(res => {
      const response = res.data;
      if (response.error == 0) {
        console.log(response.data[0].DriverID);
        setdId(response.data[0].DriverID);
      } else {
        setdId(0);
      }
      // console.log(response.data[0].DriverID);
      console.log('DID', did);
    });
    axios.get(`${server}/vehicle/getvehicles/${uid}`).then(res => {
      const response = res.data;
      // console.log(res.data);
      setCars(response.data);
      //  setdId(response.data[0].DriverID);
    });
    // console.log(route.params?.userid);
  }, []);
  const handleFromLocationSelect = (data, details = null) => {
    const {description, geometry} = details;
    console.log(data.description);
    console.log(geometry);
    setFromLocation(data.description);
    setFromLatitude(geometry.location.lat);
    setFromLongitude(geometry.location.lng);
    // console.log('DATA', data);
    // console.log('DETAILS', details.geometry);
  };

  const handleToLocationSelect = (data, details = null) => {
    const {description, geometry} = details;
    console.log(data.description);
    console.log(geometry);
    // setFromLocation(data.description);
    setToLocation(data.description);
    setToLatitude(geometry.location.lat);
    setToLongitude(geometry.location.lng);
  };
  const incrementCount = () => {
    // Update state with incremented value
    setCount(count + 10);
  };
  const decrementCount = () => {
    setCount(count - 10);
  };
  const incrementCountSeating = () => {
    // Update state with incremented value
    setSeatingCapacity(parseInt(seatingCapacity) + 1);
  };
  const decrementCountSeating = () => {
    setSeatingCapacity(parseInt(seatingCapacity) - 1);
  };

  const onLoginPressed = () => {
    // console.log(cars);
    // console.log('FROM' + fromlatitude + '   ' + fromlongitude);

    // console.log('TO' + tolatitude + '   ' + tolongitude);
    const fieldError = fieldValidator(fare.value);
    const fieldError2 = fieldValidator(seats.value);
    if (fieldError || fieldError2) {
      setFare({...fare, error: fieldError});
      setSeats({...seats, error: fieldError2});
      return;
    }

    // const now = new Date();
    const timezoneOffset = 5 * 60 * 60 * 1000; //  5 hours ahead of UTC
    const karachiTime = new Date(date.getTime() + timezoneOffset).toISOString();
    console.log('karachitime', karachiTime);
    axios
      .post(`${server}/rides/addnew`, {
        DriverID: did,
        numberOfPeople: seatingCapacity,
        fareEntered: count,
        vehicleID: vehicle.value,
        datetime: karachiTime,
      })
      .then(res => {
        alert('Sucessfully posted!');
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
        console.log('RIDEIDDDDDDDDD', res.data.data);
        const rid = res.data.data;

        axios
          .post(`${server}/rides/driverlocation`, {
            RideID: rid,
            latitude: fromLatitude,
            longitude: fromLongitude,
            driverUserId: route.params.userid,
            location: fromLocation,
            driverID: did,
          })
          .then(() => {
            axios
              .post(`${server}/rides/driverlocationto`, {
                RideID: rid,
                to_latitude: toLatitude,
                to_longitude: toLongitude,
                to_driverUserId: route.params.userid,
                to_location: toLocation,
                to_driverID: did,
              })
              .then(() => {})
              .catch(function (error) {
                console.log(error);
                alert(error);
              });
          })
          .catch(function (error) {
            console.log(error);
            alert(error);
          });
        navigation.navigate({
          name: 'ListPassengerRides',
          params: {
            userid: uid,
          },
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("DriverHome")
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [])
  );

  // const [text, onChangeText] = useState('');

  //   const coordinate = [longitude, latitude];

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      {did === 0 ? (
        <>
          <Header>You need to register as a driver first</Header>
          <Button
            onPress={() => {
              navigation.navigate({
                name: 'RegisterDriverScreen',
                params: {
                  userid: uid,
                },
              });
            }}>
            Register as a Driver
          </Button>
        </>
      ) : (
        <Background>
          {/* <Logo /> */}

          {console.log('shouldrender', shouldRenderComponent)}
          {shouldRenderComponent ? (
            <>
              {console.log(shouldRenderComponent)}
              <DirectionsDisplay
                start={[fromLongitude, fromLatitude]}
                end={[toLongitude, toLatitude]}
              />
              <Button
                style={{marginBottom: '25%'}}
                mode="contained"
                onPress={onLoginPressed}>
                Save
              </Button>
            </>
          ) : (
            <View style={styles.searchContainer}>
              <Header>Where are you travelling to?</Header>

              <GooglePlacesAutocomplete
                GooglePlacesDetailsQuery={{fields: 'geometry'}}
                fetchDetails={true}
                placeholder="From"
                onPress={handleFromLocationSelect}
                query={{
                  key: GOOGLE_MAPS_API_KEY,
                  language: 'en',
                  components: 'country:pk',
                  location: '24.8607,67.0011',
                  radius: '35000',
                  strictbounds: true,
                }}
                styles={googlePlacesStyles}
                textInputProps={{
                  onChangeText: setFromLocation,
                  value: fromLocation,
                }}
              />
              <GooglePlacesAutocomplete
                GooglePlacesDetailsQuery={{fields: 'geometry'}}
                fetchDetails={true}
                placeholder="To"
                onPress={handleToLocationSelect}
                query={{
                  key: GOOGLE_MAPS_API_KEY,
                  language: 'en',
                  components: 'country:pk',
                  location: '24.8607,67.0011',
                  radius: '35000',
                  strictbounds: true,
                }}
                styles={googlePlacesStyles}
                textInputProps={{
                  onChangeText: setToLocation,
                  value: toLocation,
                }}
              />
              <Text style={styles.description}>
                Which vehicle will you take today?
              </Text>
              {/* {getVehicleInfo()} */}

              <Text style={styles.description}>Registered Vehicles:</Text>
              <Picker
                selectedValue={vehicle.value}
                onValueChange={(itemValue, itemIndex) =>
                  setVehicle({value: itemValue, error: ''})
                }>
                <Picker.Item label="Select your Car" value={null} />
                {cars.map(user => (
                  <Picker.Item
                    key={user.vehicleID}
                    label={`${user.Manufacturer} ${user.Model}`}
                    value={user.vehicleID}
                  />
                ))}
              </Picker>

              <Text style={styles.description}>Choose your fare:</Text>
              <View style={{flexDirection: 'row'}}>
                {count < 1000 && (
                  <FareButton onPress={incrementCount}>+</FareButton>
                )}

                <Text style={{marginTop: '5%', fontSize: 20}}>{count}</Text>
                {count > 100 && (
                  <FareButton onPress={decrementCount}>-</FareButton>
                )}
              </View>
              <Text style={styles.description}>Seating Capacity:</Text>
              <View style={{flexDirection: 'row'}}>
                {seatingCapacity < 6 && (
                  <FareButton onPress={incrementCountSeating}>+</FareButton>
                )}

                <Text style={{marginTop: '5%', fontSize: 20}}>
                  {seatingCapacity}
                </Text>
                {seatingCapacity > 1 && (
                  <FareButton onPress={decrementCountSeating}>-</FareButton>
                )}
              </View>
              <Text style={styles.description}>When will you leave?</Text>
              <Button style={{height: 50}} onPress={() => setOpen(true)}>
                Choose Date Time
              </Button>
              <DatePicker
                modal
                open={open}
                style={{height: 80}}
                date={date}
                onConfirm={newdate => {
                  setOpen(false);
                  console.log(newdate);
                  setDate(newdate);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
                minimumDate={new Date()}
                maximumDate={new Date('2023-05-31')}
              />
              {/* <Text>{date.setHours(date.getHours() - 7)}</Text> */}
              {console.log('HIIIIIIIIIIII', date)}
              <Button
                style={{marginBottom: '35%'}}
                mode="contained"
                onPress={() => {
                  if (
                    date &&
                    fromLatitude != 0 &&
                    fromLongitude != 0 &&
                    toLatitude != 0 &&
                    toLongitude != null
                  ) {
                    setShouldRenderComponent(true);
                  } else {
                    alert('Enter details first!');
                  }
                }}>
                Proceed
              </Button>
            </View>
          )}
          {/* <Button mode="contained" onPress={onLoginPressed}>
            Save
          </Button> */}
        </Background>
      )}
      {/* </View> */}
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

  button: {
    width: 300,
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  suggestiontwo: {
    paddingTop: 5,

    maxWidth: 600,
  },
  icon: {
    marginTop: 4,
    width: 30,
    height: 15,
  },
  suggestionthree: {
    alignItems: 'center',
    paddingTop: 5,
    flexDirection: 'row',
    maxWidth: 600,
  },
  texton: {
    color: 'black',
    padding: 10,
    height: 700,
    width: 600,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchContainer: {
    width: '100%',

    paddingHorizontal: 10,
    position: 'absolute',
    top: 0,
    zIndex: 1,
    marginTop: '15%',
  },
});

const googlePlacesStyles = StyleSheet.create({
  container: {
    flex: 0,
  },
  textInput: {
    fontSize: 16,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 16,
  },
  listView: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 8,
  },
  row: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
  },
});
