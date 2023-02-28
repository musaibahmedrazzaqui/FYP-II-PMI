import React from 'react';
import { useNavigation } from "@react-navigation/native";
// import Images from '../config/Images';
import {
  Button,
  Container,
  ScreenContainer,
  TextField,
  withTheme,
} from '@draftbit/ui';
import tw from 'twrnc';
import {
  Image,
    KeyboardAvoidingView,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
const EditProfileScreen = props => {
  const [textFieldValue, setTextFieldValue] = React.useState(undefined);
    const { theme } = props;
    const Navigation = useNavigation();
  React.useEffect(() => {
    StatusBar.setBarStyle('dark-content');
  }, []);
  return (
    <ScreenContainer scrollable={true} hasSafeArea={true}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView5A}
        enabled={true}
        behavior="padding"
        keyboardVerticalOffset={60}
      >
        <Container
          style={styles.container9T}
          elevation={0}
          useThemeGutterPadding={true}
        >
          <Text
            style={StyleSheet.flatten([
              styles.textEa,
              theme.typography.headline4,
              { color: theme.colors.strong },
            ])}
          >
            Edit Your Profile
          </Text>
          <Text
            style={StyleSheet.flatten([
              styles.textUm,
              theme.typography.body1,
              { color: theme.colors.strong },
            ])}
          >
            You can edit your Name and Other information here. Instituion can not be changed from the app
          </Text>
          <Image
            style={StyleSheet.flatten([
              styles.imageSq,
              { borderRadius: theme.borderRadius.button },
            ])}
            resizeMode="cover"
            source={require("../assets/avatar.png")}
          />
          <TextField
            style={styles.textFieldK7}
            type="underline"
            label="Name"
            keyboardType="default"
            leftIconMode="inset"
            value={textFieldValue}
            onChangeText={textFieldValue => setTextFieldValue(textFieldValue)}
          />
          <TextField
            style={styles.textField8U}
            type="underline"
            label="Vehicle"
            keyboardType="default"
            leftIconMode="inset"
            value={textFieldValue}
            onChangeText={textFieldValue => setTextFieldValue(textFieldValue)}
          />
        </Container>
        <Container
          style={styles.containerVk}
          elevation={0}
          useThemeGutterPadding={true}
        >
          <TouchableOpacity
          style={styles.buttonP2}
                   onPress={() => Navigation.navigate('SettingsScreen')}
                  
                >
                  <Text style={tw`bg-white text-[12px] m-1 text-center text-blue-600 font-bold py-2 w-30 px-2 border-[1px] border-blue-600 rounded-md`}>Save</Text>
                </TouchableOpacity>
        </Container>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};
const styles = StyleSheet.create({
  container9T: {
    marginTop: 24,
    alignItems: 'center',
  },
  buttonUf: {
    height: 48,
    alignSelf: 'stretch',
  },
  keyboardAvoidingView5A: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  textEa: {
    textAlign: 'center',
  },
  containerVk: {
    alignItems: 'center',
  },
  textUm: {
    marginTop: 16,
    textAlign: 'center',
  },
  imageSq: {
    width: 100,
    height: 100,
    marginTop: 24,
  },
  textFieldK7: {
    height: 82,
    marginTop: 16,
  },
  textField8U: {
    height: 82,
    marginTop: 16,
  },
});
export default withTheme(EditProfileScreen);