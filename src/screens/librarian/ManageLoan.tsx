import React, { useState } from 'react';
import { View, StyleSheet, Text, Modal, TouchableOpacity, TextInput, ScrollView, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Loan } from '../../model/loan/LoanEntity';

const ManageLoan: React.FC = () => {
  const [bookModalVisible, setBookModalVisible] = useState(false);
  const [clientModalVisible, setClientModalVisible] = useState(false);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [showReturned, setShowReturned] = useState(false);
  const [showLoaned, setShowLoaned] = useState(false);

  const bookDetails = {
    title: 'Quarta asa',
    author: 'C. S. Lewis',
    status: 'Disponível',
    publisher: 'HarperCollins',
    isbn: '857827069X',
    year: '2005',
    synopsis: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  };

  const clientDetails = {
    name: 'João Lima',
    phone: '(83) 96666-6666',
    email: 'lima.joao@gmail.com',
    password: '123456',
    address: 'Rua ali no canto 121',
  };

  const allLoans: Loan[] = [
    {
      title: 'Quarta asa',
      name: 'João Lima',
      email: 'lime.joao@gmail.com',
      fine: '0,75',
      loanDate: '25/02/2005',
      returnDate: '25/02/2005',
      status: 'Emprestado',
    },
    {
      title: 'As Crônicas de Nárnia',
      name: 'Maria Souza',
      email: 'costa.maria@gmail.com',
      fine: '0,00',
      loanDate: '10/01/2025',
      returnDate: '15/02/2025',
      status: 'Devolvido',
    },
  ];

  const filteredLoans = allLoans.filter((loan) => {
    const matchesTitle = loan.title.toLowerCase().includes(searchTitle.toLowerCase());
    const matchesEmail = clientDetails.email.toLowerCase().includes(searchEmail.toLowerCase());

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
        {filteredLoans.map((loan, index) => (
          <View key={index} style={styles.loanBox}>
            <TouchableOpacity onPress={() => setBookModalVisible(true)}>
              <Text style={styles.clickableTitle}>{loan.title}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setClientModalVisible(true)}>
              <Text style={styles.clickableTitle}>{loan.email}</Text>
            </TouchableOpacity>

            <Text style={styles.labelRed}>Multa: {loan.fine}</Text>
            <Text>Status: {loan.status}</Text>
            <Text>Data de empréstimo: {loan.loanDate}</Text>
            <Text>Data de retorno: {loan.returnDate}</Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.buttonBlue}>
                <Text style={styles.buttonText}>Finalizar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonRed}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <Modal visible={bookModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, styles.centerText]}>
                {bookDetails.title}
              </Text>
              <TouchableOpacity onPress={() => setBookModalVisible(false)}>
                <Ionicons name="close" size={24} color="red" />
              </TouchableOpacity>
            </View>

            <Text style={styles.centerText}>Autor(a): {bookDetails.author}</Text>
            <View style={styles.row}>
              <Text>Status: {bookDetails.status}</Text>
              <Text>Editora: {bookDetails.publisher}</Text>
            </View>
            <View style={styles.row}>
              <Text>ISBN: {bookDetails.isbn}</Text>
              <Text>Ano de publicação: {bookDetails.year}</Text>
            </View>

            <Text style={styles.synopsisLabel}>Sinopse:</Text>
            <Text>{bookDetails.synopsis}</Text>
          </View>
        </View>
      </Modal>

      <Modal visible={clientModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, styles.centerText]}>
                {clientDetails.name}
              </Text>
              <TouchableOpacity onPress={() => setClientModalVisible(false)}>
                <Ionicons name="close" size={24} color="red" />
              </TouchableOpacity>
            </View>

            <Text style={styles.centerText}>Telefone: {clientDetails.phone}</Text>
            <Text style={styles.centerText}>Email: {clientDetails.email}</Text>
            <Text style={styles.centerText}>Senha: {clientDetails.password}</Text>
            <Text style={styles.centerText}>Endereço: {clientDetails.address}</Text>
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
});
