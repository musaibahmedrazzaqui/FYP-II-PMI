import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const RideDetails = ({rides}) => {
  return (
    <View>
      {rides.map(
        (ride, index) =>
          ride.StatusID === 3 && (
            <View key={index} style={styles.rideDetailsContainer}>
              <Text style={styles.passengerName}>
                {ride.PassengerFName} {ride.PassengerLName}
              </Text>
              <Text style={styles.fareDetails}>
                Fare Recieved: {ride.fareDecided}
              </Text>
              <Text style={styles.fareDetails}>
                Picked From: {ride.PassengerLocation}
              </Text>
            </View>
          ),
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rideDetailsContainer: {
    backgroundColor: '#f7f7f7',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  passengerName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  fareDetails: {
    color: '#888',
    fontSize: 14,
  },
});

export default RideDetails;
