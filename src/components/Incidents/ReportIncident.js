import React, { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { ListItem, Avatar, Input } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import CustomButton from '../components/CustomButton';

const Announcements = [
    {
        id: 1,
        title: "first announcement",
        content: "A lot of things to tell you about ourfirst announcement lorem ipsun test text",
        date: "2023/12/05",
    },
    {
        id: 2,
        title: "second announcement",
        content: "A lot of things to tell you about our second announcement lorem ipsun test text",
        date: "2022/12/05",
    },
    {
        id: 3,
        title: "third announcement",
        content: "A lot of things to tell you about our third announcement lorem ipsun test text",
        date: "2023/12/05",
    },
]

const Item = ({ item }) => {
    return (
        <View style={styles.content}>
            <ListItem bottomDivider>
                <Avatar
                    rounded
                    icon={{
                        name: 'person-outline',
                        type: 'material',
                        size: 26,
                    }}
                />
                <ListItem.Content>
                    <ListItem.Title>{item.title}</ListItem.Title>
                    <ListItem.Subtitle style={{ fontSize: 13 }}>{item.content}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        </View>
    )
}

const ReportIncident = ({ navigation }) => {
    const [value, onChangeText] = useState('Useless Multiline Placeholder');


    const [selectedStartDate, setSelectedStartDate] = useState(null);

    const onDateChange = (date) => {
        setSelectedStartDate(date);
    };

    const startDate = selectedStartDate ? selectedStartDate.toString() : '';

    return (
        <View style={styles.container}>
            <View style={styles.specialty}>
                {/* <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 20, marginTop: 40 }}> */}
                    {/* <Ionicons
                        name="md-chevron-back"
                        size={28}
                        color="#326789"
                        style={{ marginRight: 5, transform: [{ rotate: '2deg' }] }}
                    /> */}
                    {/* <Image source={backIcon} style={{ width: 20, height: 20 }} /> */}
                {/* </TouchableOpacity> */}
                {/* <Text style={styles.cardTitle}>Incident Report</Text>
                <Ionicons
                    name="ellipsis-horizontal"
                    size={20}
                    color="#326789"
                    style={{ marginRight: 15, marginTop: 40, transform: [{ rotate: '2deg' }] }}
                /> */}
            </View>

            <View style={styles.card}>

                <Text style={{ textAlign: "center" }}>Do you wish to report an incident?</Text>
                <View stye={{margin:100}}>
                    <Input
                        placeholder='Incident title'
                    // leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                    />

                    <Input
                        placeholder="Narate incident"
                        multiline={true}
                        numberOfLines={4}
                        leftIcon={{ type: 'font-awesome', name: 'comment' }}
                        style={{ flexWrap: 'wrap' }}
                    // style={styles}
                    //    onChangeText={value => this.setState({ comment: value })}
                    />
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
