import React from 'react';
import { Button, View, Text } from 'react-native';

export class HomeScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                <Button
                    title="Detais"
                    onPress={() => this.props.navigation.navigate('Login')}
                />
            </View>
        );
    }
}