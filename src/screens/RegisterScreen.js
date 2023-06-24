import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';



import InputField from '../components/InputField';
import SelectDropdown from 'react-native-select-dropdown'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';


import CustomButton from '../components/CustomButton';
const roles = ["admin", "ecurity", "User", "Delegate"]

const RegisterScreen = ({navigation}) => {


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
            textAlign:'center'
          }}>
          Register
        </Text>

        

        <InputField
          label={'Full Name'}
          icon={
            <Ionicons
              name="md-person"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
        />

        <InputField
          label={'Email ID'}
          icon={
            <Ionicons
              name="md-mail"
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
              name="md-key-sharp"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          inputType="password"
        />

        

     

        <CustomButton label={'Register'} onPress={() => {}} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{color: '#78a6c8', fontWeight: '700'}}> Login</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
            <Text style={{color: '#78a6c8', fontWeight: '700'}}> HomeScreen</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;