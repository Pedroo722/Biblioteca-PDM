import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import LoginScreen from './src/screens/LoginScreen';
import AccountBook from './src/screens/customer/AccountBook';
import CreateLoan from './src/screens/librarian/CreateLoan';
import ManageBooks from './src/screens/librarian/ManageBook';
import ManageClients from './src/screens/librarian/ManageClient';
import ManageLoans from './src/screens/librarian/ManageLoan';
import RegisterBook from './src/screens/librarian/RegisterBook';
import RegisterClients from './src/screens/librarian/RegisterClient';

const Drawer = createDrawerNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login">
        <Drawer.Screen name="Login" component={LoginScreen} />
        <Drawer.Screen name="Meus Livros" component={AccountBook} />
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


