import React from 'react';
import { Button, Divider ,Icon, Layout, TopNavigation, TopNavigationAction,  Avatar, ListItem } from '@ui-kitten/components';
import { SafeAreaView, View } from 'react-native';
import { ImageProps, StyleSheet } from 'react-native';

interface IListItem {
    title: string;
    description: string;
  }

const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' />
  );

export const ListScreen = ( {navigation}) => {

    const navigateBack = () => {
        navigation.goBack();
      };

      
    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
      );

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <TopNavigation title='List Exam Mobile' alignment='center' accessoryLeft={BackAction}/>
    <Divider/>
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{backgroundColor: '#f6f9fe', width:'80%', height:'60%', borderRadius:10, justifyContent: 'center', alignItems: 'center', padding:15}}>
      <Button>List Button</Button>
      
      </View>
     
    </Layout>
  </SafeAreaView>
  );
};

