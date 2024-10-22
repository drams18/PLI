import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

export default function Register({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    axios.post('http://127.0.0.1:8000/get/GetUser', {
      name,
      email,
      password
    })
    .then(response => {
      Alert.alert('Success', 'User created successfully');
      navigation.navigate('Home');
    })
    .catch(error => {
      Alert.alert('Error', 'There was an error creating the user');
      console.error('There was an error creating the user!', error);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.registerButton} onPress={handleSubmit}>
        <Text style={styles.registerButtonText}>Inscription</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Déjà inscrit? Connexion</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A7AEF9',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    width: '100%',
  },
  registerButton: {
    backgroundColor: '#820263',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loginText: {
    textAlign: 'center',
    color: '#fff',
    textDecorationLine: 'underline',
    marginTop: 20,
  },
});
