import React, { useState, useEffect } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Alert, TextInput } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { ListItem, Avatar, Input } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import CustomButton from '../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';


const Item = ({ item }) => {
    return (
        <View style={styles.content}>
            <ListItem bottomDivider>
                <Avatar
                    rounded
                    icon={{
                        name: 'person-outline',
                        type: 'material',
                        size: 26,
                    }}
                />
                <ListItem.Content>
                    <ListItem.Title>{item.title}</ListItem.Title>
                    <ListItem.Subtitle style={{ fontSize: 13 }}>{item.content}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        </View>
    )
}

const SendRequest = ({ navigation, fetchIncidents }) => {
    const [value, onChangeText] = useState('Useless Multiline Placeholder');
    const [userSpecialty, setUserSpecialty]= useState('')
    const [user, setUser] = useState('');
    const [title, setTitle] = useState('');
    const[content, setContent] = useState('')


    const [selectedStartDate, setSelectedStartDate] = useState(null);

    const onDateChange = (date) => {
        setSelectedStartDate(date);
    };

    const startDate = selectedStartDate ? selectedStartDate.toString() : '';

     // get the token
     async function getToken() {
        try {
        let userDetails = await AsyncStorage.getItem('userInfo');
        // console.log("user info is" + userDetails);
        const details = JSON.parse(userDetails)
        console.log('specialty info',details.user);
        setUserSpecialty(details.user.specialty._id)
        setUser(details.user._id)
        console.log("n",userSpecialty)
        } catch (error) {
        console.log("error while getting token",error);
        }
    }

      // Define a function to handle the form submission
  const handleSubmit = async () => {
    console.log(title)
    console.log(content)
    console.log(userSpecialty)
    console.log(user)
    // Validate the input fields
    if (!title || !content) {
      // Show an alert if any field is empty
      Alert.alert("Error", "Please enter your title and content.");
    } else {
      try {
        // Make a POST request to the API endpoint with the user object as the body
        await axios.post("http://192.168.43.213:4000/feedbacks", {
          title: title,
          content: content,
          specialty: userSpecialty,
          delegate: user,
        }).then((response) => {
          console.log(response.data);
          setTitle('');
          setContent('');
          fetchIncidents();
        })
      } catch (error) {
        // Handle the error
        console.error("Error sending request: ", error.message);
        // Show an alert with the error message
        Alert.alert("Error", "Something went wrong. Please try again later.");
      }
    }
  };


    useEffect(()=>{
        getToken()
      },[]);

    return (
        <View style={styles.container}>
            <View style={styles.card}>

                <View >
                    <Text style={{ textAlign: "center" }}>Do you wish to send a request?</Text>

                    <Input
                        placeholder='Request title'
                        value={title}
                        onChangeText={setTitle}
                        style={{ fontSize: 15, color: 'gray', marginTop: 10 }}

                    // leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                    />

                    <Input
                        placeholder="Fill in request"
                        value={content}
                        onChangeText={setContent}
                        multiline={true}
                        numberOfLines={4}
                        leftIcon={{ type: 'font-awesome', name: 'comment' }}
                        style={{ flexWrap: 'wrap', fontSize: 15, color: 'gray' }}
                    />

                    <TouchableOpacity
                        onPress={handleSubmit} 
                        style={{
                            backgroundColor: '#326789',
                            padding: 20,
                            borderRadius: 10,
                            marginBottom: 30,
                        }}>
                        <Text
                            style={{
                                textAlign: 'center',
                                fontWeight: '700',
                                fontSize: 16,
                                color: '#fff',
                            }}>
                            submit
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* <View style={{ flexDirection: "row", }}>
                    <CustomButton />
                    <CustomButton />
                </View> */}

            </View>

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
});


export default SendRequest;
