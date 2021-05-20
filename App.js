import React from 'react';
import {
  StyleSheet
} from 'react-native';
import 'react-native-gesture-handler';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Welcome, Albums, Photos } from './screens'
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Albums" component={Albums} />
        <Stack.Screen name="Photos" component={Photos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
