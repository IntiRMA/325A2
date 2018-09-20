import React from 'react';
import { Button, View, Text,Image,StyleSheet } from 'react-native';

export class HomeScreen extends React.Component {
    render() {
        return (
                <Image source={require('../resources/back.jpeg')}
                       style={styles.backgroundImage}>

                </Image>
        );
    }
}
const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    },

    text: {
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0)',
        fontSize: 32
    }
});