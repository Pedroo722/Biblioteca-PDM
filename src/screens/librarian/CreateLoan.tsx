import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { loanService } from '../../model/loan/LoanService';
import { Loan } from '../../model/loan/LoanEntity';
import { bookService } from '../../model/book/BookService';
import { Book } from '../../model/book/BookEntity';
import { clientService } from '../../model/client/ClientService';
import { Client } from '../../model/client/ClientEntity';
import { useFocusEffect } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';

const CreateLoan: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<string>('');
  const [selectedAuthor, setSelectedAuthor] = useState<string>('');
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [livros, setLivros] = useState<Book[]>([]);
  const [clientes, setClientes] = useState<Client[]>([]);
  const [autores, setAutores] = useState<string[]>([]);

  const [bookItems, setBookItems] = useState<any[]>([]);
  const [authorItems, setAuthorItems] = useState<any[]>([]);
  const [clientItems, setClientItems] = useState<any[]>([]);

  const [openBook, setOpenBook] = useState(false);
  const [openAuthor, setOpenAuthor] = useState(false);
  const [openClient, setOpenClient] = useState(false);

  const loadBooksAndClients = async () => {
    const allBooks = await bookService.findAll();
    const disponiveis = allBooks.filter((b: Book) => b.status === 'Disponível');
    setLivros(disponiveis);
    setBookItems(
      Array.from(new Set(disponiveis.map((b) => b.titulo))).map((titulo) => ({
        label: titulo,
        value: titulo,
      }))
    );

    const allClients = await clientService.findAll();
    const uniqueClients = Array.from(new Map(allClients.map((c) => [c.email, c])).values());

    setClientes(uniqueClients);
    setClientItems(
      uniqueClients.map((cliente) => ({
        label: cliente.email,
        value: cliente.email,
      }))
    );
  };

  useFocusEffect(
    useCallback(() => {
      loadBooksAndClients();
    }, [])
  );

  const handleSubmit = async () => {
    if (!selectedBook || !selectedAuthor || !selectedClient) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const bookToUpdate = livros.find(
      (b) => b.titulo === selectedBook && b.autor === selectedAuthor
    );
    if (!bookToUpdate) {
      Alert.alert('Erro', 'Livro não encontrado com esse título e autor.');
      return;
    }

    const client = clientes.find((c) => c.email === selectedClient);
    const name = client ? client.name : 'Cliente desconhecido';

    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    const loanDate = todayDate.toLocaleDateString('pt-BR');

    const returnDateObj = new Date(todayDate);
    returnDateObj.setDate(returnDateObj.getDate() + 10);
    const returnDate = returnDateObj.toLocaleDateString('pt-BR');

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

    await loanService.create(newLoan);
    await bookService.update(bookToUpdate.id, { status: 'Emprestado' });

    Alert.alert('Sucesso', `Livro "${selectedBook}" emprestado para ${selectedClient}`);

    setSelectedBook('');
    setSelectedAuthor('');
    setSelectedClient('');
    setAuthorItems([]);

    loadBooksAndClients();
  };


  const renderEmptyList = () => (
    <Text style={{ textAlign: 'center', paddingVertical: 10, color: '#666' }}>
      Não existe nada com esse nome
    </Text>
  );

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Título do Livro:</Text>
        <DropDownPicker
          open={openBook}
          setOpen={setOpenBook}
          items={bookItems}
          setItems={setBookItems}
          value={selectedBook}
          setValue={(callback) => {
            const value = callback(selectedBook);
            setSelectedBook(value);

            const autoresDoLivro = livros
              .filter((livro) => livro.titulo === value)
              .map((livro) => livro.autor);

            const autoresUnicos = Array.from(new Set(autoresDoLivro));
            setAutores(autoresUnicos);
            setAuthorItems(
              autoresUnicos.map((autor) => ({
                label: autor,
                value: autor,
              }))
            );
            setSelectedAuthor('');
            return value;
          }}
          placeholder="Selecione um título"
          searchable
          searchPlaceholder="Digite algo..."
          ListEmptyComponent={renderEmptyList}
          zIndex={3000}
          zIndexInverse={1000}
        />

        <Text style={styles.label}>Autor(a):</Text>
        <DropDownPicker
          open={openAuthor}
          setOpen={setOpenAuthor}
          items={authorItems}
          setItems={setAuthorItems}
          value={selectedAuthor}
          setValue={setSelectedAuthor}
          placeholder="Selecione o autor"
          searchable
          searchPlaceholder="Digite algo..."
          ListEmptyComponent={renderEmptyList}
          zIndex={2500}
          zIndexInverse={1500}
          style={{ marginTop: 15 }}
        />

        <Text style={styles.label}>Email do Cliente:</Text>
        <DropDownPicker
          open={openClient}
          setOpen={setOpenClient}
          items={clientItems}
          setItems={setClientItems}
          value={selectedClient}
          setValue={setSelectedClient}
          placeholder="Selecione o cliente"
          searchable
          searchPlaceholder="Digite algo..."
          ListEmptyComponent={renderEmptyList}
          zIndex={2000}
          zIndexInverse={2000}
          style={{ marginTop: 15 }}
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
    zIndex: 10,
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
    justifyContent: 'center',
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
