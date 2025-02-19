import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function AddFoodScreen() {
  const backendURL = process.env.EXPO_PUBLIC_BACKEND_URL;
  const router = useRouter(); // For going back or navigating around
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');

  const handleSubmit = async () => {
    try {
      console.log('making a request to the backend');
      console.log(`${backendURL}/api/food_entries/new/food`);
      const response = await fetch(`${backendURL}/api/food_entries/new/food`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ foodName, calories }),
      });

      console.log('got response', response);

      if (!response.ok) {
        Alert.alert('Error', 'Failed to add new food');
        return;
      }

      const responseData = await response.json();
      const food_id = responseData.entry.food_id;
      const user_id = 1; // Manually set this while we do auth

      // Add food entry
      const entryResponse = await fetch(
        `${backendURL}/api/food_entries/new/food_entry`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id, food_id }),
        }
      );

      if (entryResponse.ok) {
        Alert.alert('Success', 'Food entry added successfully');
        router.back();
      } else {
        Alert.alert('Error', 'Failed to add food entry');
      }
    } catch (error) {
      console.error('Error:', error);
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
