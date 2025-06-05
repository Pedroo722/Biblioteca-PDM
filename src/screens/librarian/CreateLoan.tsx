import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const livrosMock = ['Nárnia', 'Quarta asa', 'O Hobbit'];
const clientesMock = ['Maria@gmail.com', 'João@gmail.com', 'Ana@gmail.com'];

const CreateLoan: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<string>('');
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [returnDate, setReturnDate] = useState<string>('');

  const handleSubmit = () => {
    if (!selectedBook || !selectedClient || !returnDate) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    Alert.alert('Sucesso', `Livro emprestado para ${selectedClient}`);
    setSelectedBook('');
    setSelectedClient('');
    setReturnDate('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Título do Livro:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedBook}
            onValueChange={(itemValue) => setSelectedBook(itemValue)}
          >
            <Picker.Item label="Selecione" value="" />
            {livrosMock.map((livro) => (
              <Picker.Item key={livro} label={livro} value={livro} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Email do Cliente:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedClient}
            onValueChange={(itemValue) => setSelectedClient(itemValue)}
          >
            <Picker.Item label="Selecione" value="" />
            {clientesMock.map((cliente) => (
              <Picker.Item key={cliente} label={cliente} value={cliente} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Data de devolução:</Text>
        <TextInput
          style={styles.input}
          placeholder="dd/mm/aaaa"
          value={returnDate}
          onChangeText={setReturnDate}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Emprestar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateLoan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#99c2c9',
  },
  form: {
    backgroundColor: '#e0e0e0',
    margin: 20,
    padding: 15,
    borderRadius: 10,
  },
  label: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    marginTop: 5,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#004080',
    padding: 12,
    marginTop: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
