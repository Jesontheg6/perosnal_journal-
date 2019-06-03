import React, { Component } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Button
} from 'react-native';
import NewPost from './NewPost'
import navStyles from '../../styles/navStyles';
import {Form, Item, Input, Label} from "native-base";
import dismissKeyboard from 'react-native-dismiss-keyboard';
import withCrypto from '../../cryptoMiddleware';
class PostForm extends Component {
  static defaultProps = {
    post: {}
  };


	state = {
		title: this.props.decryptData(this.props.post.title) || "",
		body: this.props.decryptData(this.props.post.body) || ""
  	}; 

	submitForm = () => {
		this.props.onSubmit({
			title: this.props.encryptData(this.state.title),
			body: this.props.encryptData(this.state.body)
		});
	};

  handleKeyDown = (e) => {
    if(e.nativeEvent.key == "Enter"){
        dismissKeyboard();
    }
}

  render() {
    return (
    	<Form>
    		<Item floatingLabel> 
          <Label> Title </Label>
        <Input
    		onChangeText={title => this.setState({title})}
        value={this.state.title}
         />
        </Item>
        <Item floatingLabel> 
          <Label> Body </Label>
        <Input
        multiline
        style={styles.body}
        onChangeText={body => this.setState({body})}
        value={this.state.body} 
        onKeyPress={this.handleKeyDown}
        />
        </Item>
    		<Button title="Save Post" onPress={this.submitForm} />
      </Form>
    );
  }
}

const styles = StyleSheet.create({
  body: {
  	height: 400,
  	textAlignVertical: "top"
  }
});


export default withCrypto(PostForm);