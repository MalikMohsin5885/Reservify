import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Stack } from 'expo-router';
import { useNavigation, useRoute } from '@react-navigation/native';

const PersonnelInformation = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { updateName, currentName } = route.params;

  const [data, setData] = useState([
    { key: 'Name', value: currentName },
    { key: 'Birthday', value: 'September 8, 2003' },
    { key: 'Address', value: 'xyz street abc city' },
    { key: 'Phone Number', value: '03086227654' },
    { key: 'Email', value: 'mohsinrasheed8239@gmail.com' },
  ]);

  const [editingField, setEditingField] = useState(null);
  const [newValue, setNewValue] = useState('');

  const handleEdit = (key, value) => {
    setEditingField(key);
    setNewValue(value);
  };

  const handleSave = (key) => {
    const updatedData = data.map(item => item.key === key ? { ...item, value: newValue } : item);
    setData(updatedData);
    setEditingField(null);
    setNewValue('');

    if (key === 'Name') {
      updateName(newValue);
    }
  };

  const renderItem = ({ item }) => {
    const isEditing = editingField === item.key;
    return (
      <View style={styles.item}>
        <View style={styles.itemContent}>
          <Text style={styles.itemHeading}>{item.key}</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={newValue}
              onChangeText={setNewValue}
              onSubmitEditing={() => handleSave(item.key)}
            />
          ) : (
            <Text style={styles.itemInfo}>{item.value}</Text>
          )}
        </View>
        <TouchableOpacity style={styles.editButton} onPress={() => isEditing ? handleSave(item.key) : handleEdit(item.key, item.value)}>
          <Text style={styles.editButtonText}>{isEditing ? 'Save' : 'Edit'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text style={styles.header}>Personal Information</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.separator} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 70,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  itemContent: {
    flex: 1,
  },
  itemHeading: {
    fontSize: 16,
    marginBottom: 5,
    letterSpacing: 0.5,
  },
  itemInfo: {
    color: '#8e8c89',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  input: {
    color: '#000',
    fontSize: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 5,
    letterSpacing: 0.5,
  },
  editButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  editButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default PersonnelInformation;
