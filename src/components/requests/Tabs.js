import React from 'react'
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native'


const TabButton = ({name, activeTab, onHandleSearchType})=>{
  return(
    <TouchableOpacity
    style={styles.btn(name, activeTab)}
    onPress={onHandleSearchType}
  >
    <Text style={styles.btnText(name, activeTab)}>{name}</Text>
  </TouchableOpacity>
  )
}


const Tabs = ({tabs, activeTab, setActiveTab}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) =>(
          <TabButton
            name={item}
            activeTab={activeTab}
            onHandleSearchType={()=> setActiveTab(item)}
          />
        )}
     
        keyExtractor={(item) => item}
        contentContainerStyle={{columnGap: 5}}
      />
    </View>
  )
}

export default Tabs

const styles = StyleSheet.create({
    container: {
      marginTop: 10,
      marginBottom:5
    },
    btn: (name, activeTab) => ({
      paddingVertical:12,
      paddingHorizontal:18,
      backgroundColor: name === activeTab ? '#78a6c8' : "#F3F4F8",
      borderRadius: 12,
      marginLeft: 2,
    //   ...SHADOWS.medium,
    //   shadowColor: COLORS.white,
    }),
    btnText: (name, activeTab) => ({
    //   fontFamily: "DMMedium",
      fontSize: 10,
      color: name === activeTab ? "white" : "#AAA9B8",
    }),
  });