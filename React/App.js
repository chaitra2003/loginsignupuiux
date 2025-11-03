import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import LoginSignupScreen from './screens/LoginScreen'; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer> 
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginSignupScreen} 
          options={{ headerShown: false }} // You can set to true to show header
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
