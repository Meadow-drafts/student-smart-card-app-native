import React, { useState } from 'react';
import { addDays } from 'date-fns';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';

// import { View, StyleSheet, ScrollView, Text } from 'react-native';
// import WeekCalendar from '../components/WeekCalendar';

import CalendarPicker from 'react-native-calendar-picker';
import CourseCard from '../components/CourseCard';
import SpecialtyCard from '../components/SpecialtyCard';
import { ListItem, Avatar } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';


const TmeTableScreen = () => {

    const [selectedStartDate, setSelectedStartDate] = useState(null);

    const onDateChange = (date) => {
        setSelectedStartDate(date);
    };

    const startDate = selectedStartDate ? selectedStartDate.toString() : '';

    return (
        <View style={styles.container}>
            <CalendarPicker
                onDateChange={onDateChange}
                height={350}
                headerWrapperStyle={{
                    width: '70%'
                }}

            />

            <View>
                <Text>SELECTED DATE: {startDate}</Text>

            </View>
            <View style={styles.card}>

                <View style={styles.content}>
                    <ListItem>
                        <View style={{ flexDirection: 'column', }}>
                            <Text>09:10</Text>
                            <Ionicons
                                name="pin"
                                size={20}
                                color="#326789"
                                style={{ transform: [{ rotate: '90deg' }], marginTop: 10 }}
                            />
                            <Text>09:10</Text>
                        </View>

                        <ListItem.Content>
                            <ListItem.Title>Physics</ListItem.Title>
                            <ListItem.Subtitle>Teacher: Example.com</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                </View>

                <View style={styles.content}>
                    <ListItem>
                        <View style={{ flexDirection: 'column', }}>
                            <Text>09:10</Text>
                            <Ionicons
                                name="pin"
                                size={20}
                                color="#326789"
                                style={{ transform: [{ rotate: '90deg' }], marginTop: 10 }}
                            />
                            <Text>09:10</Text>
                        </View>

                        <ListItem.Content>
                            <ListItem.Title>Physics</ListItem.Title>
                            <ListItem.Subtitle>Teacher: Example.com</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                </View>
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
        marginTop: 50,
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
