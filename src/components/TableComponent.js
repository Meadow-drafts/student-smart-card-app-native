import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TextInput } from 'react-native';
import axios from 'axios'

const tableData = [
    { id: 1, student: 'John', course: 'Math', date: '2023-06-29' },
    { id: 2, student: 'Jane', course: 'Science', date: '2023-06-30' },
    { id: 3, student: 'Alice', course: 'English', date: '2023-07-01' },
    // Add more objects as needed
];
const info= [    {
    "_id": "648fa7e4488fbc0b8508cc83",
    "course_id": {
        "_id": "648f9aac2d3822de668c4a96",
        "name": "Mobile Programming III",
        "specialty_id": "648f91317dfa27d9439555f8",
        "createdAt": "2023-06-19T00:00:44.430Z",
        "updatedAt": "2023-06-21T16:47:04.038Z",
        "__v": 0,
        "attendance": [
            "648fa87433c57cd7770a8f7f",
            "649329870543ad6677112b74"
        ]
    },
    "student_id": {
        "_id": "648f9a47c52023075b8b7a94",
        "name": "Mbimbe Darosa",
        "email": "darosa@gmail.com",
        "phone": "685123475",
        "fee_paid": 450000,
        "specialty_id": "648f91317dfa27d9439555f8",
        "attendance": [
            "648fa87433c57cd7770a8f7f"
        ],
        "createdAt": "2023-06-18T23:59:03.153Z",
        "updatedAt": "2023-06-19T00:59:32.679Z",
        "__v": 0,
        "avatar": "https://avatar.png",
        "role": "student",
        "address": "Bonanjo"
    },
    "status": true,
    "date": "2023-06-19T00:57:08.055Z",
    "createdAt": "2023-06-19T00:57:08.056Z",
    "updatedAt": "2023-06-19T00:57:08.056Z",
    "__v": 0
},
{
    "_id": "648fa87433c57cd7770a8f7f",
    "course_id": {
        "_id": "648f9aac2d3822de668c4a96",
        "name": "Mobile Programming III",
        "specialty_id": "648f91317dfa27d9439555f8",
        "createdAt": "2023-06-19T00:00:44.430Z",
        "updatedAt": "2023-06-21T16:47:04.038Z",
        "__v": 0,
        "attendance": [
            "648fa87433c57cd7770a8f7f",
            "649329870543ad6677112b74"
        ]
    },
    "student_id": {
        "_id": "648f9a47c52023075b8b7a94",
        "name": "Mbimbe Darosa",
        "email": "darosa@gmail.com",
        "phone": "685123475",
        "fee_paid": 450000,
        "specialty_id": "648f91317dfa27d9439555f8",
        "attendance": [
            "648fa87433c57cd7770a8f7f"
        ],
        "createdAt": "2023-06-18T23:59:03.153Z",
        "updatedAt": "2023-06-19T00:59:32.679Z",
        "__v": 0,
        "avatar": "https://avatar.png",
        "role": "student",
        "address": "Bonanjo"
    },
    "status": false,
    "date": "2023-06-19T00:59:32.657Z",
    "createdAt": "2023-06-19T00:59:32.662Z",
    "updatedAt": "2023-06-19T00:59:32.662Z",
    "__v": 0
},
{
    "_id": "649329870543ad6677112b74",
    "course_id": {
        "_id": "648f9aac2d3822de668c4a96",
        "name": "Mobile Programming III",
        "specialty_id": "648f91317dfa27d9439555f8",
        "createdAt": "2023-06-19T00:00:44.430Z",
        "updatedAt": "2023-06-21T16:47:04.038Z",
        "__v": 0,
        "attendance": [
            "648fa87433c57cd7770a8f7f",
            "649329870543ad6677112b74"
        ]
    },
    "student_id": {
        "_id": "648f9f9b99d8b48b2ed07b67",
        "name": "Mbimbe Khloe",
        "email": "khloe@gmail.com",
        "phone": "685123475",
        "fee_paid": 450000,
        "specialty_id": "648f91317dfa27d9439555f8",
        "attendance": [
            "649329870543ad6677112b74"
        ],
        "createdAt": "2023-06-19T00:21:47.880Z",
        "updatedAt": "2023-06-21T16:47:04.032Z",
        "__v": 0,
        "avatar": "https://avatar.png",
        "role": "student",
        "address": "logbessou"
    },
    "status": true,
    "date": "2023-06-21T16:47:03.977Z",
    "createdAt": "2023-06-21T16:47:03.979Z",
    "updatedAt": "2023-06-21T16:47:03.979Z",
    "__v": 0
}]

const tableHeader = ['Student', 'Course', 'Date'];



const TableComponent = () => {
    const [attendance, setAttendance] = useState([]) //replace table data


    const [filter, setFilter] = useState(null);

    const fetchAttendance = async() =>{
        try{
         await axios.get('http://192.168.43.213:4000/attendances')
         .then((response)=>{
            //  console.log(response.data.data)
            //  console.log(JSON.parse(response.data.data))
             const result = response.data.data
             setAttendance(result)
         })
     }catch(error){
         console.log("error",error)
     }
 
       }


    // Render function for each row of the table
    const renderRow = ({ item, index }) => {

        if (filter && !item.student_id.name.includes(filter) && !item.course_id.name.includes(filter)) {
            return null; // Skip rendering if the filter doesn't match student or course
        }

        return (
            <View style={styles.row}>
                <Text style={styles.cell}>{item.student_id.name}</Text>
                <Text style={styles.cell}>{item.course_id.name}</Text>
                <Text style={styles.cell}>{item.date.split('T')[0]}</Text>
            </View>
        );
    };


    useEffect(()=>{
        fetchAttendance();
      },[]);

    // Render the table
    return (
        
        <View>
      <TextInput
        style={styles.filterInput}
        placeholder="Filter by student or course"
        onChangeText={setFilter}
      />

      <FlatList
        data={attendance}
        keyExtractor={(item) => item._id.toString()}
        ListHeaderComponent={
          <View style={[styles.row, styles.headerRow]}>
            {tableHeader.map((header, index) => (
              <Text key={index} style={[styles.cell, styles.headerCell]}>
                {header}
              </Text>
            ))}
          </View>
        }
        renderItem={renderRow}
      />
    </View>


    );
};
export default TableComponent;

const styles = {
    filterInput: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
      },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 10,
    },
    headerRow: {
        backgroundColor: '#ccc',
    },
    cell: {
        flex: 1,
        paddingHorizontal: 10,
    },
    headerCell: {
        fontWeight: 'bold',
    },
};


