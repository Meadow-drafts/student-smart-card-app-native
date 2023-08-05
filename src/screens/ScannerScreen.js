import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button,Modal } from 'react-native';
import { BarCodeScanner  } from 'expo-barcode-scanner';
import BarcodeMask from 'react-native-barcode-mask';
import CustomButton from '../components/CustomButton';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import ResultDisplay from '../components/ResultDisplay';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'



const TAB_BAR_HEIGHT = 49;

export default function ScannerScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState({})
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [ongoing , setOngoing] = useState('');
  const [isScanning, setIsScanning] = useState(true); // New state for scanning control
  const [torchOn, setTorchOn] = useState(false);


  // get the token
  async function getToken() {
    try {
    let userDetails = await AsyncStorage.getItem('userInfo');
    console.log("user info is" + userDetails);
    console.log(userDetails.email)
    const details = JSON.parse(userDetails)
    setUser(details.user)
    console.log(user)
    } catch (error) {
    console.log("error while getting token",error);
    }
}

  const fetchOngoingCourses= async () => {
    try {
        await axios.get(`http://192.168.43.213:4000/ongoing`)
            .then((response) => {
                const result = response.data
                console.log('res', result[0].timetable.course)
                setOngoing(result[0].timetable.course)               
            })
    } catch (error) {
        console.log("error", error)
    }

}  
  useEffect(() => {
      getToken();
      fetchOngoingCourses();
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

  const desiredBarCodeTypes = [
    BarCodeScanner.Constants.BarCodeType.qr, // QR code
    BarCodeScanner.Constants.BarCodeType.code128, // Code 128
    // Add more barcode types as needed
  ];

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
     // Add a check for isScanning before handling the scan
     if (!isScanning) {
      return;
    } 
    setScanned(true);    
    const response = JSON.parse(data);
    setText(response);
    console.log(response.name);
    setIsScanning(false); // Disable scanning while the modal is open
    setIsModalVisible(true);
  };
  const toggleTorch = () => {
    setTorchOn(!torchOn);
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
    setScanned(false);
    setIsModalVisible(false);
    setText('');
    setIsScanning(true); // Re-enable scanning after closing the modal

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
          onBarCodeScanned={ handleBarCodeScanned}
          barCodeTypes={desiredBarCodeTypes}
          torchMode={torchOn ? 'on' : 'off'}
          style={{ height: 520, width: 500}}>
            <BarcodeMask width={300} height={300} showAnimatedLine={true} animatedLineColor='#326789' edgeColor="#326789"/>
          </BarCodeScanner>
      </View>
      <Text style={styles.maintext}>{!scanned && 'Not scanned yet'}</Text>
      <CustomButton label={"Scan Code"} onPress={() => setScanned(false)} />
      <Button
  title={torchOn ? 'Turn Off Torch' : 'Turn On Torch'}
  onPress={toggleTorch}
  color={torchOn ? 'tomato' : undefined}
/>

      {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} color='tomato' />}
      <ResultDisplay isVisible={isModalVisible} onClose={onModalClose} text={text} ongoing={ongoing} >
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