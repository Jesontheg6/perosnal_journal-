import React, { Component } from 'react';
import {View,Text} from 'react-native';
import navStyles from './styles/navStyles';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import Posts from './Posts';

class Post extends Component {
	static navigationOptions = {
    title: 'Post',
    ...navStyles
  };

	render() {
		console.log(this.props);
		const {Post, loading} = this.props
		if (loading) return null;
		return (
			<View>
				<Text> {this.props.Post.id} </Text>
				<Text> {this.props.Post.title} </Text>
			</View>
		);
	}
}


const postQuery = gql`
 query Post($id: ID!) {
   Post(id: $id) {
   	id
   	title 
   }
 }
`;

export default graphql(postQuery, {
	props: ({data}) => ({...data}),
	options: ({navigation}) => ({
    variables: {
    	id: navigation.state.params.id
    }
	})
})(Post);