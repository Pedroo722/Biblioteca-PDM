import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { Loan } from '../../model/loan/LoanEntity';
import { loanService } from '../../model/loan/LoanService';

type DrawerParamList = {
  'Meus Livros': undefined;
  'Criar Empréstimo': undefined;
  'Gerenciar Livros': undefined;
  'Gerenciar Clientes': undefined;
  'Gerenciar Empréstimos': undefined;
  'Cadastrar Livro': undefined;
  'Cadastrar Cliente': undefined;
};

const AccountBook: React.FC = () => {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const [loans, setLoans] = useState<Loan[]>([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Loan | null>(null);

  useEffect(() => {
    const fetchLoans = async () => {
      const fetchedLoans = await loanService.findAll();
      setLoans(fetchedLoans);
    };

    fetchLoans();
  }, []);

  const openModal = (book: Loan) => {
    setSelectedBook(book);
    setModalVisible(true);
  };

  const parseBRDate = (dateStr: string): Date | null => {
    if (!dateStr) return null;
    const parts = dateStr.split('/');
    if (parts.length !== 3) return null;
    const [day, month, year] = parts;
    const isoString = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    const dateObj = new Date(isoString);
    return isNaN(dateObj.getTime()) ? null : dateObj;
  };

  const calculateFine = (returnDate: string): string => {
    const returnDt = parseBRDate(returnDate);
    if (!returnDt) return 'R$ 0,00';

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    returnDt.setHours(0, 0, 0, 0);

    if (today <= returnDt) return 'R$ 0,00';

    const adjustedReturnDate = new Date(returnDt);
    adjustedReturnDate.setDate(adjustedReturnDate.getDate() + 1);

    const diffTime = today.getTime() - adjustedReturnDate.getTime();
    const diffDays = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));

    const fineAmount = diffDays * 0.25;
    return `R$ ${fineAmount.toFixed(2).replace('.', ',')}`;
  };

  const filteredLoans = loans
  .filter((loan) =>
    loan.title.toLowerCase().includes(searchTitle.toLowerCase())
  )
  .sort((a, b) => {
    const dateA = parseBRDate(a.returnDate);
    const dateB = parseBRDate(b.returnDate);
    if (!dateA || !dateB) return 0;
    return dateA.getTime() - dateB.getTime();
  });

  const renderItem = ({ item }: { item: Loan }) => (
    <TouchableOpacity onPress={() => openModal(item)} style={styles.bookContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.infoRow}>
        <Text style={styles.labelRed}>Multa:</Text>
        <Text style={styles.text}>{calculateFine(item.returnDate)}</Text>
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
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por título"
        value={searchTitle}
        onChangeText={setSearchTitle}
      />

      <FlatList
        data={filteredLoans}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
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
                    <Text style={styles.readOnlyBox}>{calculateFine(selectedBook.returnDate)}</Text>
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
  labelRed: {
    color: 'red',
    fontWeight: 'bold',
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
    borderRadius: 8,
    fontSize: 16,
  },
});
