import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Text, TouchableOpacity,Button  } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import { StyleSheet } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import axios from 'axios'
import TableComponent from '../components/TableComponent';


const AttendanceScreen = () => {
  const flatListRef = useRef(null);

   
  
    // Render the calendar component
    return (
        <View style={styles.container}>
            <Text>Daily Attendance</Text>
          <TableComponent/>
        </View>
      );
  };
  
  export default AttendanceScreen;
  
  const styles = StyleSheet.create({
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
      },
        container: {
          flex: 1,
          paddingHorizontal: 20,
          paddingTop: 50,
        },    
      
    head: {
       height: 40,
       backgroundColor: '#78a6c8',
       fontWeight:'500',
       textAlign: 'center'
       },
    wrapper: {
       flexDirection: 'row' 
      },
    title: { 
      flex: 1,
      backgroundColor: '#78a6c8' },
    row: { height: 35, fontSize:10 , textAlign: 'center' },
    text: { textAlign: 'center' },
  });