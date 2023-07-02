import React,{useState, useEffect} from 'react';
import { View, StyleSheet,FlatList,TouchableOpacity } from 'react-native';
// import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { Calendar } from 'react-native-calendars';
import { Button } from 'react-native-elements';
import Tabs from '../screens/tabs';

const tabs =["day", "month", "year"] ;

const WeeklyCalendarScreen = () => {
  return (
    <View style={styles.container}>
      <Calendar />
      {/* Add your weekly calendar component here */}
    </View>
  );
};

const MonthlyCalendarScreen = () => {
  return (
    <View style={styles.container}>
      <Calendar
        // Set the display mode to 'month'
        current={'month'}
        hideExtraDays={true}
        disableMonthChange={true}
      />
      {/* Add your monthly calendar component here */}
    </View>
  );
};

const YearlyCalendarScreen = () => {
  return (
    <View style={styles.container}>
      <Calendar
        // Set the display mode to 'year'
        current={'year'}
        hideExtraDays={true}
        disableMonthChange={true}
      />
      {/* Add your yearly calendar component here */}
    </View>
  );
};



// const TabNavigator = ({navigation})=>{
//     return(
//         <View>
//             <Button onPress={() => navigation.navigate('Profile')}>day</Button>
//         </View>
//     )
// }

  
  
//   const Tabs = ({tabs, activeTab, setActiveTab}) => {
//     return (
//       <View style={styles.container}>
//         <FlatList
//           data={tabs}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           renderItem={({item}) =>(
          
//             <TouchableOpacity
//             style={styles.btn(item, activeTab)}
//             onPress={()=> setActiveTab(item)}
//           >
//             <Text style={styles.btnText(item, activeTab)}>{item}</Text>
//           </TouchableOpacity>
//           )}
       
//           keyExtractor={(item) => item}
//           contentContainerStyle={{columnGap: 5}}
//         />
//       </View>
//     )
//   }
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
const AppContainer = () =>{
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const displayTabContent = ()=>{
        switch (activeTab){
            case "day":
                return (
                    <View style={styles.popularCards}>
                      <WeeklyCalendarScreen/>
                    </View>
                   
                )
                break;
                case "month":
                    return (
                        <View style={styles.popularCards}>
                            <MonthlyCalendarScreen/>
                        </View>
                       
                    )
                    break;
                case "year":
                    return (
                        <View style={styles.popularCards}>
                             <YearlyCalendarScreen/>
                        </View>
                       
                    )
                break;
        }
      }
      return(
        <View style={{padding:12, paddingBottom:100, marginLeft:10}}>
        <Tabs
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
        />
        {displayTabContent()}
    </View>
      )
}

const WeeklyCalendar = () => {
    

  return <AppContainer />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WeeklyCalendar;
