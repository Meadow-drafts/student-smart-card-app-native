import { Modal, View, Text, Pressable, StyleSheet, } from 'react-native';
import { Icon } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons';


import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// import Icons from 'react-native-vector-icons/MaterialIcons';

export default function ResultDisplay({ isVisible, onClose, text }) {
  const { name, email, role, phone, fee_paid } = text || {}; // Destructure the properties from the text object, providing an empty object as the default value

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Student Info</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color="#fff" size={22} />
          </Pressable>
        </View>
        <View style={styles.content}>
          <Text style={styles.contentTitle}>Verified <Icon name='verified' /></Text>
          <Text styel={{ flexDirection: 'row' }}>
            <Ionicons
              name="person"
              size={20}
              color="#326789"
              style={{ marginRight: 5, transform: [{ rotate: '2deg' }] }}
            /> :
            {name}
          </Text>
          <Text styel={{ flexDirection: 'row' }}>
            <Ionicons
              name="mail"
              size={20}
              color="#326789"
              style={{ marginRight: 5, transform: [{ rotate: '2deg' }] }}
            /> :
            {email}
          </Text>
          <Text styel={{ flexDirection: 'row' }}>
            <Ionicons
              name="call"
              size={20}
              color="#326789"
              style={{ marginRight: 5, transform: [{ rotate: '2deg' }] }}
            /> :
            {phone}
          </Text>
          <Text styel={{ flexDirection: 'row' }}>
            <Ionicons
              name="mail"
              size={20}
              color="#326789"
              style={{ marginRight: 5, transform: [{ rotate: '2deg' }] }}
            /> :
            {fee_paid} FCFA
          </Text>
          {/* <Text>{JSON.parse(text.name)}</Text> */}
        </View>

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
    padding: 20,
    alignContent: "center",
    justifyContent:'center',
    marginHorizontal:120,

  },
  contentTitle: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",

  }
});

