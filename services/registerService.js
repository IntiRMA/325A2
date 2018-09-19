import firebase from "../fbconfig/fbase"
export const register=(email,password)=>firebase.auth().createUserWithEmailAndPassword(email,password);