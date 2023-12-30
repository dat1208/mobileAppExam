import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/home.screen';
import { ListScreen } from '../screens/list.screen';
import { RegisterScreen } from '../screens/register.screen';
import { DetailScreen } from '../screens/detail.screen';

const { Navigator, Screen } = createStackNavigator();


const HomeNavigator = () => (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='Home' component={ListScreen} />
      <Screen name='ListScreen' component={ListScreen} />
      <Screen name='RegisterScreen' component={RegisterScreen} />
      <Screen name='DetailScreen' component={DetailScreen} />

    </Navigator>
  );

  export const AppNavigator = () => (
    <NavigationContainer>
      <HomeNavigator />
    </NavigationContainer>
  );