import React from 'react';
import {SafeAreaView,StyleSheet, View, Text} from 'react-native';
import {Raleway_500Medium, useFonts} from '@expo-google-fonts/raleway'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Tabbar from "@mindinventory/react-native-tab-bar-interaction";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {NavigationContainer} from '@react-navigation/native'
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
    function FirstScreen(){
        return(
            <>
            <Text>Welcome Page</Text>
            </>
        )
    }
    function SecondScreen(){
        return(
            <>
             <Text>Scan Page</Text>
            </>
        )
    }

    function ThirdScreen(){
        return(
            <>
            <Text>Profile Page</Text>
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
        <Tab.Navigator>
            <Tab.Screen name = "First" component={FirstScreen} />
            <Tab.Screen name = "Second" component={SecondScreen} />
            <Tab.Screen name = "Third" component={ThirdScreen} />
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