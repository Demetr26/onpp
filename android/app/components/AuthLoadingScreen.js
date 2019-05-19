import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
    Text,
} from 'react-native';
import firebase, { Notification, RemoteMessage } from 'react-native-firebase';

export default class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            FCMToken : null,
        };
       // this._getFCM();
        this._bootstrapAsync();
    }

    _getFCM = async () => {

    };
    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away
        //this.props.navigation.setParams({ FCMToken: 'Привет' });
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    };

    // Render any loading content that you like here
    render() {
        return (
            <View>
                <Text>{this.state.FCMToken || 'Привет'}</Text>
            </View>
        );
    }
}