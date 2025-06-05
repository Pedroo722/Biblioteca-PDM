import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const LibraryBook: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchAuthor, setSearchAuthor] = useState('');

  const books = [
    {
      title: 'As crônicas de nárnia',
      author: 'C. S. Lewis',
      status: 'Disponível',
      publisher: 'HarperCollins',
      isbn: '857827069X',
      year: '2005',
      synopsis:
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    },
    {
      title: 'O Senhor dos Anéis',
      author: 'J. R. R. Tolkien',
      status: 'Indisponível',
      publisher: 'Martins Fontes',
      isbn: '8533615546',
      year: '1954',
      synopsis:
        'Uma aventura épica sobre a luta entre o bem e o mal na Terra Média.',
    },
  ];

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
      book.author.toLowerCase().includes(searchAuthor.toLowerCase())
  );

  const openModal = (book: any) => {
    setSelectedBook(book);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar por título"
          value={searchTitle}
          onChangeText={setSearchTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Buscar por autor"
          value={searchAuthor}
          onChangeText={setSearchAuthor}
        />
      </View>

      <ScrollView>
        {filteredBooks.map((book, index) => (
          <View key={index} style={styles.bookItem}>
            <TouchableOpacity onPress={() => openModal(book)}>
              <Text style={styles.bookTitle}>{book.title}</Text>
            </TouchableOpacity>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Status:</Text>
              <Text style={styles.bookMeta}>{book.status}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Editora:</Text>
              <Text style={styles.bookMeta}>{book.publisher}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Autor:</Text>
              <Text style={styles.bookMeta}>{book.author}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {selectedBook && (
        <Modal visible={modalVisible} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <View></View>
                <Text style={styles.modalTitle}>{selectedBook.title}</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name="close" size={24} color="red" />
                </TouchableOpacity>
              </View>

              <ScrollView>
                <Text style={styles.modalLabel}>Autor(a): {selectedBook.author}</Text>

                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={styles.modalLabel}>Status:</Text>
                    <Text style={styles.readOnlyBox}>{selectedBook.status}</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.modalLabel}>Editora:</Text>
                    <Text style={styles.readOnlyBox}>{selectedBook.publisher}</Text>
                  </View>
                </View>

                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={styles.modalLabel}>ISBN:</Text>
                    <Text style={styles.readOnlyBox}>{selectedBook.isbn}</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.modalLabel}>Ano de publicação:</Text>
                    <Text style={styles.readOnlyBox}>{selectedBook.year}</Text>
                  </View>
                </View>

                <Text style={styles.modalLabel}>Sinopse:</Text>
                <Text style={styles.readOnlyBox}>{selectedBook.synopsis}</Text>
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default LibraryBook;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9AC0C5',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  searchContainer: {
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
  },
  bookItem: {
    backgroundColor: '#ddd',
    padding: 10,
    marginBottom: 8,
    borderRadius: 6,
  },
  bookTitle: {
    color: '#0D4F97',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookMeta: {
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00000099',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0057A0',
  },
  modalLabel: {
    fontWeight: '600',
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  column: {
    flex: 1,
  },
  readOnlyBox: {
    backgroundColor: '#ffffff',
    borderRadius: 6,
    padding: 10,
    minHeight: 40,
  },
  infoRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 4,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 4,
  },
});
