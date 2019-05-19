import React from 'react';
import {View, AsyncStorage} from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import firebase, { Notification, RemoteMessage } from 'react-native-firebase';


export default class LoginScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            carnumber: '',
            token: '',
        }
    }


    static navigationOptions = {
        title: 'Авторизация',
    };

    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <Item stackedLabel last>
                            <Label>Номер автомобиля</Label>
                            <Input onChangeText={(text) => this.setState({carnumber: text})}/>
                        </Item>
                        <Button full onPress={this._signInAsync}><Text>Войти</Text></Button>
                    </Form>
                </Content>
            </Container>
        );
    }

    _signInAsync = async () => {
            try {
                const res = await firebase.messaging().requestPermission();
                const fcmToken = await firebase.messaging().getToken();
                if (fcmToken) {
                    await AsyncStorage.setItem('fcmtoken', fcmToken);
                    await AsyncStorage.setItem('carnumber', this.state.carnumber);
                    fetch('http://95.179.241.170:3000/login?number='+this.state.carnumber+'&push_token='+fcmToken, {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                    })
                        .then((response) => response.json())
                        .then((responseJson) => {
                            _storeData = async () => {
                                try {
                                    console.log('PISKAAAAA', responseJson);
                                    await AsyncStorage.setItem('userToken', responseJson.token);
                                } catch (error) {
                                    // Error saving data
                                }
                            };
                            _storeData();
                            this.state.token = responseJson.token;
                            return true;
                        })
                        .then(() => {
                        // console.log(this.state.token);
                        //console.log(JSON.stringify({"query":`{allUsersList(filter: {token: {equalTo: "${token}"}}) {id}}`}));
                            return fetch('http://95.179.241.170:3001/graphql', {
                                method: 'POST',
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({"query":`{allUsersList(filter: {token: {equalTo: "${this.state.token}"}}) {id}}`}),
                            })
                                .then((response) => response.json())
                                .then((responseJson) => {
                                    _storeData2 = async () => {
                                        try {
                                            await AsyncStorage.setItem('uid', responseJson.data.allUsersList[0].id.toString());
                                            console.log('HUISKKAAAAA', parseInt(responseJson.data.allUsersList[0].id));
                                        } catch (error) {
                                            // Error saving data
                                            console.log('*** ERR HUISKKAAAAA',error);
                                        }
                                    };
                                    _storeData2();
                                    return true;
                                })
                                .catch((e) => console.log('ERROR 2', e));
                        })
                        .then(() => async() => {
                            const enabled = await firebase.messaging().hasPermission();
                            if (enabled) {
                                console.log('FCM messaging has permission:' + enabled)
                            } else {
                                try {
                                    await firebase.messaging().requestPermission();
                                    console.log('FCM permission granted')
                                } catch (error) {
                                    console.log('FCM Permission Error', error);
                                }
                            }
                            return true;
                         }).then(() => {
                             this.props.navigation.navigate('App');
                         })
                        .catch((error) => {
                            console.error(error);
                        });

                }
            } catch (e) {
                throw e;
            }
    };
}
