import React, { useState, useEffect } from 'react';
import { ScrollView,Text, View, StyleSheet,Image, Button,Modal } from 'react-native';
import {Avatar, ListItem, Icon} from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage'



export default function UserProfile({navigation}) {

  const [user, setUser] = useState('')
    const account = [
        {
          title: 'Name',
          value: (`${user.email}`),
          icon: 'person'
        },
        {
          title: 'Email',
          value: (`${user.email}`),
          icon: 'mail'
        },
        {
          title: 'Role',
          value: (`${user.role}`),
          icon: 'archive'
        },
        {
          title: 'School',
          value: 'Unknown Institute',
          icon: 'school'
        },
      ]
      const more = [
        {
          title: 'About Us',
          value: 'JaneDoe',
          icon: 'info'
        },
        {
          title: 'How to use',
          value: 'JaneDoe@gmail.com',
          icon: 'engineering'
        },
    
      ]

      // get the token
      async function getToken() {
        try {
        let userDetails = await AsyncStorage.getItem('userInfo');
        console.log("user info is" + userDetails);
        console.log(userDetails.email)
        setUser(JSON.parse(userDetails))
        console.log(user?.email)
        } catch (error) {
        console.log("error while getting token",error);
        }
    }

    useEffect(()=>{
      // fetchSpecialties();
      getToken()
      // fetchUsers();
    },[]);
  // Return the View
  return (
    <ScrollView style={styles.container}>
        <View style={styles.logout}>
        <Icon name="logout"/>
        </View>
      <View style={styles.profilecard}>
        <View>
        <Avatar
            rounded
            size="large"
            source={{
                uri:
                'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
            }}
            />
            <Text style={styles.heading}>{user?.email}</Text>
            <Text>Role: {user?.role}</Text>
        </View>          
         
      </View>
      {/* <View>
  
        </View> */}
        <Text style={styles.account}>Account</Text>
      <View style={[styles.card, styles.elevation] }>
      {
            account.map((item, i) => (
            <ListItem key={i} bottomDivider>
                <Icon name={item.icon} />
                <ListItem.Content>
                <ListItem.Title>{item.title}</ListItem.Title>
                <ListItem.Subtitle>{item.value}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
            ))
        }
      </View>

      <Text style={styles.account}>More...</Text>
      <View style={[styles.card, styles.elevation] }>
      {
            more.map((item, i) => (
            <ListItem key={i} bottomDivider>
                <Icon name={item.icon} />
                <ListItem.Content>
                <ListItem.Title>{item.title}</ListItem.Title>
                <ListItem.Subtitle>{item.value}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
            ))
        }
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 40,
    paddingHorizontal: 15
  },
  heading: {
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 13,
  },
  profilecard:{
    alignItems: 'center',
    marginTop: 10,
    flexDirection:"row",
    justifyContent:"center"
  },  
  logout:{
    alignItems:"flex-end"
    // alignSelf:"flex-end",
  }
  ,
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 25,
    width: '100%',
    marginVertical: 10,
  },
  elevation: {
    elevation: 20,
    shadowColor: '#78a6c8',
  },
  account:{
    textAlign: "left",
    color:"#78a6c8",
    paddingTop: 15,
    fontWeight:'700',
  },

  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    // borderRadius: 30,
    backgroundColor: 'white'
  }
});