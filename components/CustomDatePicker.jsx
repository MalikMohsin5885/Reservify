import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Modal, TouchableWithoutFeedback } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';

// Updated the function to use default parameter for defaultDate
const CustomDatePicker = ({ defaultDate = '' }) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(defaultDate);
  const [isDatePickerReady, setIsDatePickerReady] = useState(false);

  useEffect(() => {
    setIsDatePickerReady(true);
  }, []);

  function handleTap() {
    setOpen(true);
  }

  function handleDateChange(selectedDate) {
    setDate(selectedDate);
    setOpen(false);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleTap}>
        <View style={styles.inputContainer}>
          <Ionicons name='calendar' size={24} color={'black'} />
          <TextInput
            style={styles.input}
            value={date}
            placeholder="Select a date"
            editable={false}
          />
        </View>
      </TouchableOpacity>
      {open && isDatePickerReady && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={open}
          onRequestClose={handleClose}
        >
          <TouchableWithoutFeedback onPress={handleClose}>
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback>
                <View style={styles.datePicker}>
                  <DatePicker
                    mode="calendar"
                    onSelectedChange={handleDateChange}
                    options={{
                      textHeaderColor: '#000',
                      textDefaultColor: '#000',
                      selectedTextColor: '#FFF',
                      mainColor: '#1E90FF',
                      textSecondaryColor: '#000',
                      borderColor: 'rgba(122, 146, 165, 0.1)',
                    }}
                  />
                  <TouchableOpacity onPress={handleClose}>
                    <Text style={styles.closeButton}>Close</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red'
  },
  inputContainer: {
    borderWidth: 1,
    flexDirection: 'row',
    borderColor: '#ECECEC',
    borderRadius: 17,
    backgroundColor: '#ECECEC',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,
    paddingHorizontal: '16%'
  },
  input: {
    height: 40,
    width: 200,
    // color: 'black',
    color: '#333',
    // backgroundColor: 'yellow'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  datePicker: {
    width: 350,
    height: 420,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 17,
    gap: 10,
  },
  closeButton: {
    marginBottom: 30,
    marginHorizontal: 60,
    padding: 10,
    color: '#FEFAF6',
    backgroundColor: '#102C57',
    borderRadius: 12,
    textAlign: 'center'
  }
});

export default CustomDatePicker;
