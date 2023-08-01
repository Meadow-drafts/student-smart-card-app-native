import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button,Modal } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import BarcodeMask from 'react-native-barcode-mask';
import CustomButton from '../components/CustomButton';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import ResultDisplay from '../components/ResultDisplay';
import AsyncStorage from '@react-native-async-storage/async-storage'



const TAB_BAR_HEIGHT = 49;

export default function ScannerScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState({})
  const [isModalVisible, setIsModalVisible] = useState(false);
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

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    
    // console.log('Type: ' + type + '\nData: ' + data)
    const response = JSON.parse(data)
    setText(response)
    console.log(response.name)
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>)
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>)
  }
  const onModalClose = () => {
    setIsModalVisible(false);
    setText('');
  };
  // Return the View
  return (
    <View style={styles.container}>
      <View style={[styles.card, styles.elevation] }>
        <View>
          <Text style={styles.heading}>
            Scan QR Code
          </Text>
        </View>
        <Text>
          Scan code to get student information
        </Text>
      </View>
      <View style={styles.barcodebox}>
        <BarCodeScanner 
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 520, width: 500}}>
            <BarcodeMask width={300} height={300} showAnimatedLine={true} animatedLineColor='#326789' edgeColor="#326789"/>
          </BarCodeScanner>
      </View>
      <Text style={styles.maintext}>{!scanned && 'Not scanned yet'}</Text>
      <CustomButton label={"Scan Code"} onPress={() => setIsModalVisible(true)} />

      {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} color='tomato' />}
      <ResultDisplay isVisible={isModalVisible} onClose={onModalClose} text={text} >
        {/* <ResultList onCloseModal={onModalClose} weapons= {weapons} alcohol={alcohol} drugs={drugs}  skull={skull} gore={goreResults} nudity={nudityResults}/> */}
      </ResultDisplay>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // backgroundColor: '#f0f1f2',
    // opacity:0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 13,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 25,
    width: '80%',
    marginVertical: 10,
  },
  elevation: {
    elevation: 20,
    shadowColor: '#78a6c8',
  },

  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    // borderRadius: 30,
    backgroundColor: 'white'
  }
});