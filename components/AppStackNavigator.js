import * as React from "react";
import { createStackNavigator } from "react-navigation-stack";
import DonateBookScreen from "../screens/DonateBooks";
import ReceiverDetailsScreen from "../screens/ReceiverDetailsScreen";

export const AppStackNavigator = createStackNavigator(
  {
    Donate_Book: {
      screen: DonateBookScreen,
      navigationOptions: { headerShown: false },
    },

    ReceiverDetails: {
      screen: ReceiverDetailsScreen,
      navigationOptions: { headerShown: false },
    },
  },
  {
    initialRouteName: "Donate_Book",
  }
);