import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Spinner } from 'native-base';


export default class LoadingScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Spinner color='blue' />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})