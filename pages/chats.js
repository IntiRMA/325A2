import React from 'react';
import { Button, View, Text,Image,StyleSheet,TouchableOpacity,ImageBackground,FlatList } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from "../fbconfig/fbase";

export class ChatScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            chats: [],
            isLoading: true

        };
    }

    async componentDidMount(){
        let current=firebase.auth().currentUser.uid;
        await firebase.database().ref("/userChats").child(current).once('value').then(snapshot=>{
            snapshot.forEach(child=>{
                    this.state.chats.push({
                        id: child.key,
                        title:'chat with: '+child.val().title
                    })

            })
        });
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
        width:110,
        height:110,
        alignItems:'center',
    },
    textContainer:{
        backgroundColor: 'rgba(0,255,0,0.7)',
        paddingVertical:5,
        marginBottom:2,
        width:150,
        height:30,
        alignItems:'center',
    },

    buttonStyle:{
        color: '#0f0',
        textAlign: 'center',
        fontWeight: '700'
    },
    friendsView: {
        alignItems:'center',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
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

    }});