import * as React from "react";
import { Header, Icon } from "react-native-elements";

export const MyHeader = (props) => {
  return (
    <Header
      leftComponent={
        <Icon
          name="bars"
          type="font-awesome"
          color="black"
          onPress={() => {
            props.navigation.toggleDrawer();
          }}
        />
      }
      centerComponent={{
        text: props.title,
        style: { color: "black", fontSize: 20, fontWeight: "bold" },
      }}
      rightComponent={
        <Icon
          name="bell"
          type="font-awesome"
          color="black"
          size = {25}
          onPress={() => {
            props.navigation.navigate("Notifications");
          }}
        />
      }
      backgroundColor="#6f4e37"
    />
  );
};
