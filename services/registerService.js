import firebase from "../fbconfig/fbase";
import {Alert} from 'react-native';
import loginService from './loginService';
class registerService{
    register(email,password,props){
        firebase.auth().createUserWithEmailAndPassword(email,password)
            .then((user) => {

                loginService.login(email,password,props);

                firebase.database().ref('users/'+firebase.auth().currentUser.uid).set({
                    email:email,
                    uid: firebase.auth().currentUser.uid,
                }).catch((error) => {
                    Alert.alert(
                        'Registering Error',
                        error.message,
                        [
                            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                        { cancelable: false }
                    )
                });

            })
            .catch((error) => {

                Alert.alert(
                    'Registering Error',
                    error.message,
                    [
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                )
                props.navigation.navigate('Register');
            });
    }
}
export default new registerService();