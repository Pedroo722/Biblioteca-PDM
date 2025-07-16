import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { login, signup } from '../libs/AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [isSignup, setIsSignup] = useState<boolean>(false);
  const navigation = useNavigation<any>();

  const handleLogin = async (): Promise<void> => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor preencha todos os campos.');
      return;
    }

    const response = await login(email, password);
    if (response.success) {
      await AsyncStorage.setItem('authToken', response.jwtToken || '');
      navigation.navigate(response.jwtToken ? 'AccountBook' : 'ManageBook');
    } else {
      Alert.alert('Login Failed', response.message || 'Unknown error');
    }
  };

  const handleSignup = async (): Promise<void> => {
    if (!name || !email || !password || !phone || !address) {
      Alert.alert('Error', 'Por favor preencha todos os campos.');
      return;
    }

    const response = await signup(name, email, password, phone, address);
    if (response.success) {
      Alert.alert('Success', 'Cadastro realizado com sucesso!');
      setIsSignup(false);
    } else {
      Alert.alert('Signup Failed', response.message || 'Unknown error');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignup ? 'Cadastro' : 'Login'}</Text>

      {isSignup && (
        <>
          <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
          <TextInput style={styles.input} placeholder="Phone" value={phone} onChangeText={setPhone} />
          <TextInput style={styles.input} placeholder="Address" value={address} onChangeText={setAddress} />
        </>
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />

      <TouchableOpacity style={styles.button} onPress={isSignup ? handleSignup : handleLogin}>
        <Text style={styles.buttonText}>{isSignup ? 'Cadastrar' : 'Entrar'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsSignup(!isSignup)}>
        <Text style={styles.switchText}>
          {isSignup ? 'Já tem uma conta? Faça login.' : 'Não tem uma conta? Cadastre-se.'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    alignSelf: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  button: {
    height: 50,
    backgroundColor: '#0066cc',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  switchText: {
    marginTop: 15,
    textAlign: 'center',
    color: '#0066cc',
  },
});