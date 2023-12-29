import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Divider, Layout, TopNavigation } from '@ui-kitten/components';
export const HomeScreen = ({ navigation }) => {
  const navigateList = () => {
    navigation.navigate('List');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='Exam Mobile' alignment='center' />
      <Divider />
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button onPress={navigateDetails}>OPEN LIST</Button>
        <Divider></Divider>
      </Layout>
    </SafeAreaView>
  );
};