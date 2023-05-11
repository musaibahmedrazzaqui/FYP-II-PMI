import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const NavBar = ({onClose, uid}) => {
  const chatUrl = `whatsapp://send?phone=03330229763`;
  const Navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.container}>
        {/* Sidebar content */}
        <View style={styles.contentContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              Navigation.navigate({
                name: 'NewHome',
              })
            }>
            <Image
              style={styles.icon}
              source={require('../assets/homescreen.png')}
            />
            <Text style={styles.buttonText}>Home Screen</Text>
          </TouchableOpacity>
          <View style={styles.divider} />

          <View style={styles.divider} />
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              Navigation.navigate({
                name: 'SettingsScreen',
                params: {
                  userid: uid,
                },
              })
            }>
            <Image
              style={styles.icon}
              source={require('../assets/viewprofile.png')}
            />
            <Text style={styles.buttonText}>View Profile</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              Navigation.navigate({
                name: 'SendReferral',
                params: {
                  userid: uid,
                },
              })
            }>
            <Image
              style={styles.icon}
              source={require('../assets/sendreferral.png')}
            />
            <Text style={styles.buttonText}>Send Referral Code</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Navigation.navigate({
                name: 'AllRidesPassenger',
                params: {
                  userid: uid,
                },
              })
            }
            style={styles.button}>
            <Image
              style={styles.icon}
              source={require('../assets/viewstatus.png')}
            />
            <Text style={styles.buttonText}>View Ride Status</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.canOpenURL(chatUrl)
                .then(supported => {
                  if (!supported) {
                    alert(`WhatsApp is not installed on your device`);
                  } else {
                    return Linking.openURL(chatUrl);
                  }
                })
                .catch(err => console.error(`An error occurred: ${err}`));
            }}
            style={styles.button}>
            <Image
              style={styles.icon}
              source={require('../assets/contactus.png')}
            />
            <Text style={styles.buttonText}>Contact Us</Text>
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
    height: '150%',
    backgroundColor: '#161642',
    // opacity:'100%',
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
    color: 'white',
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
