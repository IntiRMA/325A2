import React from 'react';
import { Button, View, Text,Image,StyleSheet,TouchableOpacity,ImageBackground,FlatList } from 'react-native';
import firebase from '../fbconfig/fbase'
import styles from '../styles/pageStyles';
import loadFromFbase from '../services/loadFromFbase';
import setInFbase from '../services/setInFbase';
export class AddFriendScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            contacts: [],
            isLoading: true

        };
    }

   async componentDidMount(){
       let current=firebase.auth().currentUser.uid;
        let path='/users/'+firebase.auth().currentUser.uid+"/friends";
        let friends=await loadFromFbase.loadKey(path);
        let ar=await loadFromFbase.loadIdEmail('/users');

        for(let i=0;i<ar.length;i++){
            if(current!=ar[i].id && !friends.includes(ar[i].id)) {
                this.state.contacts.push({
                    id: ar[i].id,
                    email: ar[i].email
                })
            }
        }
        this.setState({isLoading:false});
    }

    async add(user){
        let current=firebase.auth().currentUser;
        let friendPath='users/' + user.id +'/friends/'+ firebase.auth().currentUser.uid;
        let currentPath='users/' + firebase.auth().currentUser.uid+'/friends/'+user.id;
        await setInFbase.setFriend(currentPath,current,friendPath,user);
        let copy=[];
        for(let i=0;i<this.state.contacts.length;i++){
            var element=this.state.contacts[i];
            if(element.id!=user.id){
                copy.push(element);
            }
        }
        this.setState({contacts:copy});
        this.setState({isLoading:true});
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
                        extraData={this.state.isLoading}
                        keyExtractor={item=>item.id}
                        renderItem={({item}) => (
                            <TouchableOpacity style={styles.textContainer}
                            onPress={this.add.bind(this,item)}>
                            <Text stye={styles.buttonStyle}>{item.email}</Text>
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
