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
import withCrypto from '../../cryptoMiddleware';

class NewPost extends Component {
	static navigationOptions = {
    title: "New Post",
    ...navStyles
  	};

	state = {
		loading: false
	}

	newPost = ({title, body}) => {
		const {newPost, navigation, screenProps, encryptData } = this.props;
		this.setState({loading: true});
		// let encryptedPost = encrypt(body, generateKey("12345", ""))
		newPost({
			variables: {
				title,
				body,
				userId: screenProps.user.id
			}
		})
		.then(() => {
			navigation.goBack();
			this.setState({loading: false});
		})
		.catch(error => {
			this.setState({loading: false});
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
 mutation newPost($title: String!, $body: String!, $userId: ID!){
 	createPost(title: $title, body: $body, userId: $userId) {
 		id
 	}
 }
`;

export default graphql(newPost, {
	name: "newPost",
	options: {
    errorPolicy: 'ignore',
		refetchQueries: ["userQuery"]
	}
})(withCrypto(NewPost));