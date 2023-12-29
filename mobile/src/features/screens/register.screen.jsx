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
  const [users, setUsers] = useState({ username: '', email: '' });


  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );


  const handleUsernameChange = (text) => {
    setUsers({ ...users, username: text });
  };

  const handleEmailChange = (text) => {
    setUsers({ ...users, email: text });
  };

  const handleSubmit = async () => {
    try {
        setLoading(true);
        const response = await axios.post(`${BASE_API_URL}/users`, {
        username: users.username,
        email: users.email,
      });

      console.log('Registration successful:', response.data);
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
            label='Username'
            placeholder="Please type your username"
            value={users.username}
            onChangeText={handleUsernameChange}
            style={{ marginBottom: 10 }}
          />
          <Input
            label='Email'
            placeholder="Please type your Email"
            value={users.email}
            onChangeText={handleEmailChange}
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
