import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';


export default function LoginScreen() {
  const backendURL = process.env.EXPO_PUBLIC_BACKEND_URL
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
      try {
        console.log('making a request to the backend');
        console.log("url endnpoint: " + `${backendURL}/api/auth/login`)
        const response = await fetch(`${backendURL}/api/auth/login`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
  
        if (response.ok) {
          Alert.alert('Success', 'User added successfully');
          router.replace('/(tabs)/home')
        } else {
          Alert.alert('Error', 'Failed to add user');
        }
      } catch (error) {
        console.error('Error adding user:', error);
        Alert.alert('Error', 'Failed to connect to the server');
      }
      
    };
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#121212' }}>
      <Text style={{ fontSize: 24, marginBottom: 20, color: '#fff' }}>Welcome! Please log in.</Text>
      
      <TextInput
        style={{
          width: '100%',
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          paddingHorizontal: 10,
          borderRadius: 5,
          color: '#fff', // Ensure input text is white
          backgroundColor: '#1e1e1e', // Dark background for input field
        }}
        placeholder="Username"
        placeholderTextColor="#aaa"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={{
          width: '100%',
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 20,
          paddingHorizontal: 10,
          borderRadius: 5,
          color: '#fff', // Ensure input text is white
          backgroundColor: '#1e1e1e', // Dark background for input field
        }}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Log In" onPress={handleSubmit} />
    </View>
  );
}
