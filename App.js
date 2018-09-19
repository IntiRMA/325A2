import React from 'react';
import { createStackNavigator } from 'react-navigation';
import {HomeScreen } from './pages/home'
import { LoginScreen } from "./pages/login";
import {ChatScreen} from "./pages/chats";
import {RegisterScreen} from "./pages/register";
import {AddFriendScreen} from "./pages/addfriend";
import {ContactScreen} from "./pages/contacts";




const RootStack = createStackNavigator({
        Login: LoginScreen,
        Home: HomeScreen,
        Chats:ChatScreen,
        Register:RegisterScreen,
        Add:AddFriendScreen,
        Contact:ContactScreen
},
    {
      IntialName: 'Login',
    });

export default class App extends React.Component {


    render() {
        return <RootStack />;
    }
}