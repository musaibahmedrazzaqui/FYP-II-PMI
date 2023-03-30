import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const PickupDestination = ({loc1, loc2}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.textContainer, styles.pickupContainer]}>
        <Text style={styles.pickupText}>{loc1}</Text>
      </View>
      <View style={styles.arrowContainer}>
        <Text style={styles.arrowText}>➡️</Text>
      </View>
      <View style={[styles.textContainer, styles.destinationContainer]}>
        <Text style={styles.destinationText}>{loc2}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // alignItems: 'center',

    // paddingLeft: 50,
    paddingVertical: 12,
    paddingHorizontal: 16,
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
  },
  textContainer: {
    flex: 1,
    padding: 8,
    width: 10,
    borderRadius: 4,
  },
  pickupContainer: {
    backgroundColor: '#e6e6e6',
    marginLeft: 115,
    maxWidth: 150,
  },
  pickupText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  destinationContainer: {
    backgroundColor: '#f5f5f5',
    marginLeft: 4,
    maxWidth: 150,
  },
  destinationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  arrowContainer: {
    padding: 8,
  },
  arrowText: {
    fontSize: 16,
  },
});

export default PickupDestination;
