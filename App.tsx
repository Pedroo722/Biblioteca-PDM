import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from './src/screens/LoginScreen';

import AccountBooks from './src/screens/customer/AccountBooks';
import LibraryBooks from './src/screens/customer/LibraryBooks';

import CreateLoan from './src/screens/librarian/CreateLoan';
import ManageBooks from './src/screens/librarian/ManageBooks';
import ManageClients from './src/screens/librarian/ManageClients';
import ManageLoans from './src/screens/librarian/ManageLoans';
import RegisterBook from './src/screens/librarian/RegisterBook';
import RegisterClients from './src/screens/librarian/RegisterClient';

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Login"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: React.ComponentProps<typeof Ionicons>['name'];

            if (route.name === 'Login') {
              iconName = focused ? 'log-in' : 'log-in-outline';
            } else if (route.name === 'My Books') {
              iconName = focused ? 'book' : 'book-outline';
            } else {
              iconName = 'ellipse';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Login" component={LoginScreen} />

        {/* Telas do Usuário */}
        <Tab.Screen name="My Books" component={AccountBooks} />
        <Tab.Screen name="Library Books" component={LibraryBooks} />

        {/* Telas do Funcionário */}
        <Tab.Screen name="My Books" component={CreateLoan} />
        <Tab.Screen name="Library Books" component={ManageBooks} />
        <Tab.Screen name="My Books" component={ManageClients} />
        <Tab.Screen name="Library Books" component={ManageLoans} />
        <Tab.Screen name="My Books" component={RegisterBook} />
        <Tab.Screen name="Library Books" component={RegisterClients} />


      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;