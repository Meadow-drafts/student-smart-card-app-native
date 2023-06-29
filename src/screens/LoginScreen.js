import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Alert,
  // Picker,
} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import {Picker} from 'react-native-picker/picker';
import LoginSVG from '../images/login.svg';
import AsyncStorage from '@react-native-async-storage/async-storage'



import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
const image = require('../images/login.svg')

const LoginScreen = ({navigation}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'Admin', value: 'admin'},
    {label: 'Security', value: 'security'},
    {label: 'Delegate', value: 'delegate'},
  ]);
  const[userInfo, setUserInfo] = useState("")


  // Define a function to handle the form submission
  const handleSubmit = async () => {
    // Validate the input fields
     if (!email || !password || !role) {
      // Show an alert if any field is empty
      Alert.alert("Error", "Please enter your username and password.");
    } else {     
      try {
        // Make a POST request to the API endpoint with the user object as the body
         await axios.post("http://192.168.43.213:4000/auth/users/login", {
          email: email,
          password: password,
          role: role,
        }).then((response) =>{
          console.log(response.data)
           // Create an object with the user credentials
      const user = response.data
      console.log(user)
      // Store the access token on device storage
      AsyncStorage.setItem('userInfo', JSON.stringify(user), (error) => {
        if (error) {
          console.log(error);
        }
      });
        })
      } catch (error) {
        // Handle the error
        console.error("Error logging in: ", error.message);
        // Show an alert with the error message
        Alert.alert("Error", "Something went wrong. Please try again later.");
      }
    }
  };

    
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <View style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center'}}>
           
            <Ionicons
            name="md-planet-sharp"
            size={80}
            color="#326789"
            style={{marginRight: 5, transform: [{rotate: '2deg'}]}}
          />
            <Text
            style={{
                // fontFamily: 'Roboto-Medium',
                fontSize: 10,
                fontWeight: '500',
                color: '#333',
                marginBottom: 10,
              }}>Ace-Up</Text>
         
        </View>

        <Text
          style={{
            // fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
            textAlign: 'center'
          }}>
          Login
        </Text>
    <View
      style={{
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
      }}>
       <MaterialIcons
            name="email"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
    
        <TextInput
          placeholder='Email address'
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={{flex: 1, paddingVertical: 0}}
        />
           
    </View>

    <View
      style={{
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
      }}>
         <Ionicons
            name="md-key"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
    
        <TextInput
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          multiline={false}
          style={{flex: 1, paddingVertical: 0}}
        />
           
    </View>

        <DropDownPicker
          open={open}
          value={role}
          items={items}
          setOpen={setOpen}
          setValue={setRole}
          setItems={setItems}
          maxHeight={100}
          translation={{
            PLACEHOLDER: "Select a role"
          }}
          onChangeValue={setRole}
          style={open ? styles.openDrop : styles.closeDrop}
        
        />
        
        <CustomButton label={"Login"} onPress={handleSubmit} />
       

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 30,
          }}>
        
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={{color: '#78a6c8', fontWeight: '700'}}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  openDrop:{
    backgroundColor: "#dfdfdf",
    borderWidth: 0,
    borderBottomColor: "black",
    marginBottom: 100,
  },
  closeDrop:{
    backgroundColor: "#f7f6f2",
    borderWidth: 0,
    borderBottomColor: "black",
    marginBottom: 15,
  }
})

export default LoginScreen;