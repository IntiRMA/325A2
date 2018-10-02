import React from 'react';
import { Button, View, Text,Image,StyleSheet,TouchableOpacity,ImageBackground,FlatList,ActivityIndicator } from 'react-native';
import firebase from '../fbconfig/fbase';
import styles from '../styles/pageStyles';
import loadFromFbase from '../services/loadFromFbase';
import setInFbase from '../services/setInFbase';
export class ContactScreen extends React.Component {


    constructor() {
        super();
        this.state = {
            contacts: [],
            isLoading: true

        };
    }

    async componentDidMount(){
        this.state.contacts.push({
            id:firebase.auth().currentUser.uid,
            email:"ME"
        });
        let path='/users/'+firebase.auth().currentUser.uid+"/friends";
        let ar=await loadFromFbase.loadIdEmail(path);

        this.setState({contacts:ar});
        this.setState({isLoading:false});
    }

   async add(user){
        console.log(user);
        let current=await firebase.auth().currentUser;
        let convoid=current.uid+user.id;
        let alt=user.id+current.uid;
        setInFbase.setChat(current,user,convoid,alt,this.props);

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

                    <ImageBackground source={require('../resources/mail.png')} style={styles.buttonImage}>
                        <TouchableOpacity style={styles.buttonContainer}
                                          onPress={() => this.props.navigation.navigate('Chats')}>

                            <Text  style={styles.buttonStyle}>MESSAGES</Text>

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
                        data={this.state.contacts}
                        keyExtractor={item=>item.id}
                        extraData={this.state.isLoading}
                        renderItem={({item}) => (
                            <TouchableOpacity style={styles.textContainer}
                                              onPress={this.add.bind(this,item)}>
                                <Text stye={styles.buttonStyle}>{item.email}</Text>
                            </TouchableOpacity>
                        )
                        }/>



                </View>
                <View style={styles.viewStyle}>
                    <ImageBackground source={require('../resources/add.png')} style={styles.bottomView}>
                        <TouchableOpacity style={styles.bottomView}
                                          onPress={() => this.props.navigation.navigate('Add')}>

                        </TouchableOpacity>
                    </ImageBackground>
                </View>

            </ImageBackground>
        );
    }


}
