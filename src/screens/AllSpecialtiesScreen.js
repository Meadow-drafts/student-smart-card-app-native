import React, { useState, useEffect } from 'react';
import axios from 'axios'
// import "expo-router/entry";
import { ScrollView, Text, View, StyleSheet, ImageBackground, Button, Modal, TextInput, Image, TouchableOpacity, StatusBar, FlatList } from 'react-native';
import { Avatar, ListItem, Icon, SearchBar } from 'react-native-elements'
import Tabs from './tabs';
import SpecialtyCard from '../components/SpecialtyCard';
import SpecialtyDetailsCard from '../components/SpecialtyDetailsCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage'

const tabs =["Level 1", "Level 2", "Level 3"] ;

const image = require('../images/value.png');
const API_URL = "http://localhost:400"
export default function AllSpecialtiesScreen({ navigation }) {
    const [specialties, setSpecialties] = useState([])
    const [activeTab, setActiveTab] = useState(tabs[0]);


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

    
    const displayTabContent = ()=>{
        switch (activeTab){
            case "Level 1":
                return (
                    <View style={styles.popularCards}>
                          {specialties
            ?.filter((specialty) => specialty.level === 1)
            .map((specialty) => (
                    <SpecialtyDetailsCard specialty={specialty} key={specialty._id}
                    />
                ))}
                    </View>
                   
                )
                break;
                case "Level 2":
                    return (
                        <View style={styles.popularCards}>
                              {specialties
            ?.filter((specialty) => specialty.level === 2).map((specialty) => (
                        <SpecialtyDetailsCard specialty={specialty} key={specialty._id}
                        />
                    ))}
                        </View>
                       
                    )
                    break;
                case "Level 3":
                    return (
                        <View style={styles.popularCards}>
                              {specialties
            ?.filter((specialty) => specialty.level === 3).map((specialty) => (
                        <SpecialtyDetailsCard specialty={specialty} key={specialty._id}
                        />
                    ))}
                        </View>
                       
                    )
                break;
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

            <View style={styles.team}>
                <View style={styles.specialty}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10, marginTop: 40 }}>
                        <Ionicons
                            name="md-chevron-back"
                            size={28}
                            color="#326789"
                            style={{ marginRight: 0, transform: [{ rotate: '2deg' }] }}
                        />
                        {/* <Image source={backIcon} style={{ width: 20, height: 20 }} /> */}
                    </TouchableOpacity>
                    <Text style={styles.cardTitle}>All Specialties</Text>
                    <Ionicons
                        name="ellipsis-horizontal"
                        size={20}
                        color="#326789"
                        style={{ marginRight: 15, marginTop: 40, transform: [{ rotate: '2deg' }] }}
                    />
                </View>
                <View style={{padding:12, paddingBottom:100, marginLeft:10}}>
                            <Tabs
                                tabs={tabs}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />
                            {displayTabContent()}
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
    popularCards: {
        marginVertical: 16,
        gap: 12,
        paddingBottom: 30,
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