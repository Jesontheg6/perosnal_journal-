import React from 'react';
import { StyleSheet, View,ActivityIndicator, Text, TouchableHighlight, Button } from 'react-native';
import Post from './components/posts/Post';
import Posts from './components/posts/Posts';
import NewPost from './components/posts/NewPost';
import UpdatePost from './components/posts/UpdatePost';
import navStyles from './styles/navStyles';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import {Fab,Icon} from 'native-base'
import Login from './components/user/Login'
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {signOut} from './loginUtils'
import {withApollo} from 'react-apollo'

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home',
    ...navStyles
   
  };

 goToPost = () => {
    this.props.navigation.navigate("Post");
  };

   newPost = () => {
    this.props.navigation.navigate("NewPost");
  };



 render() {
    return (
        <View style={styles.container}>
          <Posts {...this.props} />
          <Button
          onPress = {()=> { 
            signOut();
          this.props.client.resetStore();
          }}
          title = "Logout"/>
          <Fab
            onPress={this.newPost}
            style={styles.newPost}
          >
            <Icon name="ios-add-circle" />
          </Fab>
        </View> 
    );
  }
}

const styles = StyleSheet.create({
  container: { 
  	flex: 1,
  	justifyContent: "space-between"
  },
  newPost: {
  	backgroundColor: "#82D8D8",
  }
});

const AppNavigator = createStackNavigator({
    Home:{
      screen: withApollo(Home)
    },
    Post:{
      screen: Post
    },
    NewPost: {
    	screen: NewPost
    },
    UpdatePost: {
      screen: UpdatePost
    }
  });

const App = createAppContainer(AppNavigator);

const NavWrapper = ({loading , user}) => {
if (loading) return <ActivityIndicator size="large"/>;;
if (!user) return <Login />
  return <App screenProps={{user}}/>
}

const userQuery = gql `
  query userQuery {
   user {
      id 
      email
      posts(orderBy: createdAt_DESC) {
        id
        title
      }
    }
  }
`

export default graphql(userQuery, { props:({data}) => ({...data})})(NavWrapper);