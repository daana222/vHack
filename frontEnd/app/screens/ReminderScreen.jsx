import React, { useState } from "react";
import { 
  View, Text, SafeAreaView, FlatList, TouchableOpacity, ScrollView, 
  StyleSheet, Modal, Platform 
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from '@react-navigation/native';

// const navigation = useNavigation();

// Dummy Data
const reminders = [
  { time: "07:00 AM", title: "Take Vitamin C" },
  { time: "09:00 AM", title: "Reminder to take antibiotics" },
  { time: "01:00 PM", title: "Blood pressure check" },
  { time: "08:00 PM", title: "Evening Insulin Shot" },
];

// Generate dates for scrolling
const generateDates = () => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let dateList = [];
  for (let i = 1; i <= 30; i++) {
    const day = days[i % 7];
    dateList.push({ id: i, day, date: i });
  }
  return dateList;
};

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const years = ["2023", "2024", "2025", "2026"];

const ReminderScreen = () => {
  const navigation = useNavigation();
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedDate, setSelectedDate] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Month and Year Selector */}
      <View style={styles.monthYearSelector}>
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Month:</Text>
          <Picker
            selectedValue={selectedMonth}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedMonth(itemValue)}
          >
            {months.map(month => (
              <Picker.Item key={month} label={month} value={month} />
            ))}
          </Picker>
        </View>
        
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Year:</Text>
          <Picker
            selectedValue={selectedYear}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedYear(itemValue)}
          >
            {years.map(year => (
              <Picker.Item key={year} label={year} value={year} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Date Scroller */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.dateScroller}
        contentContainerStyle={styles.dateScrollerContent}
      >
        {generateDates().map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={[
              styles.dateItem,
              item.date === selectedDate && styles.selectedDateItem
            ]}
            onPress={() => setSelectedDate(item.date)}
          >
            <Text style={styles.dayText}>{item.day}</Text>
            <Text style={styles.dateText}>{item.date}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Reminder List */}
      <FlatList
        data={reminders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.reminderItem}>
            <Text style={styles.reminderTime}>{item.time}</Text>
            <Text style={styles.reminderTitle}>{item.title}</Text>
          </View>
        )}
        contentContainerStyle={styles.reminderListContent}
      />

      {/* Floating Add Button */}
      <View style={styles.addButtonContainer}>
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => navigation.navigate('AddReminder')}
        >
          <Icon name="plus" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Modal for Adding Reminder
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Add Reminder</Text>
            <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.closeButton}>
              <Text style={{ color: "#fff", fontSize: 16 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E4D0F8",
    padding: 20,
  },
  monthYearSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  pickerContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6B41A1",
    marginBottom: 5,
  },
  picker: {
    backgroundColor: "#CFABF3",
    borderRadius: 10,
    color: "#fff",
    height: Platform.OS === 'ios' ? 120 : 50,
  },
  dateScroller: {
    marginBottom: 20,
  },
  dateScrollerContent: {
    paddingHorizontal: 5,
  },
  dateItem: {
    backgroundColor: "#CFABF3",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
    width: 60,
  },
  selectedDateItem: {
    backgroundColor: "#92A3FD",
  },
  dayText: {
    color: "#fff",
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  reminderItem: {
    backgroundColor: "#C68DFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  reminderTime: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  reminderTitle: {
    fontSize: 14,
    color: "#fff",
    marginTop: 5,
  },
  reminderListContent: {
    paddingBottom: 80, // Add padding to prevent content from being hidden behind button
  },
  addButtonContainer: {
    position: "absolute",
    bottom: 80, // Position above the navigation bar
    right: 30,
    width: 60,
    height: 60,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: "#92A3FD",
    width: "100%",
    height: "100%",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,


  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: "#C68DFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});

export default ReminderScreen;