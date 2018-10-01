import React from 'react';
import { Button, View, Text,Image,StyleSheet,TouchableOpacity,ImageBackground } from 'react-native';
import { Footer } from "native-base";

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
const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    },
    buttonImage: {
        opacity:0.7,
        flex:1,
        width: 110,
        height: 110,
        resizeMode:'cover',
        alignItems:'baseline',
    },
    viewStyle: {
        alignItems:'baseline',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    buttonContainer:{
        backgroundColor: 'rgba(150,0,150,0.0)',
        paddingVertical: 15,
        marginBottom:10,
        bottom:0,
        width:110,
        height:110,
        alignItems:'center',
    },
    buttonStyle:{
        color: '#0f0',
        textAlign: 'center',
        fontWeight: '700'
    },
    bottomView:{
        opacity:0.7,
        flex:1,
        width: 50,
        height: 50,
        resizeMode:'cover',
        alignItems:'baseline',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0

    }
});