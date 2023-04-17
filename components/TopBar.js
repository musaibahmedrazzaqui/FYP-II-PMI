import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {Icon} from 'react-native-elements';
const TopBar = () => {
  return (
    <View style={[styles.logoContainer, tw`mx-2 my-4 pt-1`]}>
      {/* <Icon
        name="account-circle"
        style={tw` w-3`}
        color={'gray'}
        type="material"
        size={35}
        onPress={() =>
          navigation.navigate({
            name: 'SettingsScreen',
            params: {
              userid: showdata,
            },
          })
        }
      /> */}
      <Text style={tw`text-2xl font-bold ml-33`}>Pool Me In</Text>
      <Icon
        name="logout"
        style={tw` w-9`}
        color={'gray'}
        type="material"
        size={35}
        onPress={() => loggedout()}
      />
    </View>
  );
};

export default TopBar;
const styles = StyleSheet.create({
  logoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
