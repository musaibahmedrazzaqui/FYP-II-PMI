import {Provider} from 'react-redux';

// Screens
import AllRidesScreen from './screens/AllRidesScreen';
import HomeScreen from './screens/HomeScreen';
import SendReferral from './screens/SendReferral';
import DriverEndScreen from './screens/DriverEndScreen';
import ListPassengerRides from './screens/ListPassengerRides';
import SettingsScreen from './screens/SettingsScreen';
import AvailableRidesScreen from './screens/AvailableRidesScreen';
import PassengerCreateRide from './screens/PassengerCreateRide';
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
import GetPassengerRides from './screens/GetPassengerRides';
import RegisterVehicleScreen from './screens/RegisterVehicleScreen';
import RegisterDriverScreen from './screens/RegisterDriverScreen';
import ListVehiclesScreen from './screens/ListVehiclesScreen';
import NavigationScreen from './screens/NavigationScreen';
import ListRideRequestsScreen from './screens/ListRideRequestsScreen';
import FareNegotiation from './screens/FareNegotiation';
import DriversAcceptedRides from './screens/DriversAcceptedRides';
import OfferRideScreen from './screens/OfferRideScreen';
import NewHome from './screens/NewHome';
import ReceiptScreen from './screens/ReceiptScreen';
import DriverHome from './screens/DriverHome';
import PassengerHome from './screens/PassengerHome';
// Redux Store
import {store} from './store';

// Providers
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FoodScreen from './screens/FoodScreen';
import MailVerify from './screens/MailVerify';
// import SettingsScreen from './screens/SettingsScreen';
import {isPending} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
export function BottomTabNavigator() {
  const [showdata, setShowdata] = useState();
  async function fetch() {
    setShowdata(await AsyncStorage.getItem('userdata'));
  }
  useEffect(() => {
    fetch();
  });
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={LoggedinStack} />
      <Tab.Screen name="Profile" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
export function LoggedinStack() {
  const [showdata, setShowdata] = useState();
  async function fetch() {
    setShowdata(await AsyncStorage.getItem('userdata'));
  }
  useEffect(() => {
    fetch();
  });
  return (
    <Stack.Navigator>
      {console.log('showdata', showdata)}
      <Stack.Screen
        name="NewHome"
        component={NewHome}
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
        name="AllRidesScreen"
        component={AllRidesScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SendReferral"
        component={SendReferral}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="PassengerHome"
        component={PassengerHome}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DriverHome"
        component={DriverHome}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PassengerCreateRide"
        component={PassengerCreateRide}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="GetPassengerRides"
        component={GetPassengerRides}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ListPassengerRides"
        component={ListPassengerRides}
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
  );
}
export default function App() {
  const [showdata, setShowdata] = useState();
  async function fetch() {
    setShowdata(await AsyncStorage.getItem('userdata'));
  }
  useEffect(() => {
    fetch();
  });
  // const Drawer = createDrawerNavigator();
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
                name="SendReferral"
                component={SendReferral}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="NewHome"
                component={NewHome}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="AllRidesScreen"
                component={AllRidesScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="PassengerHome"
                component={PassengerHome}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="DriverHome"
                component={DriverHome}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="PassengerCreateRide"
                component={PassengerCreateRide}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="GetPassengerRides"
                component={GetPassengerRides}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ListPassengerRides"
                component={ListPassengerRides}
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
                name="Home"
                component={LoggedinStack}
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
