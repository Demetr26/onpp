import React from 'react';
import {View, AsyncStorage, Image, Dimensions} from 'react-native'
import { Container, Header, Content, Card, CardItem, Text, Body, Title, ListItem, Button, Left, Icon, Right, Switch, List  } from "native-base";
import firebase from "react-native-firebase";
import Moment from 'moment';

export default class PaymentScreen extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            carnumber: '',
            uid: '',
            currentParking: null,
            parkId: this.props.navigation.getParam('parkId')
        }
    }

    componentDidMount(){
        this._loadParkingData();
    }

    _loadParkingData = async() => {

    };

    _processPayment = async() => {
        return fetch('http://95.179.241.170:3001/graphql', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"query":"mutation {\n  createBalance(input: { balance: { checkIn: "+this.state.parkId+", sum: 10, success: true } }) {\n    clientMutationId\n  }\n}\n","variables":null}),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('Create Balance', responseJson);
                this.props.navigation.goBack();
                return true
            })
            .catch((e) => console.log('*** ERR CreateBalance',e));
    };

    static navigationOptions = {
        title: 'Оплата парковки',
    };

    render() {
        const dimensions = Dimensions.get('window');
        return (
            <Container>
                <Header>
                    <Body>
                    <Title>Текущая парковка</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={this._signOutAsync}>
                            <Text>Выход</Text>
                        </Button>
                    </Right>
                </Header>
                <Content padder>
                    <List>
                        <ListItem >
                            <Text>Оплата парковки</Text>
                        </ListItem>
                        <ListItem>
                            <Text>До окончания сессии осталось: 09:40</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Номер заказа: 123</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Сумма платежа: 100 руб.</Text>
                        </ListItem>
                    </List>
                    <Image
                        source={require('../img/payform.jpg')}
                        resizeMode={'contain'}
                        style={{width: '100%'}}
                    />
                    <Button onPress={() => {this._processPayment();}}>
                        <Text>Оплатить</Text>
                    </Button>
                </Content>
            </Container>
        );
    }


}