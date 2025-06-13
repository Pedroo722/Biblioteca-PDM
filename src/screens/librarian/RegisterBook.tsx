import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Button } from 'react-native-paper';
import { bookService } from '../../model/book/BookService';
import { Book } from '../../model/book/BookEntity';

const RegisterBook: React.FC = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publicationYear, setPublicationYear] = useState('');
  const [synopsis, setSynopsis] = useState('');

  const validateBook = (): string | null => {
    if (title.trim().length < 1) return 'Título não pode ser vazio.';
    if (author.trim().length < 3) return 'Autor deve ter ao menos 3 letras.';
    if (isbn.replace(/\D/g, '').length !== 10) return 'ISBN deve ter exatamente 10 dígitos.';
    const year = parseInt(publicationYear);
    const currentYear = new Date().getFullYear();
    if (isNaN(year) || year < 1500 || year > currentYear) return `Ano inválido. Deve ser entre 1500 e ${currentYear}.`;
    return null;
  };

  const handleSave = async () => {
    const error = validateBook();
    if (error) {
      Alert.alert('Erro de validação', error);
      return;
    }
    try {
      const newBook: Omit<Book, 'id'> = {
        titulo: title,
        autor: author,
        editora: publisher,
        isbn,
        ano: publicationYear,
        sinopse: synopsis,
        status: 'Disponível',
      };
      await bookService.create(newBook);
      Alert.alert('Sucesso', 'Livro registrado com sucesso!');
      clearForm();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível registrar o livro.');
    }
  };

  const clearForm = () => {
    setTitle('');
    setAuthor('');
    setPublisher('');
    setIsbn('');
    setPublicationYear('');
    setSynopsis('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Título:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o título"
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Autor(a):</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o autor(a)"
              value={author}
              onChangeText={setAuthor}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Editora:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite a editora"
              value={publisher}
              onChangeText={setPublisher}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>ISBN (10 dígitos):</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o ISBN"
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
              placeholder="Digite a sinopse"
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
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
});
export default RegisterBook;
