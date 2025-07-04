import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Modal, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Book } from '../../model/book/BookEntity';
import { bookService } from '../../model/book/BookService';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native';

const ManageBook: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchAuthor, setSearchAuthor] = useState('');

  useFocusEffect(
    useCallback(() => {
      loadBooks();
    }, [])
  );

  const loadBooks = async () => {
    const sortedBooks = (await bookService.findAll()).sort((a, b) => {
      return a.titulo.localeCompare(b.titulo);
    });
    setBooks(sortedBooks);
  };

  const handleFieldChange = (field: keyof Book, value: string) => {
    if (selectedBook) {
      setSelectedBook({ ...selectedBook, [field]: value });
    }
  };

  const saveEdits = () => {
    if (selectedBook) {
      bookService.update(selectedBook.id, selectedBook);
      loadBooks();
      setIsEditing(false);
    }
  };

  const deleteBook = () => {
    if (selectedBook) {
      Alert.alert(
        'Confirmar Exclusão',
        `Tem certeza de que deseja excluir o livro "${selectedBook.titulo}"?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Apagar',
            style: 'destructive',
            onPress: () => {
              bookService.delete(selectedBook.id);
              loadBooks();
              setSelectedBook(null);
            },
          },
        ]
      );
    }
  };

  const filteredBooks = books.filter(
    (book) =>
      book.titulo.toLowerCase().includes(searchTitle.toLowerCase()) &&
      book.autor.toLowerCase().includes(searchAuthor.toLowerCase())
  );

  const renderItem = ({ item }: { item: Book }) => (
    <TouchableOpacity
      style={styles.bookItem}
      onPress={() => {
        setSelectedBook(item);
        setIsEditing(false);
      }}
    >
      <Text style={styles.title}>{item.titulo}</Text>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Autor(a):</Text>
        <Text>{item.autor}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Status:</Text>
        <Text>{item.status}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Editora:</Text>
        <Text>{item.editora}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por título"
        value={searchTitle}
        onChangeText={setSearchTitle}
      />
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por autor(a)"
        value={searchAuthor}
        onChangeText={setSearchAuthor}
      />

      <FlatList
        data={filteredBooks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 30 }}
      />

      <Modal visible={!!selectedBook} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedBook(null)}
            >
              <Ionicons name="close" size={24} color="red" />
            </TouchableOpacity>

            {selectedBook && (
              <>
                <Text style={styles.modalTitle}>{selectedBook.titulo}</Text>

                <Text style={styles.modalLabel}>Autor(a):</Text>
                <TextInput
                  style={styles.input}
                  editable={isEditing}
                  value={selectedBook.autor}
                  onChangeText={(text) => handleFieldChange('autor', text)}
                />

                <Text style={styles.modalLabel}>Status:</Text>
                <View style={styles.pickerWrapper}>
                  <Picker
                    selectedValue={selectedBook.status}
                    enabled={isEditing}
                    onValueChange={(itemValue) => handleFieldChange('status', itemValue)}
                  >
                    <Picker.Item label="Disponível" value="Disponível" />
                    <Picker.Item label="Emprestado" value="Emprestado" />
                  </Picker>
                </View>

                <Text style={styles.modalLabel}>Editora:</Text>
                <TextInput
                  style={styles.input}
                  editable={isEditing}
                  value={selectedBook.editora}
                  onChangeText={(text) => handleFieldChange('editora', text)}
                />

                <Text style={styles.modalLabel}>ISBN:</Text>
                <TextInput
                  style={styles.input}
                  editable={isEditing}
                  value={selectedBook.isbn}
                  onChangeText={(text) => handleFieldChange('isbn', text)}
                />

                <Text style={styles.modalLabel}>Ano de publicação:</Text>
                <TextInput
                  style={styles.input}
                  editable={isEditing}
                  value={selectedBook.ano}
                  keyboardType="numeric"
                  onChangeText={(text) => handleFieldChange('ano', text)}
                />

                <Text style={styles.modalLabel}>Sinopse:</Text>
                <TextInput
                  style={[styles.input, { height: 80 }]}
                  multiline
                  editable={isEditing}
                  value={selectedBook.sinopse}
                  onChangeText={(text) => handleFieldChange('sinopse', text)}
                />

                <TouchableOpacity
                  style={styles.editButton}
                  onPress={isEditing ? saveEdits : () => setIsEditing(true)}
                >
                  <Text style={styles.editButtonText}>
                    {isEditing ? 'Salvar' : 'Editar'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={deleteBook}
                >
                  <Text style={styles.deleteButtonText}>Apagar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ManageBook;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b2d8db',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  searchInput: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  bookItem: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    marginVertical: 6,
    borderRadius: 6,
  },
  title: {
    fontSize: 16,
    color: '#0D4F97',
    fontWeight: 'bold',
  },
  bookDetails: {
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    width: '85%',
    borderRadius: 20,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  modalTitle: {
    fontSize: 20,
    color: '#0D4F97',
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
  },
  modalLabel: {
    fontWeight: 'bold',
    marginTop: 8,
  },
  input: {
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    padding: 8,
    marginTop: 4,
    textAlignVertical: 'top',
  },
  pickerWrapper: {
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    marginTop: 4,
    height: 35,
    justifyContent: 'center',
  },
  editButton: {
    backgroundColor: '#0D4F97',
    padding: 12,
    marginTop: 15,
    borderRadius: 6,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 12,
    marginTop: 15,
    borderRadius: 6,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  infoRow: {
  flexDirection: 'row',
  alignItems: 'center',
},
label: {
  fontWeight: 'bold',
  marginRight: 4,
  fontSize: 14,
},
});
