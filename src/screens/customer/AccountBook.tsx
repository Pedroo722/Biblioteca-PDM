import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { Loan } from '../../model/loan/LoanEntity';

type DrawerParamList = {
  'Meus Livros': undefined;
  'Criar Empréstimo': undefined;
  'Gerenciar Livros': undefined;
  'Gerenciar Clientes': undefined;
  'Gerenciar Empréstimos': undefined;
  'Cadastrar Livro': undefined;
  'Cadastrar Cliente': undefined;
};

const books: Loan[] = [
  {
    id: 1,
    email: 'ana@gmail.com',
    name: 'Ana',
    title: 'As crônicas de nárnia',
    fine: '0.75',
    loanDate: '02/16/2025',
    returnDate: '05/16/2025',
    returnDateReal: '',
    status: 'Disponível',
  },
  {
    id: 2,
    email: 'joão@gmail.com',
    name: 'João',
    title: 'Quarta asa',
    fine: '0',
    loanDate: '03/17/2025',
    returnDate: '05/20/2025',
    returnDateReal: '04/20/2025',
    status: 'Indisponível',
  },
];

const AccountBook: React.FC = () => {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Loan | null>(null);

  const openModal = (book: Loan) => {
    setSelectedBook(book);
    setModalVisible(true);
  };

  const renderItem = ({ item }: { item: Loan }) => (
    <TouchableOpacity onPress={() => openModal(item)} style={styles.bookContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Multa:</Text>
        <Text style={styles.text}>{item.fine}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Data de Empréstimo:</Text>
        <Text style={styles.text}>{item.loanDate}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Data Esperada de Retorno:</Text>
        <Text style={styles.text}>{item.returnDate}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Data de Retorno Real:</Text>
        <Text style={styles.text}>{item.returnDateReal}</Text>
      </View>
      <View style={styles.separator} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      {selectedBook && (
        <Modal visible={modalVisible} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <View />
                <Text style={styles.modalTitle}>{selectedBook.title}</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name="close" size={24} color="red" />
                </TouchableOpacity>
              </View>

              <ScrollView>
                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={styles.modalLabel}>Nome:</Text>
                    <Text style={styles.readOnlyBox}>{selectedBook.name}</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.modalLabel}>Email:</Text>
                    <Text style={styles.readOnlyBox}>{selectedBook.email}</Text>
                  </View>
                </View>

                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={styles.modalLabel}>Status:</Text>
                    <Text style={styles.readOnlyBox}>{selectedBook.status}</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.modalLabel}>Multa:</Text>
                    <Text style={styles.readOnlyBox}>{selectedBook.fine}</Text>
                  </View>
                </View>

                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={styles.modalLabel}>Data de Empréstimo:</Text>
                    <Text style={styles.readOnlyBox}>{selectedBook.loanDate}</Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.modalLabel}>Data Esperada de Retorno:</Text>
                    <Text style={styles.readOnlyBox}>{selectedBook.returnDate}</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <Text style={styles.modalLabel}>Data de Retorno Real:</Text>
                  <Text style={styles.readOnlyBox}>{selectedBook.returnDateReal}</Text>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default AccountBook;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#95BFC5',
  },
  list: {
    backgroundColor: '#d9d9d9',
    paddingVertical: 8,
  },
  bookContainer: {
    padding: 12,
    backgroundColor: '#d9d9d9',
  },
  title: {
    color: '#0D4F97',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    color: 'black',
    fontSize: 14,
    marginTop: 4,
  },
  separator: {
    height: 2,
    backgroundColor: '#95BFC5',
    marginTop: 10,
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
    color: '#0D4F97',
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
