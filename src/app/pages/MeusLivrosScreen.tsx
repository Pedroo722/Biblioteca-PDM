import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // ou use outro ícone se preferir

type Livro = {
  id: string;
  titulo: string;
  multa: string;
  dataEmprestimo: string;
  dataDevolucao: string;
};

const livros: Livro[] = [
  {
    id: '1',
    titulo: 'Nárnia',
    multa: '0,75',
    dataEmprestimo: '16/02/2025',
    dataDevolucao: '16/05/2025',
  },
  {
    id: '2',
    titulo: 'Quarta asa',
    multa: '0',
    dataEmprestimo: '17/03/2025',
    dataDevolucao: '20/05/2025',
  },
];

const MeusLivrosScreen: React.FC = () => {
  const renderItem = ({ item }: { item: Livro }) => (
    <View style={styles.livroContainer}>
      <Text style={styles.titulo}>{item.titulo}</Text>
      <Text style={styles.texto}>Multa: {item.multa}</Text>
      <Text style={styles.texto}>
        Data de empréstimo: {item.dataEmprestimo}
      </Text>
      <Text style={styles.texto}>Data de devolução: {item.dataDevolucao}</Text>
      <View style={styles.separator} />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meus Livros</Text>
      </View>

      {/* Lista de livros */}
      <FlatList
        data={livros}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.lista}
      />
    </View>
  );
};

export default MeusLivrosScreen;

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
  lista: {
    backgroundColor: '#d9d9d9',
    paddingVertical: 8,
  },
  livroContainer: {
    padding: 12,
    backgroundColor: '#d9d9d9',
  },
  titulo: {
    color: 'blue',
    fontSize: 16,
    fontWeight: 'bold',
  },
  texto: {
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
