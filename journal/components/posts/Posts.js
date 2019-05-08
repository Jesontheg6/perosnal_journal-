import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  View
} from 'react-native';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {List, ListItem, Body, Right, Icon} from "native-base";


class Posts extends Component {
  render() {
    const {loading, allPosts, navigation} = this.props;
    if (loading) return <ActivityIndicator size="large"/>;;
    console.log(allPosts)
    return (
      <View>
      <List>
       <FlatList
        data={allPosts}
        renderItem={({item}) =>  (
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
            <Icon name="arrow-forward"/>
          </Right>
          </ListItem>
          )}
       keyExtractor={item => item.id}
      />
      </List>
      </View>
    );
  }
}

const postsQuery = gql`
  query postsQuery {
    allPosts {
     id
     title 
   }
  }
`;

const styles = StyleSheet.create({

});

export default graphql(postsQuery, {
  props: ({data}) => ({...data})
})(Posts);