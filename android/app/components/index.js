import { createStackNavigator } from 'react-navigation'
import Home from './HomeScreen';
import Payment from './PaymentScreen';

export default createStackNavigator({
    Home : {
        screen: Home,
        navigationOptions: ({navigation}) => ({
           tabBarLabel: 'Текущая парковка'
        })
    },
    Payment
},{
    headerMode: 'none',
});