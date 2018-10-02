import React from 'react';
import { Button, View, Text,Image,StyleSheet,TouchableOpacity,ImageBackground } from 'react-native';
import styles from '../styles/pageStyles';
export class InfoScreen extends React.Component {
    render() {
        return (


            <ImageBackground source={require('../resources/back.jpeg')}
                             style={styles.backgroundImage}>
                <View style={styles.viewStyle}>
                    <ImageBackground source={require('../resources/home.png')} style={styles.buttonImage}>
                        <TouchableOpacity style={styles.buttonContainer}
                                          onPress={() => this.props.navigation.navigate('Home')}>

                            <Text  style={styles.buttonStyle}>HOME</Text>

                        </TouchableOpacity>
                    </ImageBackground>
                    

                </View>
                <View style={styles.friendsView}>
                    <Text style={styles.buttonStyle}>MY SWEN APP</Text>
                </View>


                <View style={styles.viewStyle}>
                    <ImageBackground source={require('../resources/logout.png')} style={styles.bottomView}>
                        <TouchableOpacity style={styles.bottomView}
                                          onPress={() => this.props.navigation.navigate('Login')}>

                        </TouchableOpacity>
                    </ImageBackground>
                </View>

            </ImageBackground>
        );
    }
}