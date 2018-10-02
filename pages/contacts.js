import React from 'react';
import { Button, View, Text,Image,StyleSheet,TouchableOpacity,ImageBackground,FlatList,ActivityIndicator } from 'react-native';
import firebase from '../fbconfig/fbase'
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
        await firebase.database().ref('/users/'+firebase.auth().currentUser.uid+"/friends").once('value').then(snapshot=>{
            snapshot.forEach(child=>{

                    this.state.contacts.push({
                        id: child.key,
                        email:child.val().email
                    })

            })
        });
        this.setState({isLoading:false});
    }

   async add(user){
        console.log(user);
        let current=await firebase.auth().currentUser;
        let convoid=current.uid+user.id;
        let alt=user.id+current.uid;
        console.log("ALT "+alt);
        console.log("ID "+convoid);
        await firebase.database().ref('/chats').once('value').then(snapshot=> {

            if (snapshot.hasChild(convoid)) {
                this.props.navigation.navigate("Message",{id:convoid});
                return;
            }else if(snapshot.hasChild(alt)){
                this.props.navigation.navigate("Message",{id:alt});
                return;
            }
                firebase.database().ref("/chats").child(convoid).set({
                    id: convoid,
                    title: user.email + "-" + current.email
                }).catch();
                firebase.database().ref("/userChats").child(user.id).child(convoid).set({title: current.email}).catch();
                firebase.database().ref("/userChats").child(current.uid).child(convoid).set({title: user.email}).catch();

        }
        );
        this.props.navigation.navigate("Message",{id:convoid});
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