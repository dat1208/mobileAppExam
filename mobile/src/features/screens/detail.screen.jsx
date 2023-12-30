  import React, { useEffect, useState } from 'react';
  import { Button, Divider, Icon, Layout, TopNavigation, TopNavigationAction, Avatar , Text , Input} from '@ui-kitten/components';
  import { SafeAreaView, View, StyleSheet } from 'react-native';
  import axios from 'axios';
  import {BASE_API_URL} from "@env";

  const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' />
  );


  export const DetailScreen = ({ navigation, route}) => {
    const { id } = route.params;

    const [loading, setLoading] = useState(false);
    const [userIdInput, setUserIdInput] = useState('');
    const [user, setUser] = useState({
      name:"",
      url:"",
      groupName:""
    });
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

  

    const handleUpdateUser = async () => {
      try {
        setLoading(true);
        axios.defaults.timeout = 30000;

        const response = await axios.put(`${BASE_API_URL}/users/${id}`, {
          name: user.name,
          url: user.url,
          groupName: user.groupName
        });

        console.log('User updated successfully:', response.data);
        alert('Updated');

        // Fetch updated user details
      } catch (error) {
        console.error('Error updating user:', error.message);
      } finally {
        setLoading(false);
      }
    };

    const handleDeleteUser = async () => {
      try {
        axios.defaults.timeout = 30000;

          const response = await axios.delete(`${BASE_API_URL}/users/${id}`);

          alert("User deleted successfully");
        console.log('User deleted successfully:', response.data);
        // navigation.navigate('ListScreen', { shouldLoadList: true});
        
        navigateBack();
        // Clear user details after deletion
        setUser(null);
      } catch (error) {
        console.error('Error deleting user:', error.message);
      } finally {
        setLoading(false);
      }
    };

    const handleNameChange = (text) => {
      setUser({...user,name:text});
    };
    const handleUrlChange = (text) => {
      setUser({...user,url:text});
    };
    const handleGroupNameChange = (text) => {
      setUser({...user,groupName:text});
    };
    useEffect(() => {
      console.log(id);

      const fetchUserDetails = async () => {
        try {
          axios.defaults.timeout = 30000;
    
          const response = await axios.get(`${BASE_API_URL}/users/${id}`);
          setUser(response.data);
          console.log(response.data)
        } catch (error) {
          alert('Not found');
        } finally {
          setLoading(false);
        }
      };

      fetchUserDetails();

      // Cleanup function (optional)
      return () => {
        // This function will run before the component unmounts
        // It can be used to clear up resources like subscriptions or timers
      };
    }, []);

    return (
      <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='User Detail' alignment='center' accessoryLeft={BackAction} />
      <Divider />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' , backgroundColor: 'white'}}>
        <View style={{ width: '100%', height: '100%', borderRadius: 10, padding: 15, alignItems: 'center', backgroundColor: 'white' }}>
          {user && (
            <>
              <Avatar
                size='giant'
                source={{ uri: user.url }}
                style={{ marginBottom: 20 }}
              />
              <Input
                label='Username'
                value={user.name}
                onChangeText={handleNameChange}
                style={{ marginBottom: 10 }}
              />
              <Input
                label='Url'
                value={user.url}
                onChangeText={handleUrlChange}
                style={{ marginBottom: 10 }}
              />
              <Input
                label='Groupname'
                value={user.groupName}
                onChangeText={handleGroupNameChange}
                style={{ marginBottom: 10 }}
              />
              <Button style={{ marginBottom: 5, width:'100%' }} status='success' onPress={handleUpdateUser}>
                Update User
              </Button>
              <Button style={{width:'100%'}} status='danger' onPress={handleDeleteUser}>
                Delete User
              </Button>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
    );
  };
