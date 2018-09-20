
import React from 'react'
import { StyleSheet, Text, TextInput, View, Button,TouchableOpacity } from 'react-native'
import firebase from "../fbconfig/fbase";

export class LoginScreen extends React.Component {
    state = { email: '', password: '', errorMessage: null }
    handleSignUp=()=> {
        this.props.navigation.navigate('Loading');
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
                .then((user) => {
                    this.props.navigation.navigate('Home')
                })
                .catch((error) => {

                    Alert.alert(
                        'boi',
                        error.message,
                        [
                            {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                        { cancelable: false }
                    )
                });
   }

    render() {
        return (
            <View style={styles.container}>
                <Text>Sign Up</Text>
                {this.state.errorMessage &&
                <Text style={{ color: 'red' }}>
                    {this.state.errorMessage}
                </Text>}
                <TextInput style={styles.input}
                    placeholder="Email"
                    autoCapitalize="none"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput style={styles.input}
                    secureTextEntry
                    placeholder="Password"
                    autoCapitalize="none"
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />
                <TouchableOpacity style={styles.loginContainer}
                                  onPress={this.handleSignUp}>
                    <Text  style={styles.login}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.registerContainer}
                                  onPress={() => this.props.navigation.navigate('Register')}>
                    <Text  style={styles.register}>REGISTER</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    input:{
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#000'
    },
    loginContainer:{
        backgroundColor: '#383838',
        paddingVertical: 15,
        marginBottom:10
    },
    registerContainer:{
        backgroundColor: '#FF2400',
        paddingVertical: 15,
        marginBottom:10
    },
    login:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    },
    register:{
        color: '#000',
        textAlign: 'center',
        fontWeight: '700',
    }});