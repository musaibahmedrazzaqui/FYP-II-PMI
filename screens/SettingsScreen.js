import React from 'react';
// import Images from '../config/Images';
import {
  Button,
  Container,
  Icon,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';
import {
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useState} from 'react';
const SettingsScreen = props => {
  const Navigation = useNavigation();
  const {theme} = props;
  console.log(props.route.params.userid);
  const [userid, setuserid] = useState(props.route.params.userid);
  return (
    <ScreenContainer
      style={styles.screenContainerJb}
      scrollable={true}
      hasSafeArea={false}>
      {/* <ImageBackground
        style={styles.imageBackgroundNb}
        source={Images.ErikmcleannTCtYYyVqSYunsplash}
        resizeMode=""cover""
      /> */}
      <Container
        style={styles.containerEA}
        elevation={0}
        useThemeGutterPadding={true}>
        {/* <Image
          style={StyleSheet.flatten([
            styles.imageA3,
            { borderRadius: theme.borderRadius.global },
          ])}
          resizeMode=""cover""
          source={Images.Model024}
        /> */}
        <TouchableOpacity
          onPress={() => Navigation.navigate('HomeScreen')}
          style={{position: 'absolute', top: -50, left: -30}}>
          <Image
            style={{
              height: 20,
              width: 20,
            }}
            source={require('../assets/back.png')}
          />
        </TouchableOpacity>
        <Text
          style={StyleSheet.flatten([
            styles.textPr,
            theme.typography.headline3,
          ])}>
          Musaib Ahmed
        </Text>
        {/* <Button style={styles.buttonP2}>
          Edit Profile
        </Button> */}
        <TouchableOpacity
          style={styles.buttonP2}
          onPress={() => Navigation.navigate('EditProfileScreen')}>
          <Text
            style={tw`bg-white text-[12px] m-1 text-center text-blue-600 font-bold py-2 w-30 px-2 border-[1px] border-blue-600 rounded-md`}>
            Edit Profile
          </Text>
        </TouchableOpacity>
      </Container>
      <Container useThemeGutterPadding={true} elevation={0}>
        <TouchableOpacity
          style={StyleSheet.flatten([
            styles.touchableOk,
            {borderColor: theme.colors.divider},
          ])}
          onPress={() =>
            Navigation.navigate({
              name: 'ListVehiclesScreen',
              params: {
                userid: userid,
              },
            })
          }>
          <View style={styles.viewKs}>
            <Text style={theme.typography.body1}>See your Vehicles</Text>
            <Icon
              style={styles.iconFE}
              size={24}
              color={theme.colors.strong}
              name="MaterialIcons/account-circle"
            />
          </View>
        </TouchableOpacity>
        <Touchable
          style={StyleSheet.flatten([
            styles.touchableOm,
            {borderColor: theme.colors.divider},
          ])}>
          <View style={styles.viewYR}>
            <Text style={theme.typography.body1}>Notifications</Text>
            <Icon
              style={styles.iconCl}
              color={theme.colors.strong}
              name="MaterialIcons/notifications"
              size={24}
            />
          </View>
        </Touchable>
        <Touchable
          style={StyleSheet.flatten([
            styles.touchableBp,
            {borderColor: theme.colors.divider},
          ])}>
          <View style={styles.viewS1}>
            <Text style={theme.typography.body1}>Ride History</Text>
            <Icon
              style={styles.iconZz}
              color={theme.colors.strong}
              size={24}
              name="MaterialIcons/history"
            />
          </View>
        </Touchable>
        <Touchable
          style={StyleSheet.flatten([
            styles.touchableJg,
            {borderColor: theme.colors.divider},
          ])}>
          <View style={styles.viewAl}>
            <Text style={theme.typography.body1}>Payment Details</Text>
            <Icon
              style={styles.iconZb}
              size={24}
              name="MaterialIcons/payment"
              color={theme.colors.strong}
            />
          </View>
        </Touchable>
      </Container>
    </ScreenContainer>
  );
};
const styles = StyleSheet.create({
  screenContainerJb: {
    justifyContent: 'space-evenly',
  },
  viewKs: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  viewYR: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  viewS1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewAl: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  imageBackgroundNb: {
    width: '100%',
    height: 250,
  },
  imageA3: {
    height: 120,
    width: 120,
  },
  containerEA: {
    alignItems: 'center',
    marginTop: -65,
  },
  textPr: {
    width: '100%',
    textAlign: 'center',
    marginTop: 16,
  },
  touchableOk: {
    borderTopWidth: 1,
    paddingTop: 12,
    paddingBottom: 12,
    marginTop: 32,
  },
  iconFE: {
    height: 24,
    width: 24,
  },
  iconCl: {
    width: 24,
    height: 24,
  },
  iconZz: {
    width: 24,
    height: 24,
  },
  iconZb: {
    height: 24,
    width: 24,
  },
  buttonP2: {
    marginTop: 16,
    alignSelf: 'center',
    width: '50%',
    color: '#0000',
  },
  touchableOm: {
    paddingBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  touchableBp: {
    paddingBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  touchableJg: {
    paddingBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
  },
});
export default withTheme(SettingsScreen);
