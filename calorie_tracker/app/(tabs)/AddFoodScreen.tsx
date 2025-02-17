import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function AddFoodScreen() {
  const backendURL = process.env.EXPO_PUBLIC_BACKEND_URL
  const router = useRouter(); // For going back or navigating around
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');

  const handleSubmit = async () => {
    try {
      console.log('making a request to the backend');
      console.log("url endnpoint: " + `${backendURL}/api/calories`)
      const response = await fetch(`${backendURL}/api/calories`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ foodName, calories }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Food added successfully');
        router.back();
      } else {
        Alert.alert('Error', 'Failed to add food');
      }
    } catch (error) {
      console.error('Error adding food:', error);
      Alert.alert('Error', 'Failed to connect to the server');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Food Name</Text>
      <TextInput
        style={styles.input}
        placeholder='e.g. Pizza'
        value={foodName}
        onChangeText={setFoodName}
      />

      <Text style={styles.label}>Calories</Text>
      <TextInput
        style={styles.input}
        placeholder='e.g. 300'
        value={calories}
        onChangeText={setCalories}
        keyboardType='numeric'
      />

      <Button title='Submit' onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    marginBottom: 16,
    color: '#fff',
  },
});
