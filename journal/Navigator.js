import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import Post from './components/posts/Post';
import Posts from './components/posts/Posts';
import NewPost from './components/posts/NewPost';
import navStyles from './styles/navStyles';
import {createStackNavigator, createAppContainer, button} from 'react-navigation';

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
          <TouchableHighlight onPress={this.newPost} style={styles.newPost}>
          	<Text style={styles.newPostTexts}> New Post + </Text>
          </TouchableHighlight> 
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
  	padding: 20
  },
  newPostTexts: {
  	fontSize: 20,
  	textAlign: "center"
  }
});


const AppNavigator = createStackNavigator({
    Home:{
      screen:Home
    },
    Post:{
      screen: Post
    },
    NewPost: {
    	screen: NewPost
    }
  });

export default createAppContainer(AppNavigator);