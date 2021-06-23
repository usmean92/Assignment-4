import React, { useEffect, useState } from 'react';
import { Text,FlatList, View, StyleSheet,TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DataTable } from 'react-native-paper';
import { Container, Header, Content, List, ListItem,Thumbnail, Left ,Body,Right} from 'native-base';
import AssetExample from './components/AssetExample';
import { Card,Avatar, Button,  Title, Paragraph  } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Tab = createBottomTabNavigator();

function App1({route, navigation }) {
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(json => {
        setUsers(json);
      });
  });
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [input1, setinput1] = useState("");
  const [input2, setinput2] = useState("");
  const [valMsg, setValMsg] = useState([]);
  const [originalPrice, setoriginalPrice] = useState(0);
  const [discountt, setDisocunt] = useState(0);
  const [youSaveVal, setSaveVal] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [getItemsList,setItemsList] = useState([]);
  const [getcounter, setCounter] = useState(0);
  navigation.setOptions({
      headerRight: () => (
      <Text onPress={() => {
            navigation.navigate('History', {
            list:getItemsList})
            setCounter(0);
            }
          } style={{color:'Black',marginRight:10,fontSize:15}}>History</Text>
      ),
    });

  return (
    <Container>
      <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          
          renderItem={({ item }) => (
            <View style={styles.container}>
              <View style={styles.top }>
              <Content>
          <List>
            <ListItem onPress={() => {
            navigation.navigate('History', {
            list:item})
            setCounter(0);
            }
          }>
              <Text>{item.name}</Text>
            </ListItem>
          </List>
        </Content>
              </View>
            </View>
          )}
        />
      </Container>
  );
}
function Feed({ route }) {
  console.log(route.params.data.name);
  const data=route.params.data;
  return (
    <Card>
    <Card.Title title="User Details"  />
    <Card.Content>
      <Title>Name </Title>
      <Paragraph> {data.name}</Paragraph>
      <Title>UserName </Title>
      <Paragraph> {data.username}</Paragraph>
      <Title>Email </Title>
      <Paragraph> {data.email}</Paragraph>
      <Title>Company Name </Title>
      <Paragraph> {data.company.name}</Paragraph>
    </Card.Content>
  </Card>

  );
}

function Profile({ route }) {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1/todos')
      .then(res => res.json())
      .then(json => {
        setUsers(json);
      });
  });
  
  return (
    <Container>
      <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          
          renderItem={({ item }) => (
            <View style={styles.container}>
              <View style={styles.top }>
              <Content>
          <List>
            <ListItem 
          >
              <Text>{item.title}</Text>
            </ListItem>
          </List>
        </Content>
              </View>
            </View>
          )}
        />
      </Container>
  );
}

function Notifications({ route,navigation }) {
  const [albums, setAlbum] = useState([]);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1/albums')
      .then(res => res.json())
      .then(json => {
        setAlbum(json);
      });
  });
  console.log(route.params.data.name)
  return (
    <Container>
      <FlatList
          data={albums}
          keyExtractor={(item) => item.id}
          
          renderItem={({ item }) => (
            <View style={styles.container}>
              <View style={styles.top }>
              <Content>
          <List>
            <ListItem onPress={() => {
            navigation.navigate('Album', {
            list:item})
            }
          }>
              <Text>{item.title}</Text>
            </ListItem>
          </List>
        </Content>
              </View>
            </View>
          )}
        />
      </Container>
  );
}

function Post({ route }) {
  const [post, setPost] = useState([]);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1/posts')
      .then(res => res.json())
      .then(json => {
        setPost(json);
      });
  });
  console.log(route.params.data.name);
  const data=route.params.data;
  return (
    <Container>
      <FlatList
          data={post}
          keyExtractor={(item) => item.id}
          
          renderItem={({ item }) => (
            <View style={styles.container}>
              <View style={styles.top }>
              <Content>
          <List>
            <ListItem 
          >
              <Text>{item.title}</Text>
            </ListItem>
          </List>
        </Content>
              </View>
            </View>
          )}
        />
      </Container>

  );
}


function History ({route, navigation }) {
  
 var data = route.params.list;
 const [getList,setList] = useState(data); 

  return (
<Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}
      
      
    >
      <Tab.Screen
        name="Feed"
        component={Feed}
        initialParams={{data: data}}
        options={{
          tabBarLabel: 'User Details',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        initialParams={{data: data}}
        options={{
          tabBarLabel: 'Album Tab',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
          // tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        initialParams={{data: data}}
        options={{
          tabBarLabel: 'To dos Tab',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="post"
        component={Post}
        initialParams={{data: data}}
        options={{
          tabBarLabel: 'Post Tab',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}


// This is Album Screen
function Album ({route, navigation }) {
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/albums/1/photos')
      .then(res => res.json())
      .then(json => {
        setPhotos(json);
      });
  });
 
  return (
    <Container>
    <FlatList
          data={photos}
          keyExtractor={(item) => item.id}
          
          renderItem={({ item }) => (
            <Content>
          <List>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{ uri: item.url }} />
              </Left>
              <Body>
                <Text>Sankhadeep</Text>
                <Text note numberOfLines={1}>{item.title}</Text>
              </Body>
              <Right>
              </Right>
            </ListItem>
          </List>
        </Content>
          )}
        />
      </Container>
  );
}



const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
         <Stack.Screen
          name="Home"
          component={App1}
          options={({ navigation, route }) => ({
             title:'Home',
             headerStyle:{
               height:75,

             }
          })}
        />
        <Stack.Screen
          name="History"
          component={History}
          options={({ navigation, route }) => ({
           title:'History ',
           headerLeft:null
          })}
        />
        <Stack.Screen
          name="Album"
          component={Album}
          options={({ navigation, route }) => ({
           title:'Album ',
           headerLeft:null
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
    padding: 8
    // ,alignItems:"center"
  },
  
});
export default App;