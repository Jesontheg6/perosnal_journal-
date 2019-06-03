import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import Loading from './components/loading';
import SetPassphrase from './components/setPassphrase';
import { encrypt, decrypt } from './helpers/crypto';

export default (WrappedComponent) => (
    class extends Component {
        state = {
            loading: true,
        }

        updatePassphrase = async () => {
            this.setState({ loading: true })
            const passphrase = await AsyncStorage.getItem("passphrase");
            if (passphrase) this.setState({ passphrase });
            this.setState({ loading: false });
        }

        async componentDidMount() {
            console.log("Crypto middleware did mount");
            await this.updatePassphrase();
        }

        encryptData = (message) => {
            const { passphrase } = this.state;
            if (!message || !passphrase) return false;
            return encrypt(message, passphrase);
        }

        decryptData = (message) => {
            const { passphrase } = this.state;
            if (!message || !passphrase) return false;
            return decrypt(message, passphrase);
        }

        render() {
            if (this.state.loading) return <Loading />
            if (!this.state.passphrase) return <SetPassphrase updatePassphrase={this.updatePassphrase} />
            return <WrappedComponent {...this.props} encryptData={this.encryptData} decryptData={this.decryptData} />
        }
    }
)