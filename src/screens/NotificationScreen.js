import React, { useState, useEffect, useRef  } from 'react';
import {ScrollView, Button, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { ListItem, Avatar } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios'
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage'




// const Announcements = [
//     {
//         id: 1,
//         title: "first announcement",
//         content: "A lot of things to tell you about ourfirst announcement lorem ipsun test text",
//         date: "2023/12/05",
//     },
//     {
//         id: 2,
//         title: "second announcement",
//         content: "A lot of things to tell you about our second announcement lorem ipsun test text",
//         date: "2022/12/05",
//     },
//     {
//         id: 3,
//         title: "third announcement",
//         content: "A lot of things to tell you about our third announcement lorem ipsun test text",
//         date: "2023/12/05",
//     },
// ]

const Item = ({ item }) => {

  
    return (
        <View style={styles.content}>
            <ListItem bottomDivider>
            <Ionicons
                        name="md-newspaper"
                        size={20}
                        color="#326789"
                        style={{ marginRight: 5, transform: [{ rotate: '2deg' }] }}
                    />
                <ListItem.Content>
                    <ListItem.Title style={{ fontWeight: '700',}}>{item.title}</ListItem.Title>
                    <ListItem.Subtitle style={{fontSize: 12}}>{item.content}</ListItem.Subtitle>
                    <Text style={{fontSize: 8,  marginTop: 7,color:'grey'}}>{item.date.split('T')}</Text>
                  
                </ListItem.Content>
            </ListItem>
        </View>
    )
}

const Notification = ({navigation}) => {

    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [announcements, setAnnouncemnets] = useState([])
    const [user, setUser] = useState(null);

    // const previousAnnouncementsRef = useRef([]);
     
    
    const fetchAnnouncements = async () => {
        try {
            await axios.get('http://192.168.43.213:4000/announcements')
                .then((response) => {
                    // console.log(response)
                    const result = response.data.data
                    setAnnouncemnets(result)
                  
                })
        } catch (error) {
            console.log("error", error)
        }

    }

    useEffect(() => {
        fetchAnnouncements();
        }, []);       
      
        const getToken = async () => {
          try {
            let userDetails = await AsyncStorage.getItem('userInfo');
            const details = JSON.parse(userDetails);
            setUser(details.user);
            console.log(user.role)
          } catch (error) {
            console.log("Error while getting token", error);
          }
        };    
        useEffect(() => {
            getToken();
          }, []);
    
          const handlePress = () => {
            if (user.role === 'security') {
              navigation.navigate('Report');
            } else if (user.role === 'delegate') {
              navigation.navigate('Request');
            }
          };

    const onDateChange = (date) => {
        setSelectedStartDate(date);
    };

    const startDate = selectedStartDate ? selectedStartDate.toString() : '';

    return (
        <View style={styles.container}>
            <View style={styles.specialty}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 20, marginTop: 40 }}>
                    <Ionicons
                        name="md-chevron-back"
                        size={28}
                        color="#326789"
                        style={{ marginRight: 5, transform: [{ rotate: '2deg' }] }}
                    />
                    {/* <Image source={backIcon} style={{ width: 20, height: 20 }} /> */}
                </TouchableOpacity>
                <Text style={styles.cardTitle}>Notifications</Text>
                <TouchableOpacity onPress={handlePress}>
                {/* <TouchableOpacity onPress={() => navigation.navigate('Request')}> */}
                <Ionicons
                    name="md-create"
                    size={25}
                    color="#326789"
                    style={{ marginRight: 15, marginTop: 40, transform: [{ rotate: '2deg' }] }}
                />
                </TouchableOpacity>
                
            </View>

            <ScrollView style={styles.card}>            
                <FlatList
                    data={announcements}
                    renderItem={({ item }) => <Item item={item} />}
                    keyExtractor={item => item._id}
                />
            </ScrollView>

            <View >
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
    },
    card: {
        marginVertical: 16,
        gap: 12,
        paddingBottom: 30,
    },

    content: {
        // backgroundColor: "#78a6c8",
        // borderRadius: 12,
        padding: 6,
        marginHorizontal: 20,
        // borderLeftColor: "#326789",
        // borderLeftWidth: 3,
        // marginVertical: 16,
    },
    specialty: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
    },
    cardTitle: {
        fontSize: 16,
        // marginLeft: 20,
        paddingTop: 40,
        fontWeight: '700',
        color: '#326789',
    },
});


export default Notification;
