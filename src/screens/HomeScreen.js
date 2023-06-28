import React from 'react';
import {SafeAreaView,StyleSheet, View, Text} from 'react-native';
import {Raleway_500Medium, useFonts} from '@expo-google-fonts/raleway'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Tabbar from "@mindinventory/react-native-tab-bar-interaction";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {NavigationContainer} from '@react-navigation/native'
import ScannerScreen from './ScannerScreen'
import UserProfile from '../components/UserProfile';
import Icon from 'react-native-vector-icons/FontAwesome'
import WelcomePage from '../components/WelcomePage';


const tabs =[
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
          case 'Profile':
            iconName = 'user';
            break;
          default:
            break;
        }
      
        return <Icon name={iconName} color={color} size={24} />;
      };


    function FirstScreen(){
        return(
            <>
            <UserProfile/>
            </>
        )
    }
    function SecondScreen(){
        return(
            <>
             {/* <Text>Scan Page</Text> */}
             <ScannerScreen/>
            </>
        )
    }

    function ThirdScreen(){
        return(
            <>
            <UserProfile/>
            </>
        )
    }

 const Tab = createBottomTabNavigator()

const HomeScreen = () => {
    const [fontsLoaded] = useFonts({
        raleway: Raleway_500Medium
    })
    if(!fontsLoaded){
        <Text>Loading</Text>;
        return null;
    }
    return(
       <NavigationContainer independent={true}>
        <Tab.Navigator screenOptions={({route}) => ({
        tabBarIcon: ({color}) => screenOptions(route, color),
        headerShown: false, 
        tabBarActiveTintColor:"#326789",
        tabBarInactiveTintColor:"#46474a",
        tabBarStyle:{
            elevation: 0,
        }
      })
      
    }
    
      >
            <Tab.Screen name = "Home" component={WelcomePage} />
            <Tab.Screen name = "Scanner" component={ScannerScreen} />
            <Tab.Screen name = "Profile" component={UserProfile} />
        </Tab.Navigator>
       </NavigationContainer>
    )
    //tab-based navigation
  
};

const styles=StyleSheet.create({
    container:{
        justifyContent: "center",
        backgroundColor:"cyan",
        flex: 1,
        alignItems: "center"
    }
})
export default HomeScreen;