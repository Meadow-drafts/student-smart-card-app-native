import React ,{ useState } from 'react';
import { addDays } from 'date-fns';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';

// import { View, StyleSheet, ScrollView, Text } from 'react-native';
// import WeekCalendar from '../components/WeekCalendar';

  import CalendarPicker from 'react-native-calendar-picker';
  

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
            width:'70%'
          }}
          
        />
  
        <View>
          <Text>SELECTED DATE: {startDate}</Text>
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
  });


export default TmeTableScreen;
