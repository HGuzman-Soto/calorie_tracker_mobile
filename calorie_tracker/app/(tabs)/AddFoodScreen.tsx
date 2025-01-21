import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function AddFoodScreen() {
  const router = useRouter(); // For going back or navigating around
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');

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

      <Button
        title='Submit'
        onPress={() => {
          // For now, just navigate back
          router.back();
        }}
      />
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
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    marginBottom: 16,
  },
});
