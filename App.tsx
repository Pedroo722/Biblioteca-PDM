import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from './src/app/pages/LoginScreen';
import MyBooksScreen from './src/app/pages/MyBooksScreen';

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
        <Tab.Screen name="My Books" component={MyBooksScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;