import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import MyHeader from "../components/MyHeader";
import db from "../config";
import firebase from "firebase";
import { ListItem } from "react-native-elements";

export default class MyRecivedBookScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      recivedBookList: "",
      userId: firebase.auth().currentUser.email,
    };
    this.requestRef = null;
  }

  getRecivedBookList = () => {
    this.requestRef = db
      .collection("BookRequest")
      .where("UserId", "==", this.state.userId)
      .where("book_Status", "==", "received")
      .onSnapshot((snapshot) => {
        var recivedBookList = snapshot.docs.map((document) => document.data());
        this.setState({
          recivedBookList: recivedBookList,
        });
      });
  };

  componentDidMount = () => {
    this.getRecivedBookList();
  };
  render() {
    return (
      <View>
        <MyHeader title="My Recived Book" navigation={this.props.navigation} />

        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={this.state.recivedBookList}
          renderItem={({ item, i }) => {
            return (
              <ListItem
                key={i}
                title={item.BookName}
                subtitle={item.book_Status}
                titleStyle={{ color: "black", fontWeight: "bold" }}
                bottomDivider
              />
            );
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({

});



