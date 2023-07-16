import React, { useState, useEffect } from 'react';

import { Modal, View, Text, Pressable, StyleSheet,TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage'



import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// import Icons from 'react-native-vector-icons/MaterialIcons';

export default function ResultDisplay({ isVisible, onClose, text }) {
  const { name, email, role, phone, fee_paid, _id, specialty_id } = text || {}; // Destructure the properties from the text object, providing an empty object as the default value

  const [user, setUser] = useState(null);

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
  useEffect(() => {
      getToken();
    }, []);

    const renderPresentButton = () => {
      if (user?.role === 'delegate') {
        return (
          <TouchableOpacity
            style={styles.presentButton}
            onPress={() => console.log('Present button pressed')}
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

