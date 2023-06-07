import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/component/Home';
import { Provider } from 'react-redux';
import store from './src/store';
import DetailWeather from './src/component/DetailWeather';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Home' screenOptions={{
            headerStyle: { backgroundColor: '#2592DA' },
            headerTintColor: 'white'
          }}>
            <Stack.Screen name='Home' component={Home} options={{ title: 'Weather App' }} />
            <Stack.Screen name='Detail' component={DetailWeather} options={{ title: 'Weather Details' }} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
