import React, { useEffect, useState } from 'react';
import { Button, Divider, Icon, Layout, TopNavigation, TopNavigationAction, Spinner , Text , Input} from '@ui-kitten/components';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import axios from 'axios';
import {BASE_API_URL} from "@env";

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

export const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [userIdInput, setUserIdInput] = useState('');
  const [user, setUser] = useState(null);
  const [updatedUsername, setUpdatedUsername] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const handleUserIdChange = (text) => {
    setUserIdInput(text);
  };

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      axios.defaults.timeout = 30000;

      const response = await axios.get(`${BASE_API_URL}/users/${userIdInput}`);
      setUser(response.data);
    } catch (error) {
      alert('Not found');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async () => {
    try {
      setLoading(true);
      axios.defaults.timeout = 30000;

      const response = await axios.put(`${BASE_API_URL}/users/${userIdInput}`, {
        username: updatedUsername,
        email: updatedEmail,
      });

      console.log('User updated successfully:', response.data);

      // Fetch updated user details
      fetchUserDetails();
    } catch (error) {
      console.error('Error updating user:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    try {
      axios.defaults.timeout = 30000;

        const response = await axios.delete(`${BASE_API_URL}/users/${userIdInput}`);

        alert("User deleted successfully");
      console.log('User deleted successfully:', response.data);

      // Clear user details after deletion
      setUser(null);
    } catch (error) {
      console.error('Error deleting user:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='User Detail' alignment='center' accessoryLeft={BackAction} />
      <Divider />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: '100%', height: '100%', borderRadius: 10, padding: 15 }}>
          <Text category="h4">User Detail</Text>

          <Input
            label='User ID'
            placeholder="Enter User ID"
            value={userIdInput}
            onChangeText={handleUserIdChange}
            style={{ marginBottom: 10 }}
          />

          <Button onPress={fetchUserDetails} disabled={loading}>
            {loading ?  <Text>Loading...</Text>  : 'Get User Details'}
          </Button>

          {user && (
            <>
              <Input
                label='Username'
                value={user.username}
                disabled
                style={{ marginBottom: 10, marginTop:20 }}
              />
              <Input
                label='Email'
                value={user.email}
                disabled
                style={{ marginBottom: 10 }}
              />

              {/* Update user form */}
              <Input
                label='Updated Username'
                placeholder='Enter updated username'
                value={updatedUsername}
                onChangeText={(text) => setUpdatedUsername(text)}
                style={{ marginBottom: 10 }}
              />
              <Input
                label='Updated Email'
                placeholder='Enter updated email'
                value={updatedEmail}
                onChangeText={(text) => setUpdatedEmail(text)}
                style={{ marginBottom: 10 }}
              />
              <Button style={{marginBottom:5}} status='success' onPress={handleUpdateUser}>
                Update User
              </Button>

              <Button status='danger' onPress={handleDeleteUser}>
                Delete User
              </Button>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
