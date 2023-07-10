import React from 'react'
import { ListItem, Avatar } from 'react-native-elements';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function Period({item}){
    return (
        <View style={styles.content}>
            <ListItem bottomDivider>
            <View style={{ flexDirection: 'column', }}>
                <Text style={{color:'gray', fontSize:10, fontWeight:'700'}}>{item.time?.split('-')[0]}</Text>
                <Ionicons
                    name="remove"
                    size={30}
                    color="#326789"
                    // style={{ transform: [{ rotate: '90deg' }], marginTop: 10 }}
                />
                <Text style={{color:'gray', fontSize:10, fontWeight:'700'}}>{item.time?.split('-')[1]}</Text>
            </View>

            <ListItem.Content>
                <ListItem.Title style={{color:'#326789', fontSize:16, fontWeight:'700'}}>{item.course?.name}</ListItem.Title>
                <ListItem.Subtitle style={{color:'gray', fontSize:11,}}>Teacher: {item.teacher?.name}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
        </View>
    );
  
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: 50,
    },
    card: {
        marginVertical: 16,
        gap: 12,
        paddingBottom: 30,
    },

    content: {
        // backgroundColor: "#78a6c8",
        // borderRadius: 12,
        // padding: 6,
        marginHorizontal: 20,
        borderLeftColor: "#326789",
        borderLeftWidth: 3,
        // marginVertical: 16,
    },
});