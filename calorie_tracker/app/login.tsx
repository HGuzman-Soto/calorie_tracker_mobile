import { View, Text, TextInput, Button } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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

      <Button title="Log In" onPress={() => router.replace('/(tabs)/home')} />
    </View>
  );
}
