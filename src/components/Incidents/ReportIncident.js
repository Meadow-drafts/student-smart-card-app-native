import React, { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { ListItem, Avatar, Input } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import CustomButton from '../components/CustomButton';




const ReportIncident = () => {
    const [value, onChangeText] = useState('Useless Multiline Placeholder');


   return (
    <View style={styles.container}>
    <View style={styles.card}>

        <View >
            <Text style={{ textAlign: "center" }}>Do you wish to report an incident?</Text>

            <Input
                placeholder='Report title'
                style={{ fontSize: 15, color: 'gray', marginTop: 10 }}

            // leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
            />

            <Input
                placeholder="Fill in report"
                multiline={true}
                numberOfLines={4}
                leftIcon={{ type: 'font-awesome', name: 'comment' }}
                style={{ flexWrap: 'wrap', fontSize: 15, color: 'gray' }}
            // style={styles}
            //    onChangeText={value => this.setState({ comment: value })}
            />

            <TouchableOpacity
                //   onPress={onPress}
                style={{
                    backgroundColor: '#326789',
                    padding: 20,
                    borderRadius: 10,
                    marginBottom: 30,
                    // position:"absolute",
                }}>
                <Text
                    style={{
                        textAlign: 'center',
                        fontWeight: '700',
                        fontSize: 16,
                        color: '#fff',
                    }}>
                    submit
                </Text>
            </TouchableOpacity>
        </View>

        {/* <View style={{ flexDirection: "row", }}>
            <CustomButton />
            <CustomButton />
        </View> */}

    </View>

    <View >
    </View>
</View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        // marginTop: 50,
    },
    card: {
        marginVertical: 16,
        gap: 12,
        paddingBottom: 30,
    },
    inputArea: {
        borderWidth: 2,
        borderColor: "gray",
        margin: 20,
        // backgroundColor: "red",
    },

    content: {
        // backgroundColor: "#78a6c8",
        // borderRadius: 12,
        padding: 6,
        marginHorizontal: 20,
        // borderLeftColor: "#326789",
        // borderLeftWidth: 3,
        // marginVertical: 16,
    },
    specialty: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
    },
    cardTitle: {
        fontSize: 16,
        // marginLeft: 20,
        paddingTop: 40,
        fontWeight: '700',
        color: '#326789',
    },
});


export default ReportIncident;
