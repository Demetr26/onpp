import React from 'react';
import {View, AsyncStorage} from 'react-native'
import { Container, Header, Content, Card, CardItem, Text, Body, Title, ListItem, Button, Left, Icon, Right, Switch  } from "native-base";
import firebase from "react-native-firebase";
import Moment from 'moment';
import { NavigationEvents } from 'react-navigation';

export default class HomeScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            carnumber: '',
            uid: '',
            currentParking: null
        }
    }

    static navigationOptions = ({ navigation }) => ({
        tabBarLabel: "Текущая парковка",
    });

    componentDidMount(){
        this.props.navigation.addListener('didFocus', payload => {
            console.log('Payload: ',payload);
            this._loadCarNumber();
        })
    }

    _loadCarNumber = async() => {
        let carnumber = await AsyncStorage.getItem('carnumber');
        let uid = await AsyncStorage.getItem('uid');
        let userToken = await AsyncStorage.getItem('userToken');
        console.log('UserID', uid);
        this.setState({ carnumber: carnumber, userToken: userToken, userId: uid});
        return fetch('http://95.179.241.170:3001/graphql', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"query":"{\n  allPayCalcsList(filter: {userId: {equalTo: "+this.state.userId+"}, or: {success: {isNull: true}}}, orderBy: ID_DESC) {\n    id\n    cost\n    exitCheck\n    fare\n    freeTime\n    images\n    parkingTime\n    success\n    sum\n    pay\n    timeArr\n    timeDep\n    userId\n  }\n}\n","variables":null}),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({currentParking : responseJson.data.allPayCalcsList || []})
                return true
            })
            .catch((e) => console.log('*** ERR allPayCalcsList',e));
        //return true;
    };

    _renderCards() {
        if(this.state.currentParking === null)
            return (
                <Text>Loading</Text>
            );
       if(this.state.currentParking.length === 0 ||
           (this.state.currentParking !== null && this.state.currentParking[0].timeDep !== null && this.state.currentParking[0].exitCheck === true)){
           return (
               <Card>
                   <CardItem header bordered>
                       <Text>Автомобиля нет на парковке</Text>
                       <Right>
                           <Icon name="refresh" onPress={() => {this._loadCarNumber()}} />
                       </Right>
                   </CardItem>
                   <CardItem bordered>
                       <Body>
                       <Text>
                           Припаркуйте автомобиль на парковке, которая поддерживает нашу систему, и в приложении
                           появится вся необходимая информация
                       </Text>
                       </Body>
                   </CardItem>
               </Card>
           )
        }else{
           let cp = this.state.currentParking[0];
           return (
               <Card>
                   <CardItem header bordered>
                       <Text>ТРЦ Аура, ул. Военная, 5</Text>
                       <Right>
                           <Icon name="refresh" onPress={() => {this._loadCarNumber()}} />
                       </Right>
                   </CardItem>
                   <CardItem bordered>
                       <Body>
                       <CardItem>
                           <Icon active name="car" style={{fontSize: 20, color: '#0098ff'}}/>
                           <Text>Автомобиль: {this.state.carnumber}</Text>
                       </CardItem>
                       <CardItem>
                           <Icon active name="clock" style={{fontSize: 20, color: '#FF9501'}}/>
                           <Text>Время заезда: {Moment(cp.timeArr).format('HH:mm (DD.MM.YYYY)')}</Text>
                       </CardItem>
                       <CardItem>
                           <Icon active name="time" style={{fontSize: 20, color: '#23ff31'}}/>
                           <Text>Бесплатный период: {cp.freeTime} мин.</Text>
                       </CardItem>
                       <CardItem>
                           <Icon active name="calculator" style={{fontSize: 20, color: '#23ff31'}}/>
                           <Text>Стоимость: {cp.cost} рублей/мин</Text>
                       </CardItem>
                       <CardItem>
                           <Icon active name="cart" style={{fontSize: 20, color: '#23ff31'}}/>
                           <Text>К оплате: {cp.pay} рублей</Text>
                       </CardItem>
                       </Body>
                   </CardItem>
                   <CardItem footer bordered>
                       <Text  onPress={() => {this.props.navigation.navigate('Payment',{
                           parkId: cp.id,
                       })}}>Перейти к оплате</Text>
                   </CardItem>
               </Card>
           )
       }
    }

    render() {
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
                <Content>
                    {this._renderCards()}
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
}