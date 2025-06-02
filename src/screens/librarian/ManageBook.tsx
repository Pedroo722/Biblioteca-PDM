import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Modal, FlatList,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
type Livro = {
  id: string;
  titulo: string;
  autor: string;
  status: string;
  editora: string;
  isbn: string;
  ano: string;
  sinopse: string;
};

const livrosMock: Livro[] = [
  {
    id: '1',
    titulo: 'As crônicas de nárnia',
    autor: 'C. S. Lewis',
    status: 'Disponível',
    editora: 'HarperCollins',
    isbn: '857827069X',
    ano: '2005',
    sinopse: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  },
  {
    id: '2',
    titulo: 'Quarta asa',
    autor: 'C. S. Lewis',
    status: 'Disponível',
    editora: 'HarperCollins',
    isbn: '857827069X',
    ano: '2005',
    sinopse: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  },
];

const ManageBook: React.FC = () => {
  const [livros, setLivros] = useState<Livro[]>(livrosMock);
  const [selectedBook, setSelectedBook] = useState<Livro | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleFieldChange = (field: keyof Livro, value: string) => {
    if (selectedBook) {
      setSelectedBook({ ...selectedBook, [field]: value });
    }
  };

  const saveEdits = () => {
    if (selectedBook) {
      setLivros((prevLivros) =>
        prevLivros.map((livro) =>
          livro.id === selectedBook.id ? selectedBook : livro
        )
      );
      setIsEditing(false);
    }
  };

  const renderItem = ({ item }: { item: Livro }) => (
    <TouchableOpacity
      style={styles.bookItem}
      onPress={() => {
        setSelectedBook(item);
        setIsEditing(false);
      }}
    >
      <Text style={styles.title}>{item.titulo}</Text>
      <View style={styles.bookDetails}>
        <Text>{item.autor}</Text>
        <Text>Status: {item.status}</Text>
        <Text>Editora: {item.editora}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gerenciar Livros</Text>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>


      <FlatList
        data={livros}
        keyExtractor={(item) => item.id}
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
                <TextInput
                  style={styles.input}
                  editable={isEditing}
                  value={selectedBook.status}
                  onChangeText={(text) => handleFieldChange('status', text)}
                />

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
  },
  header: {
    backgroundColor: '#4dd0ff',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookItem: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    marginVertical: 6,
    marginHorizontal: 10,
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
    color: '#0a2fc2',
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
  editButton: {
    backgroundColor: '#004080',
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
