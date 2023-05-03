import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Linking,
  Modal,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from 'react-native';
import TopBar from '../components/TopBar';
import React, {useState, useRef, useEffect} from 'react';
import PickupDestination from '../components/PickupDestination3';
import axios from 'axios';
import server from './globals';
import Background from '../components/Background';
import Header from '../components/Header';
const AllRidesScreen = ({navigation, route}) => {
  const [ridedata, setRideData] = useState([]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async () => {
    setIsLoading(true);
    try {
      // console.log(lat, long);
      const response = await axios.get(
        `${server}/rides/getridesformodal/${route.params.userid}`,
      );
      // console.log(response.data.data);
      setRideData(response.data.data);
      // setRefreshing(false);
      // setPlacename(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      // setRefreshing(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleItemPress = item => {
    setSelectedItem(item);
    navigation.navigate({
      name: 'DriversAcceptedRides',
      params: {
        ride: item,
      },
    });
    //    setModalVisible(true);
  };
  return (
    <Background>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView>
          {/* {console.log('RIDEDATA', passridedata[0])} */}
          <Header>
            Here are your active rides. {'\n'} Tap on any one of them to view
            details about the passengers in them!
          </Header>
          {ridedata.map((ride, index) => {
            return (
              <PickupDestination
                key={index}
                loc1={ride.location.toString().split(' ').slice(0, 2).join(' ')}
                loc2={ride.to_location
                  .toString()
                  .split(' ')
                  .slice(0, 2)
                  .join(' ')}
                onPress={() => {
                  console.log(`${ride.RideID} pressed`);
                  handleItemPress(ride);
                }}
              />
            );
          })}
          <View style={{flex: 1, marginBottom: 20}}></View>
        </ScrollView>
      )}
      {/* <TopBar /> */}
    </Background>
  );
};

export default AllRidesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Other styles for the main container of HomeScreen
  },
  image: {
    width: 24,
    height: 24,
  },
  imageLogout: {
    width: 2,
    height: 2,
  },
  button: {
    position: 'absolute',
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 20,
    top: 0,
    bottom: 650,
    right: 10,
    left: 300,
  },
  buttonblue: {
    paddingVertical: 26,
    paddingHorizontal: 106,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // backgroundColor: 'lightgrey',

    borderRadius: 5,
    marginVertical: 20,
    marginBottom: -10,
  },

  text: {
    color: '#fff',
    fontSize: 16,
  },
  toggleButton: {
    position: 'absolute',
    top: 18,
    right: 350,
    padding: 8,
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 19,
    marginBottom: 20,
  },
  toggleButtonTwo: {
    position: 'absolute',
    top: 18,
    right: 100,
    padding: 8,
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  logoContainer: {
    display: 'flex',
    flex: 0,
    marginTop: 15,
    marginRight: 20,
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
  },
});
