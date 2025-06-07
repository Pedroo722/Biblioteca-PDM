import React, { useState, useCallback } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { loanService } from '../../model/loan/LoanService';
import { Loan } from '../../model/loan/LoanEntity';
import { bookService } from '../../model/book/BookService';
import { Book } from '../../model/book/BookEntity';
import { clientService } from '../../model/client/ClientService';
import { Client } from '../../model/client/ClientEntity';
import { useFocusEffect } from '@react-navigation/native';

const CreateLoan: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<string>('');
  const [selectedAuthor, setSelectedAuthor] = useState<string>('');
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [returnDate, setReturnDate] = useState<string>('');
  const [livros, setLivros] = useState<Book[]>([]);
  const [clientes, setClientes] = useState<Client[]>([]);
  const [autores, setAutores] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const allBooks = bookService.findAll();
        const disponiveis = (await allBooks).filter((b: Book) => b.status === 'Disponível');
        setLivros(disponiveis);

        const allClients = await clientService.findAll();
        setClientes(allClients);
      };
      fetchData();
    }, [])
  );

  const handleSubmit = async () => {
    if (!selectedBook || !selectedAuthor || !selectedClient || !returnDate) {
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
    dateObj.setHours(0, 0, 0, 0);

    if (
      dateObj.getFullYear() !== parseInt(year) ||
      dateObj.getMonth() !== parseInt(month) - 1 ||
      dateObj.getDate() !== parseInt(day)
    ) {
      Alert.alert('Erro', 'Data de devolução inválida. Verifique se a data existe.');
      return;
    }

    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    if (dateObj < todayDate) {
      Alert.alert('Erro', 'A data de devolução não pode ser anterior à data atual.');
      return;
    }

    const bookToUpdate = livros.find(
      (b) => b.titulo === selectedBook && b.autor === selectedAuthor
    );
    if (!bookToUpdate) {
      Alert.alert('Erro', 'Livro não encontrado com esse título e autor.');
      return;
    }

    if (bookToUpdate.status === 'Emprestado') {
      Alert.alert('Erro', 'Este livro já está emprestado.');
      return;
    }

    const client = clientes.find((c) => c.email === selectedClient);
    const name = client ? client.name : 'Cliente desconhecido';
    const loanDate = todayDate.toLocaleDateString('pt-BR');

    const newLoan: Omit<Loan, 'id'> = {
      title: selectedBook,
      name,
      email: selectedClient,
      loanDate,
      returnDate,
      fine: 'R$ 0,00',
      returnDateReal: '',
      status: 'Emprestado',
    };

    loanService.create(newLoan);
    bookService.update(bookToUpdate.id, { status: 'Emprestado' });

    Alert.alert('Sucesso', `Livro "${selectedBook}" emprestado para ${selectedClient}`);
    setSelectedBook('');
    setSelectedAuthor('');
    setSelectedClient('');
    setReturnDate('');

    const allBooks = bookService.findAll();
    const disponiveis = (await allBooks).filter((b) => b.status === 'Disponível');
    setLivros(disponiveis);
    setAutores([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Título do Livro:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedBook}
            onValueChange={(value) => {
              setSelectedBook(value);

              const autoresDoLivro = livros
                .filter((livro) => livro.titulo === value)
                .map((livro) => livro.autor);

              const autoresUnicos = Array.from(new Set(autoresDoLivro));
              setAutores(autoresUnicos);
              setSelectedAuthor('');
            }}
          >
            <Picker.Item label="Selecione" value="" />
            {livros.map((livro) => (
              <Picker.Item key={livro.id} label={livro.titulo} value={livro.titulo} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Autor(a):</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={selectedAuthor} onValueChange={setSelectedAuthor}>
            <Picker.Item label="Selecione" value="" />
            {autores.map((autor, index) => (
              <Picker.Item key={index} label={autor} value={autor} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Email do Cliente:</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={selectedClient} onValueChange={setSelectedClient}>
            <Picker.Item label="Selecione" value="" />
            {clientes.map((cliente) => (
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
