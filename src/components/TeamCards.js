import React from 'react'
import { View, Text, TouchableOpacity,StyleSheet, Image, } from 'react-native'


const TeamCards = ({item }) => {
  return (
    <TouchableOpacity
      style={styles.container}
    //   onPress={handleNavigate}
      >
        <TouchableOpacity
          // style={styles.logoContainer}
          >
          <Image
          source={{ uri:item?.imageUrl  }}
          resizeMode='cover'
          style={styles.logoImage}
          />
          {/* <img src={item.imageUrl} alt="user"/> */}
        </TouchableOpacity>
       
   </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  container: {
      // flex: 1,
    // //   justifyContent: "center",
    // //   alignItems: "flex-end",
    //   flexDirection: "row",
      // backgroundColor: "#78a6c8",
    //   borderRadius: 15,
    //   width: 50,
    //     height: 50,
    //     marginHorizontal: 5,

    //   padding: 16,
    //   marginHorizontal: 10
    },
    logoImage: {
      width: 50,
      height: 50,
    //   flexDirection: 'row',
      backgroundColor: 'black',
      borderRadius: 16,
    //   marginHorizontal: 5,
    //   justifyContent: "space-between",
    //   alignItems: "center",
    },
    // logoImage: {
    //   width: "70%",
    //   height: "70%",
    //   borderRadius: 15
    // },
   
  });

export default TeamCards 



  //https://www.vecteezy.com/free-vector/user-icon
  //https://www.pngwing.com/en/search?q=user
  //https://www.vecteezy.com/free-vector/user-avatar
  //https://unsplash.com/s/photos/user
  //https://www.atlassian.com/agile/project-management/user-stories