import * as React from 'react';
import {createStackNavigator} from 'react-navigation-stack'
import DonateBookScreen from '../screens/DonateBooks'
import ReceiverDetailsScreen from '../screens/ReceiverDetailsScreen'

export const AppStackNavigator = createStackNavigator({
    DonateBooks: {
        screen: DonateBookScreen,
        navigationOptions: {headerShown: false}
    },

    ReceiverDetails: {
        screen: ReceiverDetailsScreen
    }
},
{
    initialRouteName: 'DonateBooks'
}
);