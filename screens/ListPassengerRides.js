import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Linking,
  Image,
  StyleSheet,
} from 'react-native';
import Background from '../components/Background';
import {
  Pusher,
  PusherMember,
  PusherChannel,
  PusherEvent,
} from '@pusher/pusher-websocket-react-native';
import {Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import server from './globals';
import PickupDestination from '../components/PickupDestination2';
import TextInput from '../components/TextInput';
import DirectionsDisplay from '../components/DirectionsDisplay';
import Header from '../components/Header';

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
    fontSize: 22,
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
  imagetwo: {
    width: 50,
    height: 50,
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemButtons: {
    marginLeft: 15,
    flexDirection: 'row',
  },
  buttonAccept: {
    backgroundColor: 'green',
    borderRadius: 5,
    padding: 10,
    marginLeft: 5,
  },
  buttonReject: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 10,
    marginLeft: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const ListPassengerRides = ({navigation, route}) => {
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
        `${server}/rides/ridereqpassenger/${route.params?.userid}`,
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
    fetchData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleItemPress = item => {
    setSelectedItem(item);
    console.log('item', item);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setSelectedItem(null);
    setModalVisible(false);
  };

  const handleAccept = async item => {
    try {
      console.log('SELECTEDITEM', selectedItem);
      //   await axios.post(`${server}/rides/driverequestride`, {
      //     pickuplocation: selectedItem?.location,
      //     destination: selectedItem?.to_location,
      //     from_lat: selectedItem?.latitude,
      //     from_long: selectedItem?.longitude,
      //     to_lat: selectedItem?.to_latitude,
      //     to_long: selectedItem?.to_longitude,
      //     driveruserid: route.params?.userid,
      //     passengeruserid: selectedItem?.userID,
      //     vehicleID: vehicle,
      //     fare: fare,
      //     idpassengerrides: selectedItem?.idpassengerrides,
      //   });
      alert('Sent request!');
      setModalVisible(false);
      setSelectedItem(null);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async recipientUserId => {
    try {
      const response = await axios.post(`${server}/landmarks/notificationtwo`, {
        idx: recipientUserId,
      });
      console.log(response.data);
      setModalVisible(false);
      setSelectedItem(null);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };
  const sendNotification = async recipientUserId => {
    try {
      const response = await axios.post(`${server}/landmarks/notification`, {
        idx: recipientUserId,
      });
      console.log(response.data);
      setModalVisible(false);
      setSelectedItem(null);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleItemPress(item)}>
      <View style={styles.itemContent}>
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>
            {item.firstName} {item.lastName}
          </Text>
          <Text style={styles.itemText}>
            {item.Manufacturer} {item.Model} {item.Year}
          </Text>
          <Text style={styles.itemText}>Fare Requested: {item.fare}</Text>
          <Text style={styles.itemText}>ETA: {item.time} mins</Text>
        </View>
        <View style={styles.itemButtons}>
          <TouchableOpacity
            onPress={() => {
              sendNotification(item.idridereqpassenger);
            }}
            style={styles.buttonAccept}>
            <Text style={styles.buttonText}>✔</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleReject(item.idridereqpassenger);
            }}
            style={styles.buttonReject}>
            <Text style={styles.buttonText}>✖</Text>
          </TouchableOpacity>
        </View>
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
                parseFloat(selectedItem?.from_long),
                parseFloat(selectedItem?.from_lat),
              ]}
              end={[
                parseFloat(selectedItem?.to_long),
                parseFloat(selectedItem?.to_lat),
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
              Driver: {selectedItem?.firstName} {selectedItem?.lastName}
            </Text>
            <Text style={styles.modalItemText}>
              Estimated Time of Arrival: {selectedItem?.time} mins
            </Text>
            <Text style={styles.modalItemText}>
              Car: {selectedItem?.Manufacturer} {selectedItem?.Model}{' '}
              {selectedItem?.Year}
            </Text>
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:${selectedItem?.phone}`)}>
              <View
                style={{
                  padding: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../assets/dial1.jpg')}
                  style={styles.imagetwo}
                />
                <Text style={styles.overlayTextTwo}>Press to Call!</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );

  return (
    <Background>
      {data[0] ? (
        <>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.idpassengerrides.toString()}
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
          {renderModal()}
        </>
      ) : (
        <>
          {/* <Text>No data</Text> */}
          <Header>No requests</Header>
        </>
      )}
    </Background>
  );
};

export default ListPassengerRides;
