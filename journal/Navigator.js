import React from 'react';
import { StyleSheet, View } from 'react-native';
import Post from './Post';
import Posts from './Posts';
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


 render() {
    return (
        <View style={styles.container}>
          <Posts {...this.props} />
        </View> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
});


const AppNavigator = createStackNavigator({
    Home:{
      screen:Home
    },
    Post:{
      screen: Post
    }
  });

export default createAppContainer(AppNavigator);