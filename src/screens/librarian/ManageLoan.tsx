import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text, Modal, TouchableOpacity, TextInput, ScrollView, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Loan } from '../../model/loan/LoanEntity';
import { loanService } from '../../model/loan/LoanService';
import { bookService } from '../../model/book/BookService';
import { useFocusEffect } from '@react-navigation/native'; // Importação adicionada

const ManageLoan: React.FC = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [bookModalVisible, setBookModalVisible] = useState(false);
  const [clientModalVisible, setClientModalVisible] = useState(false);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [showReturned, setShowReturned] = useState(false);
  const [showLoaned, setShowLoaned] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);

  const loadLoans = async () => {
    const data = await loanService.findAll();
    setLoans(data);
  };

  // Substitui o useEffect pelo useFocusEffect para recarregar ao focar na tela
  useFocusEffect(
    useCallback(() => {
      loadLoans();
    }, [])
  );

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

  const handleFinalize = async (id: number) => {
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${
      (today.getMonth() + 1).toString().padStart(2, '0')
    }/${today.getFullYear()}`;

    const updated = await loanService.update(id, {
      status: 'Disponível',
      returnDateReal: formattedDate,
    });

    if (updated) {
      const loan = await loanService.findById(id);

      if (loan) {
        const book = (await bookService.findAll()).find((b: { titulo: string; }) => b.titulo === loan.title);
        if (book) {
          bookService.update(book.id, { status: 'Disponível' });
        } else {
          console.warn('Livro não encontrado para atualização.');
        }
      } else {
        console.warn('Empréstimo não encontrado após atualização.');
      }

      loadLoans();
      Alert.alert('Sucesso', 'Empréstimo finalizado e livro disponível novamente!');
    } else {
      Alert.alert('Erro', 'Falha ao finalizar o empréstimo.');
    }
  };

  const handleCancel = async (id: number) => {
    const loan = await loanService.findById(id);

    if (!loan) {
      Alert.alert('Erro', 'Empréstimo não encontrado para cancelamento.');
      return;
    }

    const books = await bookService.findAll();
    const book = books.find((b: { titulo: string; }) => b.titulo === loan.title);

    if (book) {
      const updatedBook = await bookService.update(book.id, { status: 'Disponível' });
      if (!updatedBook) {
        console.warn('Falha ao atualizar o status do livro.');
      }
    } else {
      console.warn('Livro relacionado ao empréstimo não encontrado.');
    }

    const removed = await loanService.delete(id);

    if (removed) {
      loadLoans();
      Alert.alert('Cancelado', 'Empréstimo removido e livro disponibilizado.');
    } else {
      Alert.alert('Erro', 'Falha ao remover o empréstimo.');
    }
  };

  const filteredLoans = loans.filter((loan) => {
    const matchesTitle = loan.title.toLowerCase().includes(searchTitle.toLowerCase());
    const matchesEmail = loan.email.toLowerCase().includes(searchEmail.toLowerCase());

    const matchesStatus =
      (showReturned && loan.status === 'Disponível') ||
      (showLoaned && loan.status === 'Emprestado') ||
      (!showReturned && !showLoaned);

    return matchesTitle && matchesEmail && matchesStatus;
  })
  .sort((a, b) => {
    const dateA = parseBRDate(a.returnDate);
    const dateB = parseBRDate(b.returnDate);

    if (!dateA || !dateB) return 0; 
    return dateA.getTime() - dateB.getTime(); 
  });

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
          placeholder="Buscar por email"
          value={searchEmail}
          onChangeText={setSearchEmail}
        />
      </View>

      <View style={styles.checkboxContainer}>
        <View style={styles.checkboxItem}>
          <Text>Disponível</Text>
          <Switch value={showReturned} onValueChange={setShowReturned} />
        </View>
        <View style={styles.checkboxItem}>
          <Text>Emprestado</Text>
          <Switch value={showLoaned} onValueChange={setShowLoaned} />
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {filteredLoans.map((loan) => (
          <View key={loan.id} style={styles.loanBox}>
            <TouchableOpacity onPress={() => { setSelectedLoan(loan); setBookModalVisible(true); }}>
              <Text style={styles.clickableTitle}>{loan.title}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { setSelectedLoan(loan); setClientModalVisible(true); }}>
              <Text style={styles.clickableTitle}>{loan.email}</Text>
            </TouchableOpacity>

            <View style={styles.infoRow}>
              <Text style={[styles.labelBold, styles.labelRed]}>Multa:</Text>
              <Text>{calculateFine(loan.returnDate)}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.labelBold}>Status: </Text>
              <Text>{loan.status}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.labelBold}>Data de Empréstimo: </Text>
              <Text>{loan.loanDate}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.labelBold}>Data Esperada de Retorno: </Text>
              <Text>{loan.returnDate}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.labelBold}>Data de Retorno real: </Text>
              <Text>{loan.returnDateReal}</Text>
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.buttonBlue, loan.status === 'Disponível' && { backgroundColor: '#888' }]}
                onPress={() => handleFinalize(loan.id)}
                disabled={loan.status === 'Disponível'}
              >
                <Text style={styles.buttonText}>
                  {loan.status === 'Disponível' ? 'Finalizado' : 'Finalizar'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonRed} onPress={() => handleCancel(loan.id)}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Book Modal */}
      <Modal visible={bookModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, styles.centeredContent]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, styles.centerText]}>
                {selectedLoan?.title}
              </Text>
              <TouchableOpacity onPress={() => setBookModalVisible(false)}>
                <Ionicons name="close" size={24} color="red" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalContentItem}>
              <Text style={styles.labelBold}>Status:</Text>
              <Text>{selectedLoan?.status}</Text>
            </View>

            <View style={styles.modalContentItem}>
              <Text style={styles.labelBold}>Data de empréstimo:</Text>
              <Text>{selectedLoan?.loanDate}</Text>
            </View>

            <View style={styles.modalContentItem}>
              <Text style={styles.labelBold}>Data de retorno:</Text>
              <Text>{selectedLoan?.returnDate}</Text>
            </View>

            <View style={styles.modalContentItem}>
              <Text style={styles.labelBold}>Data de retorno real:</Text>
              <Text>{selectedLoan?.returnDateReal}</Text>
            </View>
          </View>
        </View>
      </Modal>

      {/* Client Modal */}
      <Modal visible={clientModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, styles.centeredContent]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, styles.centerText]}>
                {selectedLoan?.email}
              </Text>
              <TouchableOpacity onPress={() => setClientModalVisible(false)}>
                <Ionicons name="close" size={24} color="red" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalContentItem}>
              <Text style={styles.labelBold}>Status:</Text>
              <Text>{selectedLoan?.status}</Text>
            </View>

            <View style={styles.modalContentItem}>
              <Text style={styles.labelBold}>Data de empréstimo:</Text>
              <Text>{selectedLoan?.loanDate}</Text>
            </View>

            <View style={styles.modalContentItem}>
              <Text style={styles.labelBold}>Data de retorno:</Text>
              <Text>{selectedLoan?.returnDate}</Text>
            </View>

            <View style={styles.modalContentItem}>
              <Text style={styles.labelBold}>Data de retorno real:</Text>
              <Text>{selectedLoan?.returnDateReal}</Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ManageLoan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9AC0C5',
    paddingHorizontal: 10,
  },
  searchContainer: {
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  loanBox: {
    backgroundColor: '#D9D9D9',
    padding: 16,
    marginVertical: 5,
    borderRadius: 8,
  },
  clickableTitle: {
    color: '#0D4F97',
    fontSize: 16,
    fontWeight: 'bold',
  },
  labelRed: {
    color: 'red',
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  labelBold: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'space-around',
  },
  buttonBlue: {
    backgroundColor: '#1E4E8C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  buttonRed: {
    backgroundColor: '#C62828',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00000080',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    fontWeight: 'bold',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0D4F97',
  },
  centerText: {
    textAlign: 'center',
    marginVertical: 10,
  },
  centeredContent: {
    alignItems: 'center',
  },
  modalContentItem: {
    marginVertical: 5,
    alignItems: 'center',
  },
});
