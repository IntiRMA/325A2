import React from 'react';
import { Button, View, Text,Image,StyleSheet,TouchableOpacity,ImageBackground,FlatList } from 'react-native';
import styles from '../styles/pageStyles';
import firebase from "../fbconfig/fbase";
import loadFromFbase from '../services/loadFromFbase';
export class ChatScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            chats: [],
            isLoading: true

        };
    }

    async componentDidMount(){
        let current=await firebase.auth().currentUser.uid;
        let path="/userChats/"+current;
        let ar=await loadFromFbase.loadChat(path);
        this.setState({chats:ar});
        this.setState({isLoading:false});
    }

    pushConvo(chat){
        this.props.navigation.navigate("Message",{id:chat.id});
    }

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

                    <ImageBackground source={require('../resources/contacts.png')} style={styles.buttonImage}>
                        <TouchableOpacity style={styles.buttonContainer}
                                          onPress={() => this.props.navigation.navigate('Contact')}>

                            <Text  style={styles.buttonStyle}>CONTACTS</Text>

                        </TouchableOpacity>
                    </ImageBackground>

                    <ImageBackground source={require('../resources/halp.png')} style={styles.buttonImage}>
                        <TouchableOpacity style={styles.buttonContainer}
                                          onPress={() => this.props.navigation.navigate('Info')}>

                            <Text  style={styles.buttonStyle}>INFO</Text>

                        </TouchableOpacity>
                    </ImageBackground>

                </View>
                <View style={styles.friendsView}>

                    <FlatList
                        data={this.state.chats}
                        extraData={this.state.isLoading}
                        keyExtractor={item=>item.id}
                        renderItem={({item}) => (
                            <TouchableOpacity style={styles.textContainer}
                                              onPress={this.pushConvo.bind(this,item)}>
                                <Text stye={styles.buttonStyle}>{item.title}</Text>
                            </TouchableOpacity>
                        )
                        }/>



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