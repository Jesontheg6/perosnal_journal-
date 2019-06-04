import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  Alert,
  View
} from 'react-native';
import {List, ListItem, Body, Right, Icon} from "native-base";
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import Swipeout from 'react-native-swipeout';
import withCrypto from '../../cryptoMiddleware';

class Posts extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      posts: []
    };
  }

  setPosts = (posts) => {
    const { decryptData, clearPassphrase } = this.props;
    if (!posts) return [];
    const decryptedPosts = posts.map(item => {
      return { ...item, title: decryptData(item.title) };
    }).filter(item => item.title);
    if (decryptedPosts.length !== posts.length) {
      Alert.alert("Error", "Some data could not be decrypted. Please, check your passphrase.");
      clearPassphrase();
    }
    this.setState({ posts: decryptedPosts });
  }

  componentDidMount() {
    const { screenProps: { user: { posts }} } = this.props;
    if (posts) this.setPosts(posts);
  }

  componentWillReceiveProps(nextProps) {
    const { screenProps: { user: { posts }} } = nextProps;
    if (posts) this.setPosts(nextProps.screenProps.user.posts);
  }

  deletePost = (id) => {
  // console.log("XXXXXXXXXFUC")
  const {deletePost, navigation} = this.props;
  this.setState(prev => ({
    posts: prev.posts.filter(post => post.id !== id),
  }))
  console.log('HERE', id)
    deletePost({
      variables: {
        id: id
      }
    })
    .then(() => {})
    .catch(error => {
      console.log(error);
    });
  };

  render() {
    const {navigation,screenProps} = this.props;

     let swipeBtns = (id) => [{
      text: 'Delete',
      backgroundColor: 'red',
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: () => this.deletePost(id)
    }];

    return (
      <View>
      <List>
       <FlatList
        data={this.state.posts}
        renderItem={({item}) =>  (
        <Swipeout right={swipeBtns(item.id)}
        autoClose={true}
        id={item.id}
        backgroundColor= 'transparent'>
          <ListItem
           onPress = {() => 
            navigation.navigate("Post", {
            id: item.id,
            title: item.title 
          })
        }
       >
          <Body>
            <Text> {item.title} </Text>
          </Body>
          <Right>
            <Icon name="ios-arrow-forward"/>
          </Right>
          </ListItem>
           </Swipeout>
          )}
       keyExtractor={item => item.id}
      />
      </List>
      </View>
    );
  }
}

const deletePost = gql `
 mutation deletePost($id: ID!){
  deletePost(id: $id) {
    id
  }
 }
`;


const styles = StyleSheet.create({

});

export default compose(
  graphql(deletePost, {
  name: "deletePost",
  options: {
    refetchQueries: ["postsQuery"]
  }
})
)(withCrypto(Posts))