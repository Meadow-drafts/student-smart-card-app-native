import React from 'react'
import { TouchableOpacity,View,Text, Image, StyleSheet } from 'react-native'


export default function ScreenHeaderBtn () {
  return (
    <View styles={styles.container}>
    <View>
    <Text>Hi</Text>
    </View>
      
      <TouchableOpacity style={styles.btnContainer} >
      <Image
      source="require()'"
      resizeMode='cover'
      style={styles.btnImg}/>
    </TouchableOpacity>
    </View>
  
  )
}
const styles = StyleSheet.create({
  container:{
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  btnContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#F3F4F8",
    borderRadius: 12 / 1.25,
  },
  btnImg:{
    width: 5,
    height: 5,
    borderRadius: 12 / 1.25,
  },
});

