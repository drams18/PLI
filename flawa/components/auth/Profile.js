import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'; 

const Profile = () => {
  const [username, setUsername] = useState('Heymi');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('08214567xxxx');
  const [password, setPassword] = useState('********');
  const [showPassword, setShowPassword] = useState(false);

  const handleEditProfile = () => {
    alert('Modifier le profil');
  };

  const handleCancel = () => {
    alert('Annuler');
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://example.com/avatar.jpg' }}
            style={styles.avatar}
          />
        </View>

        <Text style={styles.label}>Pseudo</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Pseudo"
          placeholderTextColor="gray"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="gray"
        />

        <Text style={styles.label}>Nomor handphone</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Nomor handphone"
          placeholderTextColor="gray"
        />

        <Text style={styles.label}>Kata sandi</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={showPassword ? password : '********'}
            onChangeText={setPassword}
            placeholder="Kata sandi"
            placeholderTextColor="gray"
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.showPasswordIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Text style={styles.buttonText}>Edit Profil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.buttonText}>Annuler</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const HomeScreen = () => <View style={styles.screen}><Text>Home</Text></View>;
const CommunityScreen = () => <View style={styles.screen}><Text>Communauté</Text></View>;

const Tab = createBottomTabNavigator();

const App = () => {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Community') {
              iconName = focused ? 'people' : 'people-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#ECAD7C',  
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: '#ffffff', 
            borderTopColor: '#ECAD7C',  
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Community" component={CommunityScreen} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    justifyContent: 'center',
    padding: 20,
  },
  profileContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#ECAD7C',  
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    color: '#333',
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    color: '#333',
    fontSize: 16,
  },
  showPasswordIcon: {
    marginLeft: 10,
    fontSize: 18,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  editButton: {
    backgroundColor: '#ECAD7C',  
    padding: 10,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f0a1a1',
    padding: 10,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
