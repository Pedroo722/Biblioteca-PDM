import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from './src/screens/LoginScreen';

import AccountBooks from './src/screens/customer/AccountBook';
import LibraryBooks from './src/screens/customer/LibraryBooks';

import CreateLoan from './src/screens/librarian/CreateLoan';
import ManageBooks from './src/screens/librarian/ManageBook';
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

            if (route.name === 'a') {
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
        <Tab.Screen name="b" component={AccountBooks} />
        <Tab.Screen name="c" component={LibraryBooks} />

        {/* Telas do Funcionário */}
        <Tab.Screen name="d" component={CreateLoan} />
        <Tab.Screen name="e" component={ManageBooks} />
        <Tab.Screen name="f" component={ManageClients} />
        <Tab.Screen name="g" component={ManageLoans} />
        <Tab.Screen name="h" component={RegisterBook} />
        <Tab.Screen name="i" component={RegisterClients} />


      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;