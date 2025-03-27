import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons, FontAwesome5, MaterialCommunityIcons } from 'react-native-vector-icons';

const AddReminderScreen = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [medicineName, setMedicineName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === 'ios');
    setTime(currentTime);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      weekday: 'long'
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#A780FF" />
        </TouchableOpacity>
        <Text style={styles.title}>Add a Reminder</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Date Selection */}
        <TouchableOpacity 
          style={styles.dateTimeBox}
          onPress={() => setShowDatePicker(true)}
        >
          <Icon name="calendar" size={20} color="#A780FF" style={styles.icon} />
          <Text style={styles.dateTimeText}>{formatDate(date)}</Text>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}
        </TouchableOpacity>

        {/* Time Selection */}
        <TouchableOpacity 
          style={styles.timePickerContainer}
          onPress={() => setShowTimePicker(true)}
        >
          <View style={styles.timeDisplay}>
            <Text style={styles.timeText}>{time.getHours().toString().padStart(2, '0')}</Text>
            <Text style={styles.timeSeparator}>:</Text>
            <Text style={styles.timeText}>{time.getMinutes().toString().padStart(2, '0')}</Text>
          </View>
          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onChangeTime}
            />
          )}
        </TouchableOpacity>

        {/* Medicine Name */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="medication" size={20} color="#ADA4A5" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Medicine Name"
            placeholderTextColor="#ADA4A5"
            value={medicineName}
            onChangeText={setMedicineName}
          />
        </View>

        {/* Task Description */}
        <View style={styles.inputContainer}>
          <FontAwesome5 name="tasks" size={18} color="#ADA4A5" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Task Description"
            placeholderTextColor="#ADA4A5"
            value={taskDescription}
            onChangeText={setTaskDescription}
          />
        </View>

        {/* Special Notes */}
        <View style={[styles.inputContainer, { height: 100 }]}>
          <MaterialCommunityIcons name="note-text-outline" size={20} color="#ADA4A5" style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="Special Notes"
            placeholderTextColor="#ADA4A5"
            value={specialNotes}
            onChangeText={setSpecialNotes}
            multiline
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={() => {
            // Save logic here
            navigation.goBack();
          }}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6B41A1',
  },
  dateTimeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#CFABF3',
    padding: 18,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F7F8F8',
  },
  icon: {
    marginRight: 10,
  },
  dateTimeText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },
  timePickerContainer: {
    backgroundColor: '#CFABF3',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F7F8F8',
  },
  timeDisplay: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    paddingHorizontal: 10,
  },
  timeSeparator: {
    fontSize: 28,
    color: '#000000',
  },
  inputContainer: {
    backgroundColor: '#F7F8F8',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    color: '#ADA4A5',
    fontSize: 16,
    padding: 0,
    flex: 1,
  },
  saveButton: {
    backgroundColor: '#C68DFF',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default AddReminderScreen;