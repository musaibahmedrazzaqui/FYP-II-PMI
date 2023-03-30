import {Provider} from 'react-redux';

// Screens
import HomeScreen from './screens/HomeScreen';
import DriverEndScreen from './screens/DriverEndScreen';
import AvailableRidesScreen from './screens/AvailableRidesScreen';
import AblyTracking from './screens/AblyTracking';
import ReferScreen from './screens/ReferScreen';
import YourRidesScreen from './screens/YourRidesScreen';
import StartScreen from './screens/StartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import Connections from './screens/Connections';
import EditProfileScreen from './screens/EditProfileScreen';
import FromScreen from './screens/FromScreen';
import ToScreen from './screens/ToScreen';
import RegisterVehicleScreen from './screens/RegisterVehicleScreen';
import RegisterDriverScreen from './screens/RegisterDriverScreen';
import ListVehiclesScreen from './screens/ListVehiclesScreen';
import NavigationScreen from './screens/NavigationScreen';
import ListRideRequestsScreen from './screens/ListRideRequestsScreen';
import FareNegotiation from './screens/FareNegotiation';
import DriversAcceptedRides from './screens/DriversAcceptedRides';
import OfferRideScreen from './screens/OfferRideScreen';

import ReceiptScreen from './screens/ReceiptScreen';
// Redux Store
import {store} from './store';

// Providers
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FoodScreen from './screens/FoodScreen';
import MailVerify from './screens/MailVerify';
import SettingsScreen from './screens/SettingsScreen';
import {isPending} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

export default function App() {
  const Stack = createNativeStackNavigator();
  const [showdata, setShowdata] = useState();
  async function fetch() {
    setShowdata(await AsyncStorage.getItem('userdata'));
  }
  useEffect(() => {
    fetch();
  });

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          {showdata === null && (
            <Stack.Navigator>
              {console.log('showdata', showdata)}
              <Stack.Screen
                name="StartScreen"
                component={StartScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="OfferRideScreen"
                component={OfferRideScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="DriversAcceptedRides"
                component={DriversAcceptedRides}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="ReceiptScreen"
                component={ReceiptScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="YourRidesScreen"
                component={YourRidesScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="DriverEndScreen"
                component={DriverEndScreen}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="AblyTracking"
                component={AblyTracking}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="FoodScreen"
                component={FoodScreen}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="RegisterScreen"
                component={RegisterScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ResetPasswordScreen"
                component={ResetPasswordScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Connections"
                component={Connections}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ReferScreen"
                component={ReferScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="FromScreen"
                component={FromScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="FareNegotiation"
                component={FareNegotiation}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ToScreen"
                component={ToScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="RegisterVehicleScreen"
                component={RegisterVehicleScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ListVehiclesScreen"
                component={ListVehiclesScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="RegisterDriverScreen"
                component={RegisterDriverScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="NavigationScreen"
                component={NavigationScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ListRideRequestsScreen"
                component={ListRideRequestsScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="EditProfileScreen"
                component={EditProfileScreen}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="AvailableRidesScreen"
                component={AvailableRidesScreen}
                options={{
                  headerShown: false,
                }}
              />
              {/* <Stack.Screen
              name="FoodScreen"
              component={FoodScreen}
              options={{
                headerShown: false,
              }}
            /> */}
              <Stack.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          )}
          {showdata != null && (
            <Stack.Navigator>
              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="OfferRideScreen"
                component={OfferRideScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="YourRidesScreen"
                component={YourRidesScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="DriversAcceptedRides"
                component={DriversAcceptedRides}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ReceiptScreen"
                component={ReceiptScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="DriverEndScreen"
                component={DriverEndScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="AblyTracking"
                component={AblyTracking}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="FoodScreen"
                component={FoodScreen}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="RegisterScreen"
                component={RegisterScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ResetPasswordScreen"
                component={ResetPasswordScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Connections"
                component={Connections}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ReferScreen"
                component={ReferScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="FromScreen"
                component={FromScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="StartScreen"
                component={StartScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="FareNegotiation"
                component={FareNegotiation}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ToScreen"
                component={ToScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="RegisterVehicleScreen"
                component={RegisterVehicleScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ListVehiclesScreen"
                component={ListVehiclesScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="RegisterDriverScreen"
                component={RegisterDriverScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="NavigationScreen"
                component={NavigationScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ListRideRequestsScreen"
                component={ListRideRequestsScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="EditProfileScreen"
                component={EditProfileScreen}
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="AvailableRidesScreen"
                component={AvailableRidesScreen}
                options={{
                  headerShown: false,
                }}
              />
              {/* <Stack.Screen
              name="FoodScreen"
              component={FoodScreen}
              options={{
                headerShown: false,
              }}
            /> */}
              <Stack.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          )}
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}
