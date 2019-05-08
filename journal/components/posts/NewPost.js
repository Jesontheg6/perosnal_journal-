import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text
} from 'react-native';
import navStyles from '../../styles/navStyles';
import Posts from './Posts'
import PostForm from './PostForm'
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';


class NewPost extends Component {
	static navigationOptions = ({navigation}) => {
		return{
    title: "New Post",
    ...navStyles
  	};
  };

	state = {
		loading: false
	}

	newPost = ({title, body}) => {
		const {newPost, navigation} = this.props;
		this.setState({loading: true});
		this.props
		.newPost({
			variables: {
				title,
				body
			}
		})
		.then(() => {
			navigation.goBack();
		})
		.catch(error => {
			console.log(error);
		});
	};
	
  render() {
    return (
    	<View>
    	{this.state.loading ? (
    			<ActivityIndicator size="large" />
    		) : (
    			<PostForm onSubmit={this.newPost}/>
    	)}
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

const newPost = gql `
 mutation newPost($title: String!, $body: String!){
 	createPost(title: $title, body: $body) {
 		id
 	}
 }
`;
export default graphql(newPost, {
	name: "newPost",
	options: {
    errorPolicy: 'ignore',
		refetchQueries: ["postsQuery"]
	}
})(NewPost);