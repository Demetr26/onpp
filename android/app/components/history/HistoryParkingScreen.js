import React from 'react';
import { Container, Header, Content, List, ListItem, Text, Left, Right, Icon, Body, Title, Button } from 'native-base';
import HistoryCardScreen from "./HistoryCardScreen";
import {AsyncStorage} from "react-native";
import Moment from 'moment';

export default class HistoryParkingScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            parkings: [],
        }
    }

    static navigationOptions = {
        title: 'История парковок',
    };

    componentDidMount(){
        this._loadParkingData();
    }

    _loadParkingData = async() => {
        let uid = await AsyncStorage.getItem('uid');

        return fetch('http://95.179.241.170:3001/graphql', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"query":"{\n  allPayCalcsList(filter: {userId: {equalTo: "+uid+"}}) {\n    timeArr\n    timeDep\n    payTime\n    cost\n    pay\n  }\n}\n","variables":null}),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("Current Parking: ",responseJson);
                this.setState({parkings : responseJson.data.allPayCalcsList || []})
                return true
            })
            .catch((e) => console.log('*** ERR LoadParkingData',e));
    };

    _renderParkItems(){
        console.log(this.state.parkings);
        return this.state.parkings.map((item) => {
            return (
                <ListItem onPress={() => {this.props.navigation.navigate('HistoryCardScreen',{
                    parkId: 123,
                })}}>
                    <Left>
                        <Text >ТРЦ Аура, {Moment(item.timeArr).format('HH:mm (DD.MM.YYYY)')}</Text>
                    </Left>
                    <Right>
                        <Icon name="arrow-forward" />
                    </Right>
                </ListItem>
            )
        });
    }

    render() {
        return (
            <Container>
                <Header>
                    <Body>
                    <Title>История парковок</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={this._signOutAsync}>
                            <Text>Выход</Text>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <List>
                        {this._renderParkItems()}
                    </List>
                </Content>
            </Container>
        );
    }

    _showMoreApp = () => {
        this.props.navigation.navigate('Other');
    };

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };

    _showHistoryCard = (parkId) => {
        // this.props.navigation.navigate('HistoryCard', {
        //     parkId: parkId
        // })
    }
}