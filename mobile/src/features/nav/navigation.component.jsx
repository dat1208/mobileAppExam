import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/home.screen';
import { ListScreen } from '../screens/list.screen';
import { RegisterScreen } from '../screens/register.screen';
import { LoginScreen } from '../screens/login.screen';

const { Navigator, Screen } = createStackNavigator();


const HomeNavigator = () => (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='Home' component={HomeScreen} />
      <Screen name='ListScreen' component={ListScreen} />
      <Screen name='RegisterScreen' component={RegisterScreen} />
      <Screen name='LoginScreen' component={LoginScreen} />

    </Navigator>
  );

  export const AppNavigator = () => (
    <NavigationContainer>
      <HomeNavigator />
    </NavigationContainer>
  );