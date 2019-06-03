import React, { Component } from 'react';
import {
  AsyncStorage,
  Button,
  Alert
} from 'react-native';
import {Form, Item, Input, Label} from "native-base";

export default class SetPassphrase extends Component {

	state = {
        passphrase: ""
  	}; 

    setPassphrase = () => {
        if (this.state.passphrase.length < 3) Alert.alert("Error", "Please, enter more then 3 characters for passphrase!");
        else {
            AsyncStorage.setItem("passphrase", this.state.passphrase).then(res => {
                this.props.updatePassphrase();
            })
        }
    }

  render() {
    return (
    	<Form>
    	<Item floatingLabel> 
          <Label> Passphrase </Label>
        <Input
    		onChangeText={passphrase => this.setState({passphrase})}
            value={this.state.passphrase}
         />
        </Item>
    	<Button title="Save Passphrase" onPress={this.setPassphrase} />
      </Form>
    );
  }
}