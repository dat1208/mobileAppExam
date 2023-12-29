import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Divider, Layout, TopNavigation } from '@ui-kitten/components';
export const HomeScreen = ({ navigation }) => {
  const navigateList = () => {
    navigation.navigate('ListScreen');
  };

  const navigateRegister = () => {
    navigation.navigate('RegisterScreen');
  };

  const navigateLogin = () => {
    navigation.navigate('LoginScreen');
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='Exam Mobile' alignment='center' />
      <Divider />
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button onPress={navigateRegister}>REGISTER</Button>
        <Divider></Divider>
        <Button onPress={navigateLogin}>LOGIN</Button>
        <Divider></Divider>
        <Button onPress={navigateList}>GET LIST</Button>
        <Divider></Divider>
      </Layout>
    </SafeAreaView>
  );
};