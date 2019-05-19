import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import LoginScreen from './android/app/components/LoginScreen';
import AuthLoadingScreen from './android/app/components/AuthLoadingScreen';
import HomeScreen from './android/app/components/';
import HistoryScreen from './android/app/components/history';



import { createSwitchNavigator, createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';

const AppStack = createBottomTabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarIcon: ({ focused, tintColor }) => {
                return <Icon name='ios-car' size={30} />
            }
        }
    },
    History: {
        screen: HistoryScreen,
        navigationOptions: {
            tabBarIcon: ({ focused, tintColor }) => {
                return <Icon name='ios-list' size={30} />
            }
        }
    }
});
const AuthStack = createStackNavigator({ SignIn: LoginScreen });

export default createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
));

// import React from 'react';
// import { Text, View } from 'react-native';
// import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
//
// class HomeScreen extends React.Component {
//     render() {
//         return (
//             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//                 <Text>Home!</Text>
//             </View>
//         );
//     }
// }
//
// class SettingsScreen extends React.Component {
//     render() {
//         return (
//             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//                 <Text>Settings!</Text>
//             </View>
//         );
//     }
// }
//
// const TabNavigator = createBottomTabNavigator({
//     Home: HomeScreen,
//     Settings: SettingsScreen,
// });
//
// export default createAppContainer(TabNavigator);