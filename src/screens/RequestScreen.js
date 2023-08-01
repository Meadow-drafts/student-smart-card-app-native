import React, { useState, useEffect } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { ListItem, Avatar, Input } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/CustomButton';
import SendRequest from '../components/requests/SendRequest'
import ViewRequest from '../components/requests/ViewRequest';
// import Tabs from './tabs';
import Tabs from '../components/requests/Tabs';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'

const Announcements = [
    {
        id: 1,
        title: "first announcement",
        content: "A lot of things to tell you about ourfirst announcement lorem ipsun test text",
        date: "2023/12/05",
    },
    {
        id: 2,
        title: "second announcement",
        content: "A lot of things to tell you about our second announcement lorem ipsun test text",
        date: "2022/12/05",
    },
    {
        id: 3,
        title: "third announcement",
        content: "A lot of things to tell you about our third announcement lorem ipsun test text",
        date: "2023/12/05",
    },
]
const tabs = ["All Requests", "Send Request"];


const Item = ({ item }) => {
    return (
        <View style={styles.content}>
            <ListItem bottomDivider>
            <Ionicons
                        name="md-newspaper"
                        size={20}
                        color="#326789"
                        style={{ marginRight: 0, transform: [{ rotate: '2deg' }] }}
                    />
                <ListItem.Content>
                    <ListItem.Title>{item.title}</ListItem.Title>
                    <ListItem.Subtitle style={{ fontSize: 13 }}>{item.content}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        </View>
    )
}

const RequestScreen = ({ navigation }) => {
    const [requests, setRequests] = useState([])
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [user, setUser] = useState('')
    const [userSpecialty, setUserSpecialty]= useState('')

     // get the token
     async function getToken() {
        try {
        let userDetails = await AsyncStorage.getItem('userInfo');
        // console.log("user info is" + userDetails);
        const details = JSON.parse(userDetails)
        console.log('specialty info',details.user.specialty._id);
        setUserSpecialty(details.user.specialty._id)
        console.log("n",userSpecialty)
        } catch (error) {
        console.log("error while getting token",error);
        }
    }
    

    const fetchIncidents = async () => {
        console.log("m",userSpecialty )
        try {
            await axios.get(`http://192.168.43.213:4000/feedbacks/specialty/64913c4f0d166ad42d603a22`)
                .then((response) => {
                    console.log(response.data)
                    const result = response.data.data
                    setRequests(result)
                    // console.log("Requests", result)
                    // console.log("Requests", requests)
                })
        } catch (error) {
            console.log("error", error)
        }

    }

   

    useEffect(()=>{
      // fetchSpecialties();
      getToken()
      // fetchUsers();
    },[]);

    const displayTabContent = () => {
        switch (activeTab) {
            case "All Requests":
                return (
                    <View style={styles.popularCards}>
                       {requests.map((item) =>(
                            <ViewRequest key={item._id} item={item}/>
                        ))}                       
                    </View>

                )
                break;
            case "Send Request":
                return (
                    <View style={styles.popularCards}>

                        <SendRequest fetchIncidents={fetchIncidents} />
                    </View>

                )
                break;

        }
    }


    useEffect(() => {
        fetchIncidents();
        // getToken()
        // fetchUsers();
    }, []);
    useEffect(() => {
    // console.log("Requests", requests); // Log the updated requests state
  }, [requests]);

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
                <Text style={styles.cardTitle}>Student Request</Text>
                <Ionicons
                    name="ellipsis-horizontal"
                    size={20}
                    color="#326789"
                    style={{ marginRight: 15, marginTop: 40, transform: [{ rotate: '2deg' }] }}
                />
            </View>
            {/* <ViewRequest /> */}

            <View style={{ padding: 12, paddingBottom: 100, marginLeft: 10 }}>
                <Tabs
                    tabs={tabs}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
                {displayTabContent()}
            </View>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        // marginTop: 50,
    },
    card: {
        marginVertical: 16,
        gap: 12,
        paddingBottom: 30,
    },
    inputArea: {
        borderWidth: 2,
        borderColor: "gray",
        margin: 20,
        // backgroundColor: "red",
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
    popularCards: {
        marginVertical: 16,
        gap: 12,
        paddingBottom: 30,
    },
});


export default RequestScreen;
