import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Text, TextInput, Button } from 'react-native';
import axios from 'axios'
import PDFLib, { PDFDocument, PDFPage } from 'react-native-pdf-lib';



const tableHeader = ['Student', 'Course', 'Date'];



const TableComponent = () => {
    const [attendance, setAttendance] = useState([]) //replace table data

    const flatListRef = useRef(null);

    const [ongoing , setOngoing] = useState('')
    const courseRef = useRef(null)
    const [ongoingCoursesFetched, setOngoingCoursesFetched] = useState(false);

    
    const fetchOngoingCourses= async () => {
      try {
          await axios.get(`http://192.168.43.213:4000/ongoing`)
              .then((response) => {
                  const result = response.data
                  console.log('res', result[0].timetable.course)
                  setOngoing(result[0].timetable.course);
                  courseRef.current =  result[0].timetable.course 
                  setOngoingCoursesFetched(true); // Set the flag to true after fetching ongoing courses.
             
              })
      } catch (error) {
          console.log("error", error)
      }
  
  }

    const handlePDFGeneration = async () => {
        // Get the data from the FlatList component
        const data = flatListRef.current.props.data;
    
        // Create a new PDF document
        const pdfDoc = await PDFDocument.create();
    
        // Create a new page in the PDF document
        const page = PDFPage.create();
    
        // Set the content of the page
        page.drawText('PDF Content');
    
        // Add the page to the PDF document
        pdfDoc.addPage(page);
    
        // Generate the PDF file
        const pdfBytes = await pdfDoc.save();
    
        // Save the PDF file to a location
        // For example, you can save it to the device's document directory
        // Make sure to handle file saving according to your requirements
        try {
            const documentDirectoryPath = RNFS.DocumentDirectoryPath;
            const filePath = `${documentDirectoryPath}/myFile.pdf`;
            await RNFS.writeFile(filePath, pdfBytes, 'base64');
            console.log('PDF file saved:', filePath);
            // Handle opening or sharing the PDF file as needed
          } catch (error) {
            console.log('Error while saving the PDF file:', error);
          }
        Share.open({ url: `file://${filePath}` });
      };

    const [filter, setFilter] = useState(null);

    const fetchAttendance = async () => {
        console.log(courseRef.current)
        try {
            await axios.get(`http://192.168.43.213:4000/attendances/course/${courseRef.current }`)
                .then((response) => {
                     console.log(response.data.data)
                    //  console.log(JSON.parse(response.data.data))
                    const result = response.data.data
                    setAttendance(result)
                })
        } catch (error) {
            console.log("error", error)
        }

    }


    // Render function for each row of the table
    const renderRow = ({ item, index }) => {

        if (filter && !item.student_id.name.includes(filter) && !item.course_id.name.includes(filter)) {
            return null; // Skip rendering if the filter doesn't match student or course
        }

        return (
            <View style={styles.row}>
                <Text style={styles.cell}>{item.student_id.name}</Text>
                <Text style={styles.cell}>{item.course_id.name}</Text>
                <Text style={styles.cell}>{item.date.split('T')[0]}</Text>
            </View>
        );
    };

    useEffect(() => {
        fetchOngoingCourses();
      }, []); //


      useEffect(() => {
        if (ongoingCoursesFetched) {
          fetchAttendance(); // Run fetchAttendance only after fetchOngoingCourses has completed.
        }
      }, [ongoingCoursesFetched]); // Depend on ongoingCoursesFetched to trigger fetchAttendance.

    // Render the table
    return (
        <View>
            <TextInput
                style={styles.filterInput}
                placeholder="Filter by student or course"
                onChangeText={setFilter}
            />
            {/* <Button title="Generate PDF" onPress={handlePDFGeneration} />  */}
            <FlatList
            // ref={flatListRef}
                data={attendance}
                keyExtractor={(item) => item._id.toString()}
                ListHeaderComponent={
                    <View style={[styles.row, styles.headerRow]}>
                        {tableHeader.map((header, index) => (
                            <Text key={index} style={[styles.cell, styles.headerCell]}>
                                {header}
                            </Text>
                        ))}
                    </View>
                }
                renderItem={renderRow}
            />
        </View>


    );
};
export default TableComponent;

const styles = {
    filterInput: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 10,
    },
    headerRow: {
        backgroundColor: '#ccc',
    },
    cell: {
        flex: 1,
        paddingHorizontal: 10,
    },
    headerCell: {
        fontWeight: 'bold',
    },
};


