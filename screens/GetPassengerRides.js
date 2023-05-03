import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Button,
  StyleSheet,
} from 'react-native';

import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import server from './globals';
import PickupDestination from '../components/PickupDestination2';
import TextInput from '../components/TextInput';
import DirectionsDisplay from '../components/DirectionsDisplay';
import Background from '../components/Background';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  itemContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  itemText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 20,
  },
  modalItemContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalItemName: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  modalItemText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalButtonAccept: {
    backgroundColor: '#4CAF50',
  },
  modalButtonReject: {
    backgroundColor: '#F44336',
  },
  modalButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const GetPassengerRides = ({navigation, route}) => {
  const [data, setData] = useState([]);
  const [cars, setCars] = useState([]);
  const [vehicle, setVehicle] = useState('');
  const [time, setTime] = useState('');
  const [fare, setFare] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchData = async () => {
    try {
      console.log('UID', route.params?.userid);
      const response = await axios.get(
        `${server}/rides/getpassengerrides/${route.params?.userid}`,
      );
      console.log(response.data.data);
      setData(response.data.data);
      setRefreshing(false);
    } catch (error) {
      console.log(error);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${server}/vehicle/getvehicles/${route.params?.userid}`)
      .then(res => {
        const response = res.data;
        // console.log(res.data);
        setCars(response.data);
        //  setdId(response.data[0].DriverID);
      });
    fetchData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleItemPress = item => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setSelectedItem(null);
    setModalVisible(false);
  };

  const handleAccept = async () => {
    try {
      console.log('SELECTEDITEM', selectedItem);
      await axios
        .post(`${server}/rides/driverequestride`, {
          pickuplocation: selectedItem?.location,
          destination: selectedItem?.to_location,
          from_lat: selectedItem?.latitude,
          from_long: selectedItem?.longitude,
          to_lat: selectedItem?.to_latitude,
          to_long: selectedItem?.to_longitude,
          driveruserid: route.params?.userid,
          passengeruserid: selectedItem?.userID,
          vehicleID: vehicle,
          fare: fare,
          idpassengerrides: selectedItem?.idpassengerrides,
          time: time,
        })
        .then(res => {
          navigation.navigate({
            name: 'DriverHome',
            params: {
              userid: route.params?.userid,
            },
          });
          alert('Sent request!');
        });

      setModalVisible(false);
      setSelectedItem(null);

      // fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async () => {
    try {
      await axios.post('https://your-api-url-here.com/reject', {
        id: selectedItem.id,
      });
      setModalVisible(false);
      setSelectedItem(null);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleItemPress(item)}>
      <View>
        <Text style={styles.itemName}>
          {item.firstName} {item.lastName}
        </Text>

        <PickupDestination loc1={item.location} loc2={item.to_location} />
        {/* <Text>
          {item.to_latitude}, {item.to_longitude}
        </Text> */}
      </View>
    </TouchableOpacity>
  );

  const renderModal = () => (
    <View>
      {/* {console.log(
        parseFloat(selectedItem?.latitude),
        parseFloat(selectedItem?.longitude),
      )} */}

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          {modalVisible && (
            <DirectionsDisplay
              start={[
                parseFloat(selectedItem?.longitude),
                parseFloat(selectedItem?.latitude),
              ]}
              end={[
                parseFloat(selectedItem?.to_longitude),
                parseFloat(selectedItem?.to_latitude),
              ]}
            />
          )}
          <TouchableOpacity
            style={[styles.modalButton, styles.modalButtonReject]}
            onPress={() => handleModalClose()}>
            <Text style={styles.modalButtonText}>Close</Text>
          </TouchableOpacity>
          <View style={styles.modalItemContainer}>
            <Text style={styles.modalItemName}>
              {selectedItem?.firstName} {selectedItem?.lastName}
            </Text>
            <Text style={styles.modalItemText}>
              Pickup: {selectedItem?.location}
            </Text>
            <Text style={styles.modalItemText}>
              Destination: {selectedItem?.to_location}
            </Text>
            <TextInput
              label="Enter your fare & Press Accept"
              returnKeyType="done"
              value={fare}
              onChangeText={text => setFare(text)}
            />
            <TextInput
              label="In how many minutes will you reach to Pickup?"
              returnKeyType="done"
              value={time}
              onChangeText={text => setTime(text)}
            />
            <Text style={styles.modalItemText}>
              Which vehicle will you take today?
            </Text>
            {/* {getVehicleInfo()} */}

            {/* <Text style={styles.description}>Registered Vehicles:</Text> */}
            {/* {console.log(uscer)} */}
            <Picker
              selectedValue={vehicle}
              onValueChange={(itemValue, itemIndex) => setVehicle(itemValue)}>
              <Picker.Item label="Select a vehicle" value={null} />
              {cars.map(user => (
                <Picker.Item
                  key={user.vehicleID}
                  label={`${user.Manufacturer} ${user.Model}`}
                  value={user.vehicleID}
                />
              ))}
            </Picker>

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonAccept]}
                onPress={handleAccept}>
                <Text style={styles.modalButtonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonReject]}
                onPress={handleReject}>
                <Text style={styles.modalButtonText}>Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );

  return (
    <Background style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.idpassengerrides.toString()}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
      {renderModal()}
    </Background>
  );
};

export default GetPassengerRides;
