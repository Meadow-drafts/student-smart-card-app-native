import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';

const AttendanceScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);

  // This function simulates fetching data from your backend or local storage
  // You can replace it with your own logic
  const getData = date => {
    // Dummy data for demonstration purposes
    const sampleData = {
      '2023-01-01': {
        courses: ['Math', 'English'],
        students: ['Alice', 'Bob'],
      },
      '2023-01-02': {
        courses: ['Science', 'History'],
        students: ['Charlie', 'David'],
      },
      '2023-01-03': {
        courses: ['Art', 'Music'],
        students: ['Eve', 'Frank'],
      },
    };

    // Return the data for the given date or empty arrays if not found
    return sampleData[date] || {courses: [], students: []};
  };

  // This function handles the date selection and updates the state
  const handleDayPress = day => {
    setSelectedDate(day.dateString);
    const {courses, students} = getData(day.dateString);
    setCourses(courses);
    setStudents(students);
  };

  return (
    <View style={styles.container}>
      <Calendar onDayPress={handleDayPress} />
      <View style={styles.dataContainer}>
        <Text style={styles.title}>Selected date: {selectedDate}</Text>
        <Text style={styles.title}>Courses:</Text>
        {courses.map(course => (
          <Text key={course} style={styles.item}>
            - {course}
          </Text>
        ))}
        <Text style={styles.title}>Students:</Text>
        {students.map(student => (
          <Text key={student} style={styles.item}>
            - {student}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dataContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  item: {
    fontSize: 16,
    marginVertical: 4,
  },
});

export default AttendanceScreen;