import React, { useState, useEffect, useRef } from 'react';
import { addDays } from 'date-fns';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

// import { View, StyleSheet, ScrollView, Text } from 'react-native';
// import WeekCalendar from '../components/WeekCalendar';

import Period from '../components/timetables/Period';
import CalendarPicker from 'react-native-calendar-picker';
import { ListItem, Avatar } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';



const TmeTableScreen = () => {
    const [timetable, setTimetable] = useState({})
    const [weeklyTimetable, setWeeklyTimetable] = useState([])
    const [user, setUser] = useState('');

    const [mondayOfCurrentWeek, setMondayOfCurrentWeek] = useState('');
    const mondayRef = useRef('');

    // const [monDayDate, setMonDayDate] = useState('')

    const [selectedStartDate, setSelectedStartDate] = useState(null);

    const onDateChange = (date) => {
        setSelectedStartDate(date);
    };

    const startDate = selectedStartDate ? selectedStartDate.toString() : '';

    useEffect(() => {
        // Function to get the date for Monday of the current week
        const getMondayOfCurrentWeek = () => {
          const currentDate = new Date();
          const currentDay = currentDate.getDay();
          const diff = currentDay === 0 ? -6 : 1 - currentDay; // Adjust for Sunday as the first day of the week
          const monday = new Date(currentDate);
          monday.setDate(currentDate.getDate() + diff);
          return monday.toISOString().split("T")[0];
        };
    
        // Call the function to get the date for Monday of the current week
        const monday = getMondayOfCurrentWeek();
        const dateParts = monday.split("-");
        const year = dateParts[0];
        const month = dateParts[1];
        const day = dateParts[2];
        
        // Creating a new Date object using the input date parts
        const formattedDate = new Date(year, month - 1, day);
        
        // Using toLocaleDateString() to convert to desired format "m/d/yyyy"
        const convertedDate = formattedDate.toLocaleDateString("en-US");
        setMondayOfCurrentWeek(convertedDate);
        mondayRef.current = convertedDate; // Store the value in the ref
      }, []);

    // get the token
    async function getToken() {
    try {
        let userDetails = await AsyncStorage.getItem('userInfo');
        // console.log("user info is" + userDetails);
        // console.log(userDetails.email)
        const details = JSON.parse(userDetails)
        setUser(details.user)
        // console.log(user)
        } catch (error) {
        console.log("error while getting token",error);
    }
    }

    const fetchTimetable = async () => {
        console.log("test", mondayRef.current); // Access the value from the ref

        try {
            await axios.post(`http://192.168.43.213:4000/timetables/weeklyTimetable`, {
                weekStartDate:mondayRef.current,
                specialtyId: "648f91317dfa27d9439555f8"
            })
                .then((response) => {
                    const result = response.data.timetables
                    console.log('res', result)
                    const allTimetables = response.data.timetables.map(item => item.timetable).flat();
                    const dayOrder = {
                        Sunday: 0,
                        Monday: 1,
                        Tuesday: 2,
                        Wednesday: 3,
                        Thursday: 4,
                        Friday: 5,
                        Saturday: 6,
                      };

                      allTimetables.sort((a, b) => dayOrder[a.day] - dayOrder[b.day]);

                    setWeeklyTimetable(allTimetables)
                    console.log("timetable", weeklyTimetable)
                })
        } catch (error) {
            console.log("error", error)
        }

    }

    const getStatusColor = (status) => {
        switch (status) {
          case 'Planned':
            return '#326789';
          case 'Ongoing':
            return 'green';
          case 'Completed':
            return 'grey';
          default:
            return 'black'; // Default color if the status doesn't match any case
        }
      };

    useEffect(() => {
        getToken();
        fetchTimetable();
    }, []);
   
    return (
        <View style={styles.container}>
            <Text style={{color:'#326789', fontSize:16, fontWeight:'700', textAlign:'center', marginBottom:15, borderBottomColor:"#326789", borderBottomWidth: 1}}>Time Table</Text>
            <ScrollView>
            <CalendarPicker
                onDateChange={onDateChange}
                height={350}
                headerWrapperStyle={{
                    width: '70%'
                }}

            />

            <View>
                {/* <Text>SELECTED DATE: {startDate}</Text> */}

            </View>
            <View style={styles.card}>

                    { weeklyTimetable?.map((item) => (
                        <View style={styles.content} key={item._id}>
                        <ListItem bottomDivider>
                        <View style={{ flexDirection: 'column', }}>
                            <Text style={{color:'gray', fontSize:10, fontWeight:'700'}}>{item.startTime}</Text>
                            <Ionicons
                                name="remove"
                                size={30}
                                color="#326789"
                                // style={{ transform: [{ rotate: '90deg' }], marginTop: 10 }}
                            />
                            <Text style={{color:'gray', fontSize:10, fontWeight:'700'}}>{item.stopTime}</Text>
                        </View>
            
                        <ListItem.Content>
                            <ListItem.Title style={{color:'#326789', fontSize:16, fontWeight:'700'}}>{item.course?.name}</ListItem.Title>
                            <ListItem.Subtitle style={{color:'gray', fontSize:11,}}>Teacher: {item.teacher?.name}</ListItem.Subtitle>
                        </ListItem.Content>
                        <Text style={{color:'gray', fontSize:10, fontWeight:'700', textAlign:"center"}}>{item.day}</Text>
                        <Text style={{fontSize:8, fontWeight:'900', textAlign:"center", color: getStatusColor(item.status) }}>{item.status}</Text>

                    </ListItem>
                    
                    </View>
                    ))}
            </View>
            </ScrollView>
           

           
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: 50,
    },
    card: {
        marginVertical: 16,
        gap: 12,
        paddingBottom: 30,
    },

    content: {
        marginHorizontal: 20,
        borderLeftColor: "#326789",
        borderLeftWidth: 3,
    },
    timetableText: {
        fontSize: 16,
        fontWeight: 'bold',
      },
});


export default TmeTableScreen;
