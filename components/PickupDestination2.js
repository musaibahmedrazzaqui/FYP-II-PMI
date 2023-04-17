import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';

const PickupDestination = ({loc1, loc2}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/Capture.png')} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <ScrollView style={[styles.pickupContainer]}>
          <Text style={styles.pickupText}>{loc1}</Text>
        </ScrollView>

        {/* <View style={styles.arrowContainer}>
        <Text style={styles.arrowText}>🔽 TO 🔽</Text>
      </View> */}
        <ScrollView style={[styles.destinationContainer]}>
          <Text style={styles.destinationText}>{loc2}</Text>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    // alignItems: 'center',

    // paddingLeft: 50,
    paddingVertical: 5,
    // paddingHorizontal: 16,
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
    width: 250,
    marginBottom: 10,
  },
  textContainer: {
    position: 'relative',
    padding: 8,
    width: 10,
    borderRadius: 4,
  },
  pickupContainer: {
    backgroundColor: '#e6e6e6',
    marginLeft: 4,
    marginBottom: 10,
    maxHeight: 45,
    minWidth: 200,
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 10,
    bottom: 0,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  image: {
    width: 45,
    height: 80,
    marginBottom: 20,
    marginRight: -12,
  },
  pickupText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  destinationContainer: {
    backgroundColor: '#f5f5f5',
    marginLeft: 4,
    maxHeight: 45,
    minWidth: 200,
  },
  destinationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  arrowContainer: {
    padding: 8,
    marginLeft: 80,
  },
  arrowText: {
    fontSize: 16,
    color: 'blue',
  },
});

export default PickupDestination;
