import React from 'react'
import { View, Text, TouchableOpacity,StyleSheet, Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Card , ListItem} from 'react-native-elements';


const CourseCard = ({specialty}) => {
  return (
    <TouchableOpacity
      style={styles.container}
    //   onPress={handleNavigate}
      >
        <TouchableOpacity
          style={styles.logoContainer}>
          <Ionicons
                name="book"
                size={20}
                color="#326789"
                style={styles.logoImage}
            />  
        </TouchableOpacity>
       

        <View style={styles.textContainer}>
          <Text style={styles.jobName} numberOfLines={1}>
           one
          </Text>
          <Text style={styles.jobType}>
           Fee: {specialty?.total_fee} XAF
          </Text>
        </View>

    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    card: {
        marginVertical: 16,
        gap: 12,
        paddingBottom: 30,
    },

    content: {
        backgroundColor: "white",
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 20,
        borderColor: "#78a6c8",
        borderWidth: 1,
        // marginVertical: 16,
    },
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



  