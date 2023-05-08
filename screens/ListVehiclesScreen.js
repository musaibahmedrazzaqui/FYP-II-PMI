import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  BackHandler
} from 'react-native';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import Geolocation from '@react-native-community/geolocation';
import Background from '../components/Background';
import BackButton from '../components/BackButton';
import RNRestart from 'react-native-restart';
import {useNavigation} from '@react-navigation/native';
import server from './globals';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
// import FareNegotiation from './FareNegotiation';

const availableRides = [
  {
    id: 1,
    name: 'John Doe',
    fare: 'Honda Civic',
    reg_no: 'AAA-000',
    show: false,
  },
  {
    id: 2,
    name: 'Jane Doe',
    fare: 'Toyota Camry',
    reg_no: 'AAA-001',
    show: false,
  },
  {
    id: 3,
    name: 'Musaib ahmed Razzaqui',
    fare: 'Ford Fusion',
    reg_no: 'AAA-003',
    show: false,
  },
  {
    id: 4,
    name: 'Faizan Mukhtar',
    fare: 'Chevrolet Cruze',
    reg_no: 'AAA-002',
    show: false,
  },
  {
    id: 5,
    name: 'Affan ul Haq',
    fare: 'Suzuki FX',
    reg_no: 'AAA-005',
    show: false,
  },
];
const getRidedata = response => {
  console.log('hereeee', response);
  let rData = response;
  // console.log('Car data', carData);
  const keys = Object.keys(rData);
  console.log('Keys', keys);
  return keys.map(key => {
    let rideData = rData[key];
    // console.log(caData);
    return {key: key, ...rideData};
  });
};
const ListVehiclesScreen = ({navigation, route}) => {
  const [vehices, setVehicles] = useState([]);
  const [show, setShow] = useState(false);
  const [uid, setUid] = useState(route.params?.userid);
  const [did, setdId] = useState();
  const [latitude, setlatitude] = React.useState('0.0');
  const [longitude, setlongitude] = React.useState('0.0');
  const Navigation = useNavigation();
  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      setlatitude(info.coords.latitude);
      setlongitude(info.coords.longitude);
    });
    axios.get(`${server}/vehicle/getvehicles/${uid}`).then(res => {
      const response = res.data;
      // console.log(res.data);
      setVehicles(getRidedata(response.data));
      //  setdId(response.data[0].DriverID);
    });
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Navigation.navigate("SettingsScreen")
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [])
  );

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <FlatList
        data={vehices}
        keyExtractor={item => item.key.toString()}
        renderItem={({item}) => (
          <View style={{padding: 10}}>
            <TouchableOpacity>
              <Card>
                <Text
                  style={{
                    fontSize: 25,
                    marginLeft: 18,
                    marginTop: 20,
                    color: 'black',
                  }}>
                  {item.Manufacturer} {item.Model} {item.Year}
                </Text>
                <Card.Content>
                  <Title>Vehicle Owner: {item.OwnerName}</Title>
                  <Text>Registration Number: {item.VehicleNumber}</Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          </View>
        )}
      />
      {/* {console.log('listvehicles did' + vehices[0].DriverID)} */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() =>
          Navigation.navigate({
            name: 'RegisterVehicleScreen',
            params: {
              userid: uid,
            },
          })
        }
        style={styles.touchableOpacityStyle}>
        <Image
          source={{
            uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
          }}
          style={styles.floatingButtonStyle}
        />
      </TouchableOpacity>
    </Background>
  );
};
export default ListVehiclesScreen;

const styles = StyleSheet.create({
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
});
