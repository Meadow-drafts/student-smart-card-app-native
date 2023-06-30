import React, { useState, useEffect } from 'react';
import axios from 'axios'
// import "expo-router/entry";
import { ScrollView, Text, View, StyleSheet, ImageBackground, Button, Modal, TextInput, Image, TouchableOpacity, StatusBar, FlatList } from 'react-native';
import { Avatar, ListItem, Icon, SearchBar } from 'react-native-elements'

import SpecialtyCard from '../components/SpecialtyCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage'


const image = require('../images/value.png');
const API_URL = "http://localhost:400"
export default function AllSpecialtiesScreen({ navigation }) {
    const [specialties, setSpecialties] = useState([])

    const fetchSpecialties = async () => {
        try {
            await axios.get('http://192.168.43.213:4000/specialties')
                .then((response) => {
                    // console.log(response)
                    const result = response.data.data
                    setSpecialties(result)
                })
        } catch (error) {
            console.log("error", error)
        }

    }


    //   // get the token
    //     async function getToken() {
    //         try {
    //         let userDetails = await AsyncStorage.getItem('userInfo');
    //         // console.log("user info is" + userDetails);
    //         setUser(userDetails)
    //         } catch (error) {
    //         console.log("error while getting token",error);
    //         }
    //     }

    useEffect(() => {
        fetchSpecialties();
        // getToken()
        // fetchUsers();
    }, []);

    // Return the View
    return (
        // onPress={() => navigation.navigate('HomeScreen')}

        <ScrollView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginHorizontal: 30, marginTop: 10 }}>
                <Ionicons
                    name="arrow-back-outline"
                    size={20}
                    color="#326789"
                    style={{ marginRight: 45, transform: [{ rotate: '2deg' }] }}
                />
                {/* <Image source={backIcon} style={{ width: 20, height: 20 }} /> */}
            </TouchableOpacity>
            <Text>Specialties</Text>

            <View style={styles.team}>
                <View style={styles.specialty}>
                    <Text style={styles.cardTitle}>Specialties</Text>
                    <Text style={styles.cardTitle}>See more</Text>
                </View>

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
        paddingTop: StatusBar.currentHeight,

    },
    image: {
        // marginTop: 10
    },

    userName: {
        fontSize: 24,
        color: "#312651",
        marginTop: 2,
        fontWeight: '900',
    },
    welcomeMessage: {
        marginTop: 2,
    },
    heading: {
        fontSize: 22,
        fontWeight: '900',
        marginBottom: 13,
    },
    profilecard: {
        alignItems: 'center',
    },
    specialty: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    cardTitle: {
        fontSize: 16,
        marginLeft: 20,
        paddingTop: 40,
        fontWeight: '500',
        color: 'gray',
    },
    teamCards: {
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
        marginTop: 100,
        marginHorizontal: 50,
        alignItems: "center",
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