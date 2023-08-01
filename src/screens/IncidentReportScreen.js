import React, { useState,useEffect } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { ListItem, Avatar, Input } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import ViewIncidents from '../components/incidents/ViewIncidents'
// import ReportIncident from '../components/incidents/ReportIncident'
import ViewIncidents from '../components/Incidents/ViewIncidents';
import ReportIncident from '../components/Incidents/ReportIncident';
import axios from  'axios'
import Tabs from './tabs';

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

const tabs =["All incidents", "Report Incident"] ;



const IncidentReportScreen = ({ navigation }) => {
    const [value, onChangeText] = useState('Useless Multiline Placeholder');
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const [incidents, setIncidents] = useState([])
    
    const fetchIncidents = async () => {
        try {
            await axios.get('http://192.168.43.213:4000/incidents')
                .then((response) => {
                    // console.log(response)
                    const result = response.data.data
                    setIncidents(result)
                    console.log(result)
                })
        } catch (error) {
            console.log("error", error)
        }

    }

    useEffect(() => {
        fetchIncidents();
        // getToken()
        // fetchUsers();
    }, []);

    const displayTabContent = ()=>{
        switch (activeTab){
            case "All incidents":
                return (
                    <View style={styles.popularCards}>
                        {incidents.map((item) =>(
                    <ViewIncidents key={item._id} item={item} />
                        ))}
                         
                    </View>
                   
                )
                break;
                case "Report Incident":
                    return (
                        <View style={styles.popularCards}>
                        
                        <ReportIncident fetchIncidents={fetchIncidents} />
                        </View>
                       
                    )
                    break;
           
        }
      }

    return (
        <View style={styles.container}>
            <View style={styles.specialty}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 20, marginTop: 40 }}>
                    <Ionicons
                        name="md-chevron-back"
                        size={28}
                        color="#326789"
                        style={{ marginRight: 5, transform: [{ rotate: '2deg' }] }}
                    />
                    {/* <Image source={backIcon} style={{ width: 20, height: 20 }} /> */}
                </TouchableOpacity>
                <Text style={styles.cardTitle}>Incident Report</Text>
                <Ionicons
                    name="ellipsis-horizontal"
                    size={20}
                    color="#326789"
                    style={{ marginRight: 15, marginTop: 40, transform: [{ rotate: '2deg' }] }}
                />
            </View>
            <View style={{padding:12, paddingBottom:100, marginLeft:10}}>
                            <Tabs
                                tabs={tabs}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />
                            {displayTabContent()}
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
    popularCards: {
        marginVertical: 16,
        gap: 12,
        paddingBottom: 30,
      },
});


export default IncidentReportScreen;
