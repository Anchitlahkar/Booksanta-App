import CustomSideBarMenu from "./CustomSideBarMenu";
import { TabNavigator } from "./tabNavigator";
import { createDrawerNavigator } from "react-navigation-drawer";
import SettingScreen from "../screens/SettingScreen";
import MyDonationScreen from "../screens/MyDonationScreen";
import NotificationScreen from "../screens/NotificationScreen";
import MyRecivedBookScreen from "../screens/MyRecivedBookScreen";

export const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: TabNavigator,
    },
    Settings: {
      screen: SettingScreen,
    },
    MyDonations: {
      screen: MyDonationScreen,
    },
    Notifications: {
      screen: NotificationScreen,
    },
    MyRecivedBooks: {
      screen: MyRecivedBookScreen,
    },
  },
  {
    contentComponent: CustomSideBarMenu,
  },
  {
    initialRouteName: "Home",
  }
);
