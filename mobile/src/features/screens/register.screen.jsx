import React, { useEffect, useState } from 'react';
import { Button, Divider, Icon, Layout, TopNavigation, TopNavigationAction, Spinner , Text , Input} from '@ui-kitten/components';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import axios from 'axios';
import {BASE_API_URL} from "@env";

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

export const RegisterScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false); 
  const [users, setUsers] = useState({ name: '', url: '' ,groupname:''});


  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );


  const handleNameChange = (text) => {
    setUsers({ ...users, name: text });
  };

  const handleUrlChange = (text) => {
    setUsers({ ...users, url: text });
  };
  const handleGroupnameChange = (text) => {
    setUsers({ ...users, groupname: text });
  };

  const handleSubmit = async () => {
    try {
        setLoading(true);
        const response = await axios.post(`${BASE_API_URL}/users`, {
        name: users.name,
        url: users.url,
        groupName: users.groupname
      });

      console.log('Registration successful:', response.data);
   //   navigation.navigate('ListScreen', { shouldLoadList: true});
      navigateBack();

    } catch (error) {
      console.error('Registration failed:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='Register Exam Mobile' alignment='center' accessoryLeft={BackAction} />
      <Divider />
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: '100%', height: '100%', borderRadius: 10, padding: 15 }}>

          <Text category="h4">Register</Text>
          <Text style={{ marginBottom: 10 }}>Điền thông tin cơ bản</Text>
          <Input
            label='Name'
            placeholder="Please type your name"
            value={users.name}
            onChangeText={handleNameChange}
            style={{ marginBottom: 10 }}
          />
          <Input
            label='Url'
            placeholder="Please type your Url"
            value={users.url}
            onChangeText={handleUrlChange}
            style={{ marginBottom: 10 }}
          />
          <Input
            label='Groupname'
            placeholder="Please type your GroupName"
            value={users.groupname}
            onChangeText={handleGroupnameChange}
            style={{ marginBottom: 10 }}
          />

          <Button onPress={handleSubmit} disabled={loading}>
            {loading ? <Text>Loading...</Text> : 'Submit'}
          </Button>

        </View>
      </Layout>
    </SafeAreaView>
  );
};
