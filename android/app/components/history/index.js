import { createStackNavigator } from 'react-navigation'
import HistoryParkingScreen from './HistoryParkingScreen';
import HistoryCardScreen from './HistoryCardScreen';

export default createStackNavigator({
    HistoryParkingScreen,
    HistoryCardScreen
},{
    headerMode: 'none',
});