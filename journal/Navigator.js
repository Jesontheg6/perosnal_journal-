import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import Post from './components/posts/Post';
import Posts from './components/posts/Posts';
import NewPost from './components/posts/NewPost';
import navStyles from './styles/navStyles';
import {createStackNavigator, createAppContainer, button} from 'react-navigation';
import { Fab,Icon} from 'native-base'

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
          <Fab
            onPress={this.newPost}
            tyle={styles.newPost}
          >
            <Icon name="add" />
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
  },
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