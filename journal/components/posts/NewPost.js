import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import PostForm from './PostForm'

class NewPost extends Component {

	newPost = ({title, body}) => {
		console.log(title,body)
	};
	
  render() {
    return (
    	<View>
    		<PostForm onSubmit={this.newPost}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});


export default NewPost;