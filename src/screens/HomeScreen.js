import React, {useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { Raleway_500Medium, useFonts } from '@expo-google-fonts/raleway'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Tabbar from "@mindinventory/react-native-tab-bar-interaction";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import ScannerScreen from './ScannerScreen'
import UserProfile from '../components/UserProfile';
import Icon from 'react-native-vector-icons/FontAwesome'
import WelcomePage from '../components/WelcomePage';
import AttendanceScreen from './AttendanceScreen'
import TimeTableScreen from './TimeTableScreen'
import WeeklyCalendar from '../components/WeekCalendar';
import useNotifications from '../hooks/useNotifications';
import TimerNotification from './testnotification'
import AsyncStorage from '@react-native-async-storage/async-storage'


const tabs = [
    {
        name: 'Home',
        activeIcon: <Ionicons name="alert-circle" color="#fff" size={25} />,
        inactiveIcon: <Ionicons name="alert" color="#4d4d4d" size={25} />
    },
    {
        name: 'list',
        activeIcon: <Ionicons name="alert-circle" color="#fff" size={25} />,
        inactiveIcon: <Ionicons name="alert" color="#4d4d4d" size={25} />
    },
    {
        name: 'camera',
        activeIcon: <Ionicons name="alert-circle" color="#fff" size={25} />,
        inactiveIcon: <Ionicons name="alert" color="#4d4d4d" size={25} />
    },
    {
        name: 'Notification',
        activeIcon: <Ionicons name="alert-circle" color="#fff" size={25} />,
        inactiveIcon: <Ionicons name="alert" color="#4d4d4d" size={25} />
    },
    {
        name: 'Profile',
        activeIcon: <Ionicons name="alert-circle" color="#fff" size={25} />,
        inactiveIcon: <Ionicons name="alert" color="#4d4d4d" size={25} />
    },

];

const screenOptions = (route, color) => {
    let iconName;

    switch (route.name) {
        case 'Home':
            iconName = 'home';
            break;
        case 'Scanner':
            iconName = 'qrcode';
            break;
        case 'Attendance':
            iconName = 'th-list';
            break;
        case 'TimeTable':
            iconName = 'table';
            break;
        case 'Profile':
            iconName = 'user';
            break;
        default:
            break;
    }

    return <Icon name={iconName} color={color} size={24} />;
};


function FirstScreen() {
    return (
        <>
            <UserProfile />
        </>
    )
}
function SecondScreen() {
    return (
        <>
            {/* <Text>Scan Page</Text> */}
            <ScannerScreen />
        </>
    )
}

function ThirdScreen() {
    return (
        <>
            <UserProfile />
        </>
    )
}

const Tab = createBottomTabNavigator()

const HomeScreen = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
      getToken();
    }, []);
  
    const getToken = async () => {
      try {
        let userDetails = await AsyncStorage.getItem('userInfo');
        const details = JSON.parse(userDetails);
        setUser(details.user);
      } catch (error) {
        console.log("Error while getting token", error);
      }
    };
  
    
    const [fontsLoaded] = useFonts({
        raleway: Raleway_500Medium
    })
    if (!fontsLoaded) {
        <Text>Loading</Text>;
        return null;
    }
    if (user && user.role === 'delegate') {
        return (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color }) => screenOptions(route, color),
              headerShown: false,
              tabBarActiveTintColor: "black",
              tabBarInactiveTintColor: "white",
              tabBarStyle: {
                elevation: 0,
                backgroundColor: "#326789",

              }
            })}
          >
            <Tab.Screen name="Home" component={WelcomePage} />
            <Tab.Screen name="TimeTable" component={TimeTableScreen} />
            <Tab.Screen name="Scanner" component={ScannerScreen} />
            <Tab.Screen name="Attendance" component={AttendanceScreen} />
            <Tab.Screen name="Profile" component={UserProfile} />
          </Tab.Navigator>
        );
      } else if (user && user.role === 'security') {
        return (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color }) => screenOptions(route, color),
              headerShown: false,
              tabBarActiveTintColor: "#326789",
              tabBarInactiveTintColor: "#46474a",
              tabBarStyle: {
                elevation: 0,
                backgroundColor: "#326789",

              }
            })}
          >
            <Tab.Screen name="Home" component={WelcomePage} />
            <Tab.Screen name="Scanner" component={ScannerScreen} />
            <Tab.Screen name="Profile" component={UserProfile} />
          </Tab.Navigator>
        );
      } else {
        return null; // or handle the case when user or user.role is undefined or does not match any conditions
      }
    //tab-based navigation

};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        backgroundColor: "#326789",
        flex: 1,
        alignItems: "center"
    }
})
export default HomeScreen;