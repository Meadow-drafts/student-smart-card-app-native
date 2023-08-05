import React,{useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , ActivityIndicator} from 'react-native';
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
import useNotifications from './src/hooks/useNotifications';
import {createStackNavigator} from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo'
import AnnouncementNotificationService from './src/services/AnnouncementNotificationService';

const Stack = createStackNavigator()
export default function App() {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);




   // get the token
   async function getToken() {
    try {
    let userDetails = await AsyncStorage.getItem('userInfo');
    const details = JSON.parse(userDetails)
    let token = details.accessToken
    if(token){
      setIsAuthenticated(true)
    }
    } catch (error) {
    console.log("error while getting token",error);
    }
    setIsLoading(false);
}

useEffect(()=>{
  // fetchSpecialties();
  getToken()
  // fetchUsers();
},[]);
 
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
  useEffect(()=>{
  
  },[]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }


  return (
    isAppFirstLaunched != null && (
      <NavigationContainer>
        {/* <AnnouncementNotificationService/> */}

        <Stack.Navigator screenOptions={{headerShown: false}}>
        {isAppFirstLaunched ? (
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        ) : (
          <>
          
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen
                  name="AllSpecialtiesScreen"
                  component={AllSpecialtiesScreen}
                />
                <Stack.Screen name="Notification" component={Notification} />
                <Stack.Screen name="Request" component={RequestScreen} />
                <Stack.Screen name="Report" component={IncidentReportScreen} />
             
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen
                  name="RegisterScreen"
                  component={RegisterScreen}
                />
              </>
            
        )}
         
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
