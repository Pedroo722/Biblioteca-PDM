import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Book } from '../../model/book/BookEntity';

const books: Book[] = [
  {
    id: '1',
    title: 'Narnia',
    fine: '0.75',
    loanDate: '02/16/2025',
    returnDate: '05/16/2025',
  },
  {
    id: '2',
    title: 'Fourth Wing',
    fine: '0',
    loanDate: '03/17/2025',
    returnDate: '05/20/2025',
  },
];

const AccountBook: React.FC = () => {
  const renderItem = ({ item }: { item: Book }) => (
    <View style={styles.bookContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>Multa: {item.fine}</Text>
      <Text style={styles.text}>Data de Emprestimo: {item.loanDate}</Text>
      <Text style={styles.text}>Data de Retorno: {item.returnDate}</Text>
      <View style={styles.separator} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meus Livros</Text>
      </View>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default AccountBook;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    backgroundColor: '#4dd0ff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
    color: 'black',
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
    color: 'blue',
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
    backgroundColor: 'black',
    marginTop: 10,
  },
});
