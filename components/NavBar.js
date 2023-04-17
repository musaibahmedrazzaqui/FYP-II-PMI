import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const NavBar = ({onClose, uid}) => {
  const Navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.container}>
        {/* Sidebar content */}
        <View style={styles.contentContainer}>
          <TouchableOpacity style={styles.button}>
            <Image
              style={styles.icon}
              source={require('../assets/requests.png')}
            />
            <Text style={styles.buttonText}>Home Screen</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.button}>
            <Image
              style={styles.icon}
              source={require('../assets/requests.png')}
            />
            <Text style={styles.buttonText}>Previous Trips</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.button}>
            <Image
              style={styles.icon}
              source={require('../assets/requests.png')}
            />
            <Text style={styles.buttonText}>View Profile</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.button}>
            <Image
              style={styles.icon}
              source={require('../assets/requests.png')}
            />
            <Text style={styles.buttonText}>Send Referral Code</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Navigation.navigate({
                name: 'ListPassengerRides',
                params: {
                  userid: uid,
                },
              })
            }
            style={styles.button}>
            <Image
              style={styles.icon}
              source={require('../assets/requests.png')}
            />
            <Text style={styles.buttonText}>View Ride Requests</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: '75%',
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    paddingTop: 40,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
    marginLeft: 12,
    fontFamily: 'Roboto-Regular',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  divider: {
    height: 1,
    backgroundColor: 'grey',
  },
});

export default NavBar;
