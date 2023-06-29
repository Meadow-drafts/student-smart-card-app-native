import { Modal, View, Text, Pressable, StyleSheet, } from 'react-native';
import { Icon} from 'react-native-elements'

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// import Icons from 'react-native-vector-icons/MaterialIcons';

export default function ResultDisplay({ isVisible, onClose, text }) {
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
        <Text>{text}</Text>
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
    content:{
      padding: 20,
      alignContent:"center"
      
    },
    contentTitle:{
      fontSize:20,
      fontWeight:"500",
      textAlign:"center",

    }
  });
  
