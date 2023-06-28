import React, { useState, useEffect } from 'react';
import axios from 'axios'
// import "expo-router/entry";
import {ScrollView, Text, View, StyleSheet, ImageBackground, Button,Modal, TextInput,Image, TouchableOpacity,StatusBar,FlatList } from 'react-native';
import {Avatar, ListItem, Icon, SearchBar } from 'react-native-elements'
import ScreenHeaderBtn from './ScreenHeaderBtn'
import TeamCards from './TeamCards';
import ProfileHeader from "react-native-profile-header"
import SpecialtyCard from './SpecialtyCard'
import Ionicons from 'react-native-vector-icons/Ionicons';
import value from '../images/value.png'

const image = require('../images/value.png');
const API_URL ="http://localhost:400"
export default function WelcomePage({navigation}) {
    const [specialties, setSpecialties] = useState([])
    const [users, setUsers] = useState([])

    // const specialties = [
    //     {
    //       title: 'Test',
    //       second: 'software eng 3'
    //     },
    //     {
    //       title: 'Test',
    //       second: 'software eng2'
    //     },
    //     {
    //       title: 'Test',
    //       second: 'software eng1'
    //     },
    //     {
    //       title: 'Test',
    //       second: 'cnms 1'
    //     },
    //     {
    //       title: 'Test',
    //       second: 'cnms2'
    //     },
    //     {
    //       title: 'Test',
    //       second: 'cnms3'
    //     },
    //   ]

      const members =[
        {   
            id:1555,
            user:"https://images.unsplash.com/photo-1558979158-65a1eaa08691?w=500&h=500&fit=crop"
        },
        {
            id:54542,
            user:"https://unsplash.com/photos/a-woman-in-pink-shorts-and-a-white-jacket-holding-a-cup-2i2QbPNCVIU"
        },
        {
            id:48746,
            user:"https://unsplash.com/photos/a-woman-in-pink-shorts-and-a-white-jacket-holding-a-cup-2i2QbPNCVIU"
        }
        ,{
            id:311,
            user:"https://unsplash.com/photos/a-woman-standing-in-a-dark-room-with-her-eyes-closed-lFwJlFnHXys"
        }
      ]
      function handleClick(){

      }

      const fetchSpecialties = async() =>{
       try{
        await axios.get('http://192.168.43.213:4000/specialties')
        .then((response)=>{
            // console.log(response)
            const result = response.data.data
            setSpecialties(result)
        })
    }catch(error){
        console.log("error",error)
    }

      }


      const fetchUsers = async() =>{
       await axios.get(`http://192.168.43.213:4000/auth/users`)
        .then((response)=>{
            console.log('users',response)
            setUsers(response.data)
        })
      }
      useEffect(()=>{
        fetchSpecialties();
        fetchUsers();
      },[]);

  // Return the View
  return (
    // onPress={() => navigation.navigate('HomeScreen')}
    
        <ScrollView style={styles.container}>
            
        <ImageBackground source={image} resizeMode="contain" style={styles.image} >
            <ProfileHeader onProfilePicPress={() => navigation.navigate('Profile')} disableFirstIcon={true} disableSecondIcon={true} leftAlignedButtonImageSource={value} />
            <View style={[styles.card, styles.elevation] }>
                    <Avatar
                    rounded
                    size="large"
                    source={{
                        uri:
                        'https://images.unsplash.com/photo-1558979158-65a1eaa08691?w=500&h=500&fit=crop',
                    }}
                    containerStyle={{ position: 'absolute', top: -40 }}
                    />
                <Text style={styles.userName}>Hi, Jane Doe</Text>
                <Text style={styles.welcomeMessage}>Lorem ipsum test text</Text>
            </View>    
         </ImageBackground>
        <View style={styles.team}>
            <Text style={styles.cardTitle}>Team</Text>
            <View style={styles.teamCards}>
            <FlatList
            data={users}
            renderItem={({ item }) => 
              <TeamCards
                item={item} key={item?._id}
              />
            }
            keyExtractor={item => item?._id}
            contentContainerStyle={{ columnGap: 16}}
            horizontal
          />
            
             </View>
            <Text style={styles.cardTitle}>Specialties</Text>
            <View style={styles.popularCards}>
                {specialties?.map((specialty) => (
                    <SpecialtyCard specialty={specialty} key={specialty._id}
                    />
                ))}
            </View>
        </View>
     
    
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop:StatusBar.currentHeight,
  
  },
image:{
    // marginTop: 10
},
 
  userName: {
    fontSize: 24,
    color: "#312651",
    marginTop: 2,
    fontWeight : '900',
  },
  welcomeMessage: {
     marginTop: 2,
  },
  heading: {
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 13,
  },
  profilecard:{
    alignItems: 'center',
  }, 
  cardTitle:{
    fontSize:16,
    marginLeft:20,
    paddingTop: 40,
    fontWeight:'500',
    color:'gray'
  }, 
  teamCards:{
    marginLeft: 50,
  },
  popularCards: {
    marginVertical: 16,
    gap: 12,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 25,
    // paddingVertical: 40,
    // paddingHorizontal: 45,
    // width: '100%',
    marginTop:100,
    marginHorizontal: 50,
    alignItems:"center",
    justifyContent: "center",
    height: 170
  },
  elevation: {
    elevation: 20,
    shadowColor: '#78a6c8',
  },

  maintext: {
    fontSize: 16,
    margin: 20,
  },

});