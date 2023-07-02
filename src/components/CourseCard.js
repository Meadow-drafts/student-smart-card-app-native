import React from 'react'
import { View, Text, TouchableOpacity,StyleSheet, Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';


const CourseCard = ({specialty}) => {
  return (
    <TouchableOpacity
      style={styles.container}
    //   onPress={handleNavigate}
      >
        <View
          style={styles.logoContainer}>
          <Ionicons
                name="book"
                size={20}
                color="#326789"
                style={styles.logoImage}
            />  
          <Ionicons
                name="book"
                size={20}
                color="#326789"
                style={styles.logoImage}
            />  
        </View>
       

        <View style={styles.textContainer}>
          <Text style={styles.jobName} numberOfLines={1}>
           {specialty?.name}Course name
          </Text>
          <Text style={styles.jobType}>
           Teacher: {specialty?.total_fee} XAF
          </Text>
        </View>

    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      backgroundColor: "white",
      borderRadius: 12,
      padding: 16,
      marginHorizontal: 20,
      borderColor: "#78a6c8",
      borderWidth: 1,
    },
    logoContainer: {
      width: 50,
      height: 50,
      backgroundColor: 'white',
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    logoImage: {
      width: "70%",
      height: "70%",
    },
    textContainer: {
      flex: 1,
      marginHorizontal: 16,
    },
    jobName: {
      fontSize: 16,
      fontWeight:"500",
    //   fontFamily: "DMBold",
      color: 'gray',
    },
    jobType: {
      fontSize: 12,
      color: '#78a6c8',
      marginTop: 3,
      fontWeight:"700"
    },
  });

export default CourseCard 



  