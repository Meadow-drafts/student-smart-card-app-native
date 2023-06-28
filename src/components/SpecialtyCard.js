import React from 'react'
import { View, Text, TouchableOpacity,StyleSheet, Image } from 'react-native'


const SpecialtyCard = ({specialty}) => {
  return (
    <TouchableOpacity
      style={styles.container}
    //   onPress={handleNavigate}
      >
        <TouchableOpacity
          style={styles.logoContainer}>
          <Image
          source={{ uri:  'https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg'
      }}
          resizeMode='contain'
          style={styles.logoImage}
          />
        </TouchableOpacity>
       

        <View style={styles.textContainer}>
          <Text style={styles.jobName} numberOfLines={1}>
           {specialty?.title}
          </Text>
          <Text style={styles.jobType}>
            {specialty?.second}
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
      backgroundColor: "#78a6c8",
      borderRadius: 12,
      padding: 16,
      marginHorizontal: 20
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
      color: 'white',
    },
    jobType: {
      fontSize: 10,
      color: 'black',
      marginTop: 3,
      textTransform: "capitalize",
    },
  });

export default SpecialtyCard 



  