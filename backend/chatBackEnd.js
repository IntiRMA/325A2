import firebase from "../fbconfig/fbase";

class backEnd{
    ref=null;
    getId(){
        return firebase.auth().currentUser.uid;
    }
    getName(){
        return firebase.auth().currentUser.email;
    }
    getAvatar(){
        return firebase.auth().currentUser.photoURL;
    }

    load(id,callback){
        this.ref=firebase.database().ref("/chatMessages").child(id);
        this.ref.off();
        const onRecieve=(data)=>{
            const message=data.val();
            callback({_id:data.key,
            text:message.text,
            createdAt:new Date(message.createdAt),
                user:{
                _id:message.user._id,
                    name:message.user.name,
                    avatar:message.user.avatar
                }
            });
        };
        this.ref.limitToLast(50).on("child_added",onRecieve);
    }

    send(message){
        for(let x=0; x<message.length;x++){
            let m=message[x];
            this.ref.push({
                text:m.text,
                user:m.user,
                createdAt:firebase.database.ServerValue.TIMESTAMP
            });
        }
    }
    closeChat(){
        if(this.ref){
            this.ref.off();
        }
    }
}
export default new backEnd();
