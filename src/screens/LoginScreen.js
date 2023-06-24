import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LoginSVG from '../images/login.svg';


import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
const image = require('../images/login.svg')

const LoginScreen = ({navigation}) => {
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

        <InputField
          label={'Email ID'}
          icon={
            <MaterialIcons
            name="email"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
          }
          keyboardType="email-address"
        />

<InputField
          label={'Password'}
          icon={
            <Ionicons
            name="md-key"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
          }
          inputType="password"
        />
        
        <CustomButton label={"Login"} onPress={() => {}} />

        

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

export default LoginScreen;