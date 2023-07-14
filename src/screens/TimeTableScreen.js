import React, { useState, useEffect } from 'react';
import { addDays } from 'date-fns';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import axios from 'axios'

// import { View, StyleSheet, ScrollView, Text } from 'react-native';
// import WeekCalendar from '../components/WeekCalendar';

import Period from '../components/timetables/Period';
import CalendarPicker from 'react-native-calendar-picker';
import { ListItem, Avatar } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';


const TmeTableScreen = () => {
    const [timetable, setTimetable] = useState({})
    const [weeklyTimetable, setWeeklyTimetable] = useState([])
    // const [monDayDate, setMonDayDate] = useState('')

    const [selectedStartDate, setSelectedStartDate] = useState(null);

    const onDateChange = (date) => {
        setSelectedStartDate(date);
    };

    const startDate = selectedStartDate ? selectedStartDate.toString() : '';

    const fetchTimetable = async () => {
        try {
            await axios.get('http://192.168.43.213:4000/timeTables/weeklyTimetable/2023-07-10')
                .then((response) => {
                    const result = response.data.timetable
                    console.log("result",result )
                    setWeeklyTimetable(result)
                    console.log("timetable", weeklyTimetable)
                })
        } catch (error) {
            console.log("error", error)
        }

    }

    //to get current monday of the week and pass it as parameter for the get time table api
    // const getMondayOfCurrentWeek = () => {
    //     const currentDate = new Date();
    //     const currentDay = currentDate.getDay();
    //     const daysUntilMonday = currentDay === 0 ? 6 : currentDay - 1;
    //     const mondayDate = new Date(currentDate.getTime());
    //     mondayDate.setDate(currentDate.getDate() - daysUntilMonday);
    //     console.log(mondayDate)
    //     setMonDayDate(mondayDate)
    //     console.log("monDayDate", monDayDate)
    //     return mondayDate;
    //   };
      
      
    useEffect(() => {
        fetchTimetable();
        // getMondayOfCurrentWeek()
        // getToken()
        // fetchUsers();
    }, []);
   
    return (
        <View style={styles.container}>
            <Text style={{color:'#326789', fontSize:16, fontWeight:'700', textAlign:'center', marginBottom:15, borderBottomColor:"#326789", borderBottomWidth: 1}}>Time Table</Text>
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

                    {weeklyTimetable.length > 0 && weeklyTimetable?.map((item) => (
                        <View style={styles.content} key={item._id}>
                        <ListItem bottomDivider>
                        <View style={{ flexDirection: 'column', }}>
                            <Text style={{color:'gray', fontSize:10, fontWeight:'700'}}>{item.time?.split('-')[0]}</Text>
                            <Ionicons
                                name="remove"
                                size={30}
                                color="#326789"
                                // style={{ transform: [{ rotate: '90deg' }], marginTop: 10 }}
                            />
                            <Text style={{color:'gray', fontSize:10, fontWeight:'700'}}>{item.time?.split('-')[1]}</Text>
                        </View>
            
                        <ListItem.Content>
                            <ListItem.Title style={{color:'#326789', fontSize:16, fontWeight:'700'}}>{item.course?.name}</ListItem.Title>
                            <ListItem.Subtitle style={{color:'gray', fontSize:11,}}>Teacher: {item.teacher?.name}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                    </View>
                    ))}
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
        paddingTop: 50,
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
        borderLeftColor: "#326789",
        borderLeftWidth: 3,
        // marginVertical: 16,
    },
});


export default TmeTableScreen;
