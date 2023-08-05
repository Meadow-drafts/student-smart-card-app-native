import React, { useState, useEffect } from 'react';

import { Modal, View, Text, Pressable, StyleSheet,TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';


import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// import Icons from 'react-native-vector-icons/MaterialIcons';

export default function ResultDisplay({ isVisible, onClose, text, ongoing }) {
  const { name, email, role, phone, fee_paid, _id, specialty_id } = text || {}; // Destructure the properties from the text object, providing an empty object as the default value

  const [user, setUser] = useState(null);

  const [attendance, setAttendance] = useState([]) //replace table data


  const getToken = async () => {
    try {
      let userDetails = await AsyncStorage.getItem('userInfo');
      const details = JSON.parse(userDetails);
      setUser(details.user);
      console.log(user.role)
    } catch (error) {
      console.log("Error while getting token", error);
    }
  };    

  const handleSubmit = async () => {
    console.log("id",_id)
    console.log("on",ongoing)
    // Validate the input fields
    if (!_id || !ongoing) {
        // Show an alert if any field is empty
        Alert.alert("Error", "Please enter your title and content.");
    } else {
        try {
            // Make a POST request to the API endpoint with the user object as the body
            await axios.post("http://192.168.43.213:4000/attendances", {
                student_id: _id,
                course_id: ongoing,
                status: true,
            }).then((response) => {
                console.log(response.data);
                fetchAttendance()
            })
        } catch (error) {
            // Handle the error
            console.error("Error sending request: ", error.message);
            // Show an alert with the error message
            Alert.alert("Error", "Something went wrong. Please try again later.");
        }
    }
};
const fetchAttendance = async () => {
  try {
      await axios.get(`http://192.168.43.213:4000/attendances/course/${ongoing }`)
          .then((response) => {
               console.log(response.data.data)
              //  console.log(JSON.parse(response.data.data))
              const result = response.data.data
              setAttendance(result)
          })
  } catch (error) {
      console.log("error", error)
  }

}
  useEffect(() => {
      getToken();
    }, []);

   const markAttendance = async(ongoing,_id ) =>{
    //console.log(`Marking attendance for ${text}`);
   } 

    const renderPresentButton = () => {
      if (user?.role === 'delegate' && ongoing) {
        return (
          <TouchableOpacity
            style={styles.presentButton}
            onPress={handleSubmit}
          >
            <Text style={styles.presentButtonText}>Present</Text>
          </TouchableOpacity>
        );
      }
      return null;
    };
    

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>STUDENT INFORMATION</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color="#fff" size={22} />
          </Pressable>
        </View>
        <View style={styles.content}>
          <Text style={styles.contentTitle}>{_id ? 'Verified' : "not verified"} <Icon name='verified' /></Text>
          <Text style={{ flexDirection: 'row', fontWeight: '500', fontSize: 16, padding: 10, borderBottomColor: 'gray', borderBottomWidth: 1 }}>
            <Ionicons
              name="school-sharp"
              size={20}
              color="#326789"
              style={{ marginRight: 5, transform: [{ rotate: '2deg' }] }}
            />  {name}
          </Text>
          <Text style={{ flexDirection: 'row', padding: 5, }}>
            <Ionicons
              name="md-git-commit-outline"
              size={15}
              color="#326789"
              style={{ marginRight: 5, transform: [{ rotate: '360deg' }] }}
            /> {specialty_id?.name}
          </Text>
          <Text style={{ flexDirection: 'row', padding: 5, }}>
            <Ionicons
              name="md-git-commit-outline"
              size={15}
              color="#326789"
              style={{ marginRight: 5, transform: [{ rotate: '2deg' }] }}
            /> Level {specialty_id?.level}
            <Ionicons
              name="pin"
              size={20}
              color="#326789"
              style={{ marginRight: 0, transform: [{ rotate: '2deg' }] }}
            />{specialty_id?.total_fee} FCFA
          </Text>

          <Text style={{ flexDirection: 'row', padding: 5, }}>
            <Ionicons
              name="md-git-commit-outline"
              size={15}
              color="#326789"
              style={{ marginTop: 25, transform: [{ rotate: '2deg' }] }}
            /> Paid : {fee_paid} FCFA
          </Text>
          {/* <Text>{JSON.parse(text.name)}</Text> */}
        </View>
      
       {/*present button  */}
       {renderPresentButton()}       

      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    height: '40%',
    width: '100%',
    backgroundColor: 'white',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
  },
  titleContainer: {
    height: '16%',
    backgroundColor: '#326789',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
  content: {
    // padding: 20,
    alignContent: "center",
    justifyContent: 'center',
    // marginHorizontal:120,

  },
  contentTitle: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",

  },
  presentButton: {
    backgroundColor: '#326789',
    padding: 10,
    borderRadius: 10,
    marginBottom: 30,
    width: 100,
    alignSelf: 'center',
  },
  presentButtonText: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    color: '#fff',
  },
});

