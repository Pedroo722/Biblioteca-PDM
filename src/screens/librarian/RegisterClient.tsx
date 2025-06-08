import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { clientService } from '../../model/client/ClientService';
import { Client } from '../../model/client/ClientEntity';

const RegisterClient: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [clients, setClients] = useState<Client[]>([]);

  const loadClients = async () => {
    try {
      const data = await clientService.findAll();
      setClients(data);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  const validateClient = (): string | null => {
    if (!name.trim() || name.trim().length < 3 || /[^a-zA-ZÀ-ÿ\s]/.test(name)) {
      return 'Nome deve ter ao menos 3 letras e não conter números ou símbolos.';
    }

    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      return 'Telefone deve conter pelo menos 10 dígitos.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Email inválido.';
    }

    if (address.trim().length < 10) {
      return 'Endereço deve conter pelo menos 10 caracteres.';
    }

    return null;
  };

  const handleSave = async () => {
    const validationError = validateClient();
    if (validationError) {
      Alert.alert('Erro de validação', validationError);
      return;
    }

    const newClient: Omit<Client, 'id'> = {
      name,
      phone,
      email,
      password,
      address,
    };

    try {
      await clientService.create(newClient);
      Alert.alert('Sucesso', 'Cliente registrado com sucesso!');
      clearForm();
      loadClients();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível registrar o cliente.');
    }
  };

  const clearForm = () => {
    setName('');
    setPhone('');
    setEmail('');
    setPassword('');
    setAddress('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome:"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Telefone:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu telefone:"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu email:"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Senha:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha:"
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Endereço:</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Digite seu endereço:"
            multiline
            numberOfLines={4}
            value={address}
            onChangeText={setAddress}
          />
        </View>

        <View style={styles.buttonRow}>
          <Button
            mode="contained"
            onPress={handleSave}
            style={styles.button}
            buttonColor="#0D4F97"
          >
            Salvar
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterClient;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#95BFC5',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  form: {
    backgroundColor: '#d3d3d3',
    padding: 20,
    borderRadius: 8,
    width: '90%',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    color: '#000',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingHorizontal: 10,
    height: 40,
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  clientList: {
    marginTop: 30,
    width: '90%',
  },
  clientListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  clientItem: {
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    elevation: 2,
  },
  noClientsText: {
    color: '#888',
  },
});