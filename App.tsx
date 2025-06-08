import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import AccountBooks from './src/screens/customer/AccountBook';
import LibraryBooks from './src/screens/customer/LibraryBook';
import CreateLoan from './src/screens/librarian/CreateLoan';
import ManageBooks from './src/screens/librarian/ManageBook';
import ManageClients from './src/screens/librarian/ManageClient';
import ManageLoans from './src/screens/librarian/ManageLoan';
import RegisterBook from './src/screens/librarian/RegisterBook';
import RegisterClients from './src/screens/librarian/RegisterClient';

import { loadDatabase } from './src/database/DataBaseManager';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      <Text style={styles.sectionTitle}>Cliente</Text>
      <DrawerItem
        label="Meus Livros"
        onPress={() => props.navigation.navigate('Meus Livros')}
        icon={({ color, size }) => <Ionicons name="book" size={size} color={color} />}
      />
      <DrawerItem
        label="Biblioteca"
        onPress={() => props.navigation.navigate('Biblioteca')}
        icon={({ color, size }) => <Ionicons name="library" size={size} color={color} />}
      />

      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>Funcionário</Text>
      <DrawerItem
        label="Gerenciar Clientes"
        onPress={() => props.navigation.navigate('Gerenciar Clientes')}
        icon={({ color, size }) => <Ionicons name="people" size={size} color={color} />}
      />
      <DrawerItem
        label="Cadastrar Cliente"
        onPress={() => props.navigation.navigate('Cadastrar Cliente')}
        icon={({ color, size }) => <Ionicons name="person-add" size={size} color={color} />}
      />
      <DrawerItem
        label="Gerenciar Livros"
        onPress={() => props.navigation.navigate('Gerenciar Livros')}
        icon={({ color, size }) => <Ionicons name="create" size={size} color={color} />}
      />
      <DrawerItem
        label="Cadastrar Livro"
        onPress={() => props.navigation.navigate('Cadastrar Livro')}
        icon={({ color, size }) => <Ionicons name="book-outline" size={size} color={color} />}
      />
      <DrawerItem
        label="Gerenciar Empréstimos"
        onPress={() => props.navigation.navigate('Gerenciar Empréstimos')}
        icon={({ color, size }) => <Ionicons name="clipboard" size={size} color={color} />}
      />
      <DrawerItem
        label="Criar Empréstimo"
        onPress={() => props.navigation.navigate('Criar Empréstimo')}
        icon={({ color, size }) => <Ionicons name="add-circle" size={size} color={color} />}
      />
      
    </DrawerContentScrollView>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    loadDatabase();
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Biblioteca"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4dd0ff',
          },
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
            textAlign: 'center',
            alignSelf: 'center',
          },
          headerTintColor: 'black',
          headerTitleAlign: 'center',
          drawerActiveTintColor: '#0D4F97',
          drawerInactiveTintColor: 'gray',
        }}
      >
        <Drawer.Screen name="Meus Livros" component={AccountBooks} />
        <Drawer.Screen name="Biblioteca" component={LibraryBooks} />
        <Drawer.Screen name="Criar Empréstimo" component={CreateLoan} />
        <Drawer.Screen name="Gerenciar Livros" component={ManageBooks} />
        <Drawer.Screen name="Gerenciar Clientes" component={ManageClients} />
        <Drawer.Screen name="Gerenciar Empréstimos" component={ManageLoans} />
        <Drawer.Screen name="Cadastrar Livro" component={RegisterBook} />
        <Drawer.Screen name="Cadastrar Cliente" component={RegisterClients} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 16,
    color: '#0D4F97',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
    marginHorizontal: 16,
  },
});
