import React, { useEffect, useState } from 'react';
import { Button, Divider, Icon, Layout, TopNavigation, TopNavigationAction, ListItem, List, Text, ButtonGroup, Input } from '@ui-kitten/components';
import { SafeAreaView, View } from 'react-native';
import axios from 'axios';
import {BASE_API_URL} from "@env";

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

const SearchIcon = (props) => (
  <Icon
    {...props}
    name='search-outline'
  />
);

export const ListScreen = ({ navigation,route }) => {

  const navigateBack = () => {
    navigation.goBack();
  };
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );
  const [loading, setLoading] = useState(false); 
  const renderItemAccessory = (id) => (
    <Button onPress={()=>{navigation.navigate('DetailScreen', { id: id });}} size='tiny'>
      Detail
    </Button>
  );
  const renderItemIcon = (props) => (
    <Icon
      {...props}
      name='person'
    />
  );

  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', url: 'john.doe@example.com', groupname:'dawd' },
    { id: 2, name: 'John Doe2', url: 'john.doe@example.com', groupname:'dawd' },
  ]);

  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        axios.defaults.timeout = 30000;
        const response = await axios.get(`${BASE_API_URL}/users`);
        setUsers(response.data)      
      } catch (error) {
        console.error('Error fetching users:', error);
      }
      setLoading(false);

    };

    fetchData();
  }, [users]);

  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.name}`}
      description={`${item.groupName}`}
      accessoryLeft={renderItemIcon}
      onPress={()=>{navigation.navigate('DetailScreen', { id: item.id });}}
      accessoryRight={() => renderItemAccessory(item.id)}
    />
  );
  const CreateAction = () => (
    <Button appearance='outline' onPress={()=>{navigation.navigate('RegisterScreen')}}>Create</Button>
  );

  const handleSearch =  async (text) => {
    if(text.length <= 3){
      return;
    }
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    await handleSearchApi(text);
  }

  const handleSearchApi = async (text) => {
  
    try {
      axios.defaults.timeout = 30000;
      console.log(text);
      const response = await axios.get(`${BASE_API_URL}/users?group=${text}`);
      setUsers(response.data);
      console.log('Search:', response.data);

      // Fetch updated user details
    } catch (error) {
      console.error('Error updating user:', error.message);
    } finally {
    }
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='List Exam Mobile' alignment='center' accessoryRight={CreateAction}/>
      <Divider />
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Input
      style={{marginTop:50, marginHorizontal:10}}
          onChangeText={(text)=>handleSearch(text)}
          placeholder='Place your text'
           accessoryRight={SearchIcon}
           ></Input>
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
