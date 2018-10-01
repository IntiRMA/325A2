import React from 'react';
import firebase from "../fbconfig/fbase";
import { GiftedChat } from 'react-native-gifted-chat'
export class MessegeScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            messages: [],
            isLoading: true,
            ID:null

        };
    }
    async componentDidMount(){
        if(this.props.navigation.state.params.ID!==undefined){
            this.setState({ID:this.props.navigation.state.params.ID});
        }
        console.log("BOIIIIIIIII"+this.state.ID);
        await firebase.database().ref('/users/'+firebase.auth().currentUser.uid+"/chats/"+this.state.ID+"/messages").once('value').then(snapshot=>{
            snapshot.forEach(child=>{

                this.state.messages.push({

                    _id: this.state.id,
                        text:child.text,
                    createdAt:child.date,
                    user: {
                    _id: firebase.auth().currentUser.uid,
                        name: 'React Native',
                        avatar: 'https://facebook.github.io/react/img/logo_og.png',
                },
                    image: 'https://facebook.github.io/react/img/logo_og.png',
                    // Any additional custom parameters are passed through

                })

            })
        });
        this.setState({isLoading:false});
    }
    send(message){
        if(this.props.navigation.state.params.ID!==undefined){
            this.setState({ID:this.props.navigation.state.params.ID});
        }
        console.log("BOIIIIIIIII"+this.state.ID);
        console.log(message);
        this.state.messages.push(message);
        firebase.database().ref('/users/'+firebase.auth().currentUser.uid+"/chats/"+this.state.ID+"/messages").set({
            id:message._id,
            text:message.text,
            createdAt:new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
            user: {
                _id: firebase.auth().currentUser.uid,
                name: 'React Native',
                avatar: 'https://facebook.github.io/react/img/logo_og.png',
            },
            image: 'https://facebook.github.io/react/img/logo_og.png',
            // Any additional custom parameters are passed through
    });
        this.componentDidMount();

}


    render() {
        console.log("BOIIIIIIIII"+this.state.Id);
        // 4.
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={message=>this.send(message)}
            />
        );
    }
}