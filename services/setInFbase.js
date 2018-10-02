import firebase from '../fbconfig/fbase';

class setInFbase{
    async setFriend(currentuserPath,currentuser,friendPath,friend){
        await firebase.database().ref(currentuserPath).set({id:friend.id
            ,email:friend.email});
        await firebase.database().ref(friendPath).set({id:currentuser.uid
            ,email:currentuser.email});
    }

    async setChat(current,friend,convoid,alt,props){
        await firebase.database().ref('/chats').once('value').then(snapshot=> {

                if (snapshot.hasChild(convoid)) {
                    props.navigation.navigate("Message",{id:convoid});
                    return;
                }else if(snapshot.hasChild(alt)){
                    props.navigation.navigate("Message",{id:alt});
                    return;
                }
                firebase.database().ref("/chats").child(convoid).set({
                    id: convoid,
                    title: friend.email + "-" + current.email
                }).catch();
                firebase.database().ref("/userChats").child(friend.id).child(convoid).set({title: current.email}).catch();
                firebase.database().ref("/userChats").child(current.uid).child(convoid).set({title: friend.email}).catch();

            }
        );
        props.navigation.navigate("Message",{id:convoid});

    }
}
export default new setInFbase();