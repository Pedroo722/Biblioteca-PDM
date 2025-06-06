import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { bookService } from '../../model/book/BookService';
import { Book } from '../../model/book/BookEntity';
import uuid from 'react-native-uuid';


const RegisterBook: React.FC = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publicationYear, setPublicationYear] = useState('');
  const [synopsis, setSynopsis] = useState('');

  const handleSave = () => {
    if (!title || !author || !isbn || !publicationYear) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    const newBook = {
      titulo: title,
      autor: author,
      editora: publisher,
      isbn,
      ano: publicationYear,
      sinopse: synopsis,
      status: 'Disponível',
    };

    bookService.create(newBook);

    Alert.alert('Sucesso', 'Livro registrado com sucesso!');

    setTitle('');
    setAuthor('');
    setPublisher('');
    setIsbn('');
    setPublicationYear('');
    setSynopsis('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Título:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o título:"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Autor:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o autor(a):"
            value={author}
            onChangeText={setAuthor}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Editora:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite a editora:"
            value={publisher}
            onChangeText={setPublisher}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>ISBN (10):</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o isbn de 10:"
            keyboardType="numeric"
            maxLength={10}
            value={isbn}
            onChangeText={setIsbn}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Ano de Publicação:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o ano"
            keyboardType="numeric"
            maxLength={4}
            value={publicationYear}
            onChangeText={setPublicationYear}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Sinopse:</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Digite a sinopse:"
            multiline
            numberOfLines={4}
            value={synopsis}
            onChangeText={setSynopsis}
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
    fontWeight: 'bold',  // <== aqui!
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
});

export default RegisterBook;
