import React, { useEffect, useState } from 'react';
import { Button, Divider, Icon, Layout, TopNavigation, TopNavigationAction, ListItem, List, Text } from '@ui-kitten/components';
import { SafeAreaView, View } from 'react-native';
import axios from 'axios';
import {BASE_API_URL} from "@env";

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

export const ListScreen = ({ navigation }) => {
  const navigateBack = () => {
    navigation.goBack();
  };
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const renderItemAccessory = () => (
    <Button size='tiny'>
      DETAIL
    </Button>
  );
  const renderItemIcon = (props) => (
    <Icon
      {...props}
      name='person'
    />
  );

  const [users, setUsers] = useState([
    { id: 1, username: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, username: 'Jane Doe', email: 'jane.doe@example.com' },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.timeout = 30000;
        const response = await axios.get(`${BASE_API_URL}/users`);
      //setUsers(response.data)      
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.username}`}
      description={`${item.email}`}
      accessoryLeft={renderItemIcon}
      accessoryRight={renderItemAccessory}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='List Exam Mobile' alignment='center' />
      <Divider />
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{  width: '100%', height: '100%', borderRadius: 10, justifyContent: 'center', alignItems: 'center', padding: 15 }}>
          {users.length > 0 ? (
            <List
              style={{ width: '100%' }}
              data={users}
              renderItem={renderItem}
            />
          ) : (
            <Text>No users found</Text>
          )}
        </View>
      </Layout>
    </SafeAreaView>
  );
};
