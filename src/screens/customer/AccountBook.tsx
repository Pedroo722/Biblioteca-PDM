import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Book } from '../../model/book/BookEntity';

type DrawerParamList = {
  'Meus Livros': undefined;
  'Criar Empréstimo': undefined;
  'Gerenciar Livros': undefined;
  'Gerenciar Clientes': undefined;
  'Gerenciar Empréstimos': undefined;
  'Cadastrar Livro': undefined;
  'Cadastrar Cliente': undefined;
};

const books: Book[] = [
  {
    id: '1',
    title: 'As crônicas de nárnia',
    author: 'C. S. Lewis',
    fine: '0.75',
    loanDate: '02/16/2025',
    returnDate: '05/16/2025',
  },
  {
    id: '2',
    title: 'Quarta asa',
    author: 'C. l. ckidifmj',
    fine: '0',
    loanDate: '03/17/2025',
    returnDate: '05/20/2025',
  },
];

const AccountBook: React.FC = () => {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  const renderItem = ({ item }: { item: Book }) => (
    <View style={styles.bookContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>Autor: {item.author}</Text>
      <Text style={styles.text}>Multa: {item.fine}</Text>
      <Text style={styles.text}>Data de Empréstimo: {item.loanDate}</Text>
      <Text style={styles.text}>Data de Retorno: {item.returnDate}</Text>
      <View style={styles.separator} />
    </View>
  );

  return (
    <View style={styles.container}>
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
    color: 'black',
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
});
