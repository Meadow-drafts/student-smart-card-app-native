import React, { useState, useEffect } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { ListItem, Avatar } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios'

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


const ViewIncidents = ({navigation, item}) => {

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
                    <Text style={{fontSize: 8,  marginTop: 7,color:'grey', textAlign:'right'}}>{item.date.split('T')[0]}</Text>
                  
                </ListItem.Content>
            </ListItem>
        </View>
    )
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


export default ViewIncidents;
