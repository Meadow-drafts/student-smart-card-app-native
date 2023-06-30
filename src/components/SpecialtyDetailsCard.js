import React,{useRef, useState, useEffect} from 'react'
import { View, Text, TouchableOpacity,StyleSheet, Image, Animated,Easing  } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';


const SpecialtyDetailsCard = ({specialty}) => {
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      // Start the animation loop
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ])
      );
      animation.start();
  
      return () => {
        // Clean up the animation loop
        animation.stop();
      };
    }, [animatedValue]);
  
    const bellStyle = {
      transform: [
        {
          rotate: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '10deg'],
          }),
        },
      ],
    };


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
           {specialty?.name}
          </Text>
          <View style={styles.content}>
            <View style={styles.jobType}>
            <Text style={styles.jobType} >
            Fee: {specialty?.total_fee} XAF
            </Text>
            <Text style={styles.installment} >
             {specialty?.fees?.first_installment} XAF
             <Ionicons
                name="pin"
                size={20}
                color="#326789"
                style={styles.logoImage}
            />  
            {specialty?.fees?.second_installment} XAF
            <Ionicons
                name="pin"
                size={20}
                color="#326789"
                style={styles.logoImage}
            /> 
            {specialty?.fees?.third_installment}  XAF
            </Text>
            </View>
            <View>
            {specialty?.fee_check ? 
            <Animated.View style={bellStyle}>
            <Ionicons name="notifications" size={23} color="#326789" />
            </Animated.View> :
            <Ionicons
                name="notifications-off"
                size={20}
                color="#326789"
                style={{  transform: [{ rotate: '2deg' }] }}
            />             
    }
            </View>
         
          </View>
       
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
    },
    // logoImage: {
    //   width: "70%",
    //   height: "70%",
    // },
    textContainer: {
      flex: 1,
    //   marginHorizontal: 16,
    },
    content:{
        flexDirection: "row",
        justifyContent:"space-between"
    },
    jobName: {
      fontSize: 16,
      fontWeight:"500",
    //   fontFamily: "DMBold",
      color: 'gray',
    },
    jobType: {
    flexDirection:'column',
    flex:1,
      fontSize: 12,
      color: '#78a6c8',
      marginTop: 3,
      fontWeight:"700"
    },
    installment:{
        fontSize: 10,
        color: 'gray',
        marginTop: 3,
        fontWeight:"500"
    }
  });

export default SpecialtyDetailsCard 



  