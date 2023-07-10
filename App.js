import React,{useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler'
import {NavigationContainer} from '@react-navigation/native'
import HomeScreen from './src/screens/HomeScreen';
import OnboardingScreen from './src/screens/OnboardingScreen'
import LoginScreen from './src/screens/LoginScreen'
import RegisterScreen from './src/screens/RegisterScreen'
import AllSpecialtiesScreen from './src/screens/AllSpecialtiesScreen';
import Notification from './src/screens/NotificationScreen'
import RequestScreen from './src/screens/RequestScreen';
import IncidentReportScreen from './src/screens/IncidentReportScreen';
import {createStackNavigator} from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Stack = createStackNavigator()
export default function App() {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(null);


 
  useEffect (()=> {
    async function fetchAppData (){
      const appData = await AsyncStorage.getItem('isAppFirstLaunched');
      if (appData == null) {
        setIsAppFirstLaunched(true);
        AsyncStorage.setItem('isAppFirstLaunched', 'false');
      } else {
        setIsAppFirstLaunched(false);
      }
    }

    fetchAppData()
  },[])

  return (
    isAppFirstLaunched != null && (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {isAppFirstLaunched && (
            <Stack.Screen
              name="OnboardingScreen"
              component={OnboardingScreen}
            />
          )}
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="AllSpecialtiesScreen" component={AllSpecialtiesScreen} />
          <Stack.Screen name="Notification" component={Notification} />
          <Stack.Screen name="Request" component={RequestScreen} />
          <Stack.Screen name="Report" component={IncidentReportScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
