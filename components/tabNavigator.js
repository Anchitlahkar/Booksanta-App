import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import RequestBookScreen from '../screens/RequestBooks';
import DonatetBookScreen from '../screens/DonateBooks';
import LoginScreen from '../screens/WelcomeScreen'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AppStackNavigator } from './AppStackNavigator';

export const TabNavigator = createBottomTabNavigator(
  {
    Donate_Book: {
      screen: AppStackNavigator,
    },
    Request_Book: {
      screen: RequestBookScreen,
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: () => {
        const routeName = navigation.state.routeName;
        if (routeName === 'Donate_Book') {
          return (
            <Image
              style={{ height: 32, width: 40 }}
              source={require('../assets/donate.png')}
            />
          );
        } else if (routeName === 'Request_Book') {
          return (
            <Image
              style={{ height: 32, width: 32 }}
              source={require('../assets/BookSanta.jpg')}
            />
          );
        }
      },
    }),
  }
);

