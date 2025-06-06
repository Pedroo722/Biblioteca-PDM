import React, { useState, useCallback } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { loanService } from '../../model/loan/LoanService';
import { Loan } from '../../model/loan/LoanEntity';
import { bookService } from '../../model/book/BookService';
import { Book } from '../../model/book/BookEntity';
import { useFocusEffect } from '@react-navigation/native';

const clientesMock = [
  { name: 'Maria', email: 'Maria@gmail.com' },
  { name: 'João', email: 'João@gmail.com' },
  { name: 'Ana', email: 'Ana@gmail.com' },
];

const CreateLoan: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<string>('');
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [returnDate, setReturnDate] = useState<string>('');
  const [livros, setLivros] = useState<Book[]>([]);

  useFocusEffect(
    useCallback(() => {
      const fetchBooks = () => {
        const allBooks = bookService.findAll();
        const disponiveis = allBooks.filter((b: Book) => b.status === 'Disponível');
        setLivros(disponiveis);
      };
      fetchBooks();
    }, [])
  );

  const handleSubmit = () => {
    if (!selectedBook || !selectedClient || !returnDate) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = returnDate.match(dateRegex);
    if (!match) {
      Alert.alert('Erro', 'Data de devolução inválida. Use o formato dd/mm/aaaa.');
      return;
    }

    const [_, day, month, year] = match;
    const dateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    if (
      dateObj.getFullYear() !== parseInt(year) ||
      dateObj.getMonth() !== parseInt(month) - 1 ||
      dateObj.getDate() !== parseInt(day)
    ) {
      Alert.alert('Erro', 'Data de devolução inválida. Verifique se a data existe.');
      return;
    }

    const bookToUpdate = livros.find((b) => b.titulo === selectedBook);
    if (!bookToUpdate) {
      Alert.alert('Erro', 'Livro não encontrado.');
      return;
    }

    if (bookToUpdate.status === 'Emprestado') {
      Alert.alert('Erro', 'Este livro já está emprestado.');
      return;
    }

    const client = clientesMock.find((c) => c.email === selectedClient);
    const name = client ? client.name : 'Cliente desconhecido';
    const today = new Date().toLocaleDateString('pt-BR');

    const newLoan: Omit<Loan, 'id'> = {
      title: selectedBook,
      name,
      email: selectedClient,
      loanDate: today,
      returnDate,
      fine: 'R$ 0,00',
      returnDateReal: '',
      status: 'Emprestado',
    };

    loanService.create(newLoan);
    bookService.update(bookToUpdate.id, { status: 'Emprestado' });

    Alert.alert('Sucesso', `Livro "${selectedBook}" emprestado para ${selectedClient}`);
    setSelectedBook('');
    setSelectedClient('');
    setReturnDate('');

    const allBooks = bookService.findAll();
    const disponiveis = allBooks.filter((b) => b.status === 'Disponível');
    setLivros(disponiveis);
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Título do Livro:</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={selectedBook} onValueChange={setSelectedBook}>
            <Picker.Item label="Selecione" value="" />
            {livros.map((livro) => (
              <Picker.Item key={livro.id} label={livro.titulo} value={livro.titulo} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Email do Cliente:</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={selectedClient} onValueChange={setSelectedClient}>
            <Picker.Item label="Selecione" value="" />
            {clientesMock.map((cliente) => (
              <Picker.Item key={cliente.email} label={cliente.email} value={cliente.email} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Data Esperada de Retorno:</Text>
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
