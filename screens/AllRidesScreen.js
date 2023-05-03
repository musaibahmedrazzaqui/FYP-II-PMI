import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Modal,
} from 'react-native';
import PickupDestination from '../components/PickupDestination3';
import axios from 'axios';
import server from './globals';
import Background from '../components/Background';
import Header from '../components/Header';
// import Background from '../components/Background';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
const AllRidesScreen = ({navigation, route}) => {
  const [isModalopen, setismodalopen] = useState(false);
  const [scheduledRideData, setscheduledRideData] = useState([]);
  const [activeRideData, setactiveRideData] = useState([]);
  const [completedRideData, setcompletedRideData] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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

  const [activeTab, setActiveTab] = useState(1);

  const handleTabPress = tabNumber => {
    setActiveTab(tabNumber);
  };
  const handleItemPress = item => {
    setIsLoading(true);
    // setSelectedItem(item);
    console.log('ITEM', item);
    axios
      .get(
        `${server}/rides/driveracceptedrides/${item.DriverUserID}/${item.RideID}`,
      )
      .then(res => {
        const response = res.data;
        if (response.error == 0) {
          console.log('res.data', res.data.data);
          if (res.data.data.length > 0) {
            setSelectedItem(response.data);
            setismodalopen(true);
            setIsLoading(false);
          } else {
            alert('This ride has no passengers');
          }

          // setCount(response.data.length);
          //   console.log(count);
        } else {
          console.log('error');
        }
      });
    // setismodalopen(true);
  };
  const fetchData = async () => {
    setIsLoading(true);
    try {
      // console.log(lat, long);
      const response = await axios.get(
        `${server}/rides/getridesformodal/${route.params.userid}`,
      );
      // console.log(response.data.data);
      setscheduledRideData(response.data.data);
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

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={activeTab === 1 ? styles.activeTabButton : styles.tabButton}
            onPress={() => handleTabPress(1)}>
            <Text
              style={activeTab === 1 ? styles.activeTabText : styles.tabText}>
              Scheduled
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={activeTab === 2 ? styles.activeTabButton : styles.tabButton}
            onPress={() => handleTabPress(2)}>
            <Text
              style={activeTab === 2 ? styles.activeTabText : styles.tabText}>
              Active
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={activeTab === 3 ? styles.activeTabButton : styles.tabButton}
            onPress={() => handleTabPress(3)}>
            <Text
              style={activeTab === 3 ? styles.activeTabText : styles.tabText}>
              Completed
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          {activeTab === 1 &&
            scheduledRideData.map((ride, index) => {
              return (
                <PickupDestination
                  key={index}
                  loc1={ride.location
                    .toString()
                    .split(' ')
                    .slice(0, 2)
                    .join(' ')}
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
          {activeTab === 2 && (
            <FlatList
              data={availableRides}
              renderItem={({availableRides}) => (
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
                        {availableRides}
                      </Text>
                      <Card.Content>
                        <Title>Vehicle Owner: {availableRides}</Title>
                        <Text>Registration Number: {availableRides}</Text>
                      </Card.Content>
                    </Card>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
          {activeTab === 3 && (
            <FlatList
              data={availableRides}
              renderItem={({availableRides}) => (
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
                        {availableRides}
                      </Text>
                      <Card.Content>
                        <Title>Vehicle Owner: {availableRides}</Title>
                        <Text>Registration Number: {availableRides}</Text>
                      </Card.Content>
                    </Card>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
        </View>
        {isModalopen && (
          <View>
            {/* {console.log(
            parseFloat(selectedItem?.latitude),
            parseFloat(selectedItem?.longitude),
          )} */}
            {console.log(selectedItem)}
            {/* <Modal visible={isModalopen} animationType="slide">
              <View style={styles.modalContainer}>
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
                    onPress={() =>
                      Linking.openURL(`tel:${selectedItem?.phone}`)
                    }>
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
            </Modal> */}
          </View>
        )}
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 5,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    borderRadius: 20, // <-- add this line to make the button rounded
    marginHorizontal: 5, // <-- add this line to create some space between buttons
  },
  activeTabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    backgroundColor: '#AC41B0',
    borderRadius: 20, // <-- add this line to make the button rounded
    marginHorizontal: 5, // <-- add this line to create some space between buttons
  },

  tabText: {
    fontSize: 15,
    color: '#333',
  },
  activeTabText: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    width: 300,
    paddingHorizontal: 20,
  },
});

export default AllRidesScreen;
