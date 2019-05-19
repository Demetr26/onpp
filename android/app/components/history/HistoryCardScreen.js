import React from 'react';
import {View, AsyncStorage} from 'react-native'
import { Container, Header, Content, Card, CardItem, Text, Body, Title, ListItem, Button, Left, Icon, Right, Switch  } from "native-base";

export default class HistoryCardScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            carnumber: ''
        }
    }

    componentDidMount(){
        this._loadCarNumber()
    }

    _loadCarNumber = async() => {
        let carnumber = await AsyncStorage.getItem('carnumber');
        this.setState({ carnumber: carnumber});

    };

    static navigationOptions = {
        title: 'Историческая парковка',
    };

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => {console.log('click'); this.props.navigation.goBack()}}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
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
                    <Card>
                        <CardItem header bordered>
                            <Text>ТРЦ Аура, ул. Военная, 1235</Text>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                            <ListItem icon>
                                <Left>
                                    <Button style={{ backgroundColor: "#0098ff" }}>
                                        <Icon active name="car" />
                                    </Button>
                                </Left>
                                <Text>Автомобиль: </Text>
                                <Right>
                                    <Text>{this.state.carnumber}</Text>
                                </Right>
                            </ListItem>
                            <ListItem icon>
                                <Left>
                                    <Button style={{ backgroundColor: "#FF9501" }}>
                                        <Icon active name="clock" />
                                    </Button>
                                </Left>
                                <Text>Время заезда: </Text>
                                  <Right>
                                    <Text>12:45</Text>
                                </Right>
                            </ListItem>
                            <ListItem icon>
                                <Left>
                                    <Button style={{ backgroundColor: "#23ff31" }}>
                                        <Icon active name="time" />
                                    </Button>
                                </Left>
                                <Text>Бесплатный период: </Text>
                                <Right>
                                    <Text>1 час</Text>
                                </Right>
                            </ListItem>
                            <ListItem icon>
                                <Left>
                                    <Button style={{ backgroundColor: "#23ff31" }}>
                                        <Icon active name="calculator" />
                                    </Button>
                                </Left>
                                <Text>Стоимость: </Text>
                                <Right>
                                    <Text>200 рублей/рас</Text>
                                </Right>
                            </ListItem>
                            <ListItem icon>
                                <Left>
                                    <Button style={{ backgroundColor: "#23ff31" }}>
                                        <Icon active name="cart" />
                                    </Button>
                                </Left>
                                <Text>К оплате: </Text>
                                <Right>
                                    <Text>400 рублей</Text>
                                </Right>
                            </ListItem>
                            </Body>
                        </CardItem>
                        <CardItem footer bordered>
                            <Text>Перейти к оплате</Text>
                        </CardItem>
                    </Card>
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