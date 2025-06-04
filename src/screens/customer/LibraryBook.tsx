import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal,ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const LibraryBook: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const book = {
    title: 'As crônicas de nárnia',
    author: 'C. S. Lewis',
    status: 'Disponível',
    publisher: 'HarperCollins',
    isbn: '857827069X',
    year: '2005',
    synopsis:
      'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  };

  return (
    <View style={styles.container}>
      <View style={styles.bookItem}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.bookTitle}>As crônicas de nárnia</Text>
        </TouchableOpacity>
        <Text style={styles.bookMeta}>Status: Disponível</Text>
        <Text style={styles.bookMeta}>Editora: HarperCollins</Text>
        <Text style={styles.bookMeta}>C. S. Lewis</Text>
      </View>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <View></View>
              <Text style={styles.modalTitle}>{book.title}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="red" />
              </TouchableOpacity>
            </View>

            <ScrollView>
              <Text style={styles.modalLabel}>Autor(a): {book.author}</Text>

              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.modalLabel}>Status:</Text>
                  <Text style={styles.readOnlyBox}>{book.status}</Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.modalLabel}>Editora:</Text>
                  <Text style={styles.readOnlyBox}>{book.publisher}</Text>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.modalLabel}>ISBN:</Text>
                  <Text style={styles.readOnlyBox}>{book.isbn}</Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.modalLabel}>Ano de publicação:</Text>
                  <Text style={styles.readOnlyBox}>{book.year}</Text>
                </View>
              </View>

              <Text style={styles.modalLabel}>Sinopse:</Text>
              <Text style={styles.readOnlyBox}>{book.synopsis}</Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LibraryBook;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9AC0C5',
  },
  bookItem: {
    backgroundColor: '#ddd',
    padding: 10,
    marginTop: 5,
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
});
