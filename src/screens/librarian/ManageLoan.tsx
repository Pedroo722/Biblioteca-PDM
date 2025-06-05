import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Modal, TouchableOpacity, TextInput, ScrollView, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Loan } from '../../model/loan/LoanEntity';
import { loanService } from '../../model/loan/LoanService';

const ManageLoan: React.FC = () => {
  const [loans, setLoans] = useState<(Loan & { id: string })[]>([]);
  const [bookModalVisible, setBookModalVisible] = useState(false);
  const [clientModalVisible, setClientModalVisible] = useState(false);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [showReturned, setShowReturned] = useState(false);
  const [showLoaned, setShowLoaned] = useState(false);

  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);

  useEffect(() => {
    const data = loanService.findAll();
    setLoans(data);
  }, []);

  const handleFinalize = (id: string) => {
    const updated = loanService.update(id, { status: 'Devolvido' });
    if (updated) {
      setLoans(loanService.findAll());
      Alert.alert('Sucesso', 'Empréstimo finalizado com sucesso!');
    }
  };

  const handleCancel = (id: string) => {
    const removed = loanService.delete(id);
    if (removed) {
      setLoans(loanService.findAll());
      Alert.alert('Cancelado', 'Empréstimo removido com sucesso.');
    }
  };

  const filteredLoans = loans.filter((loan) => {
    const matchesTitle = loan.title.toLowerCase().includes(searchTitle.toLowerCase());
    const matchesEmail = loan.email.toLowerCase().includes(searchEmail.toLowerCase());

    const matchesStatus =
      (showReturned && loan.status === 'Devolvido') ||
      (showLoaned && loan.status === 'Emprestado') ||
      (!showReturned && !showLoaned);

    return matchesTitle && matchesEmail && matchesStatus;
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
          <Text>Devolvido</Text>
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
              <Text>{loan.fine}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.labelBold}>Status:</Text>
              <Text>{loan.status}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.labelBold}>Data de empréstimo:</Text>
              <Text>{loan.loanDate}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.labelBold}>Data de retorno:</Text>
              <Text>{loan.returnDate}</Text>
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.buttonBlue} onPress={() => handleFinalize(loan.id)}>
                <Text style={styles.buttonText}>Finalizar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonRed} onPress={() => handleCancel(loan.id)}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
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
          </View>
        </View>
      </Modal>

      <Modal visible={clientModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, styles.centeredContent]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, styles.centerText]}>
                {selectedLoan?.name}
              </Text>
              <TouchableOpacity onPress={() => setClientModalVisible(false)}>
                <Ionicons name="close" size={24} color="red" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalContentItem}>
              <Text style={styles.labelBold}>Email:</Text>
              <Text>{selectedLoan?.email}</Text>
            </View>

            <View style={styles.modalContentItem}>
              <Text style={styles.labelBold}>Multa:</Text>
              <Text>{selectedLoan?.fine}</Text>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  synopsisLabel: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  labelBold: {
  fontWeight: 'bold',
  fontSize: 14,
  textAlign: 'center',
},

centeredContent: {
  alignItems: 'center',
},

modalContentItem: {
  marginVertical: 5,
  alignItems: 'center',
},
infoRow: {
  flexDirection: 'row',
  alignItems: 'center',
},

});
