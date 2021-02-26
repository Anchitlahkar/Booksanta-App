import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  FlatList,
} from "react-native";
import { Card, Header, Icon } from "react-native-elements";
import db from "../config";
import firebase from "firebase";

export default class ReceiverDetailsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: firebase.auth().currentUser.email,
      receiverId: this.props.navigation.getParam("details")["UserId"],
      requestId: this.props.navigation.getParam("details")["RequestId"],
      bookName: this.props.navigation.getParam("details")["BookName"],
      reason: this.props.navigation.getParam("details")["Reason"],
      receiverName: "",
      receiverContact: "",
      receiverAddress: "",
      receiverRequestDocId: "",
      userName: "",
    };
  }

  getReceiverDetails = () => {
    db.collection("Users")
      .where("email", "==", this.state.receiverId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          var name = data.name;

          console.log(data.contact);

          this.setState({
            receiverName: name,
            receiverContact: data.contact,
            receiverAddress: data.address,
          });
        });
      });

    db.collection("BookRequest")
      .where("RequestId", "==", this.state.requestId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            receiverRequestDocId: doc.id,
          });
        });
      });
  };

  updateBookStatus = () => {
    db.collection("allDonations").add({
      BookName: this.state.bookName,
      RequestId: this.state.requestId,
      requestedBy: this.state.receiverName,
      DonorId: this.state.userId,
      requestStatus: "Donor intrested",
    });
  };

  getUserDetails = (userId) => {
    db.collection("Users")
      .where("email", "==", userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            userName: doc.data().name,
          });
        });
      });
  };

  addNotifications = () => {
    var message =
      this.state.userName + " " + "has shown intrested in donating the book";

    db.collection("Notifications").add({
      TargetedUserID: this.state.receiverId,
      DonorId: this.state.userId,
      RequestId: this.state.requestId,
      BookName: this.state.bookName,
      Date: firebase.firestore.FieldValue.serverTimestamp(),
      NotificationStatues: "unread",
      Message: message,
    });
  };

  componentDidMount = () => {
    this.getReceiverDetails();
    this.getUserDetails(this.state.userId);
  };

  render() {
    return (
      <View>
        <Header
          leftComponent={
            <Icon
              name="arrow-left"
              type="feather"
              color="black"
              onPress={() => {
                this.props.navigation.goBack();
              }}
            />
          }
          centerComponent={{
            text: "Receiver Details",
            style: { color: "white", fontSize: 25, fontWeight: "bold" },
          }}
        />
        <View>
          <Card title={"Book Information"} titleStyle={{ fontSize: 20 }}>
            <Card>
              <Text style={{ fontWeight: "bold" }}>
                Name: {this.state.bookName}
              </Text>
            </Card>
            <Card>
              <Text style={{ fontWeight: "bold" }}>
                Reason: {this.state.reason}
              </Text>
            </Card>
          </Card>
        </View>
        <View>
          <Card title={"Receiver Information"} titleStyle={{ fontSize: 20 }}>
            <Card>
              <Text style={{ fontWeight: "bold" }}>
                Name: {this.state.receiverName}
              </Text>
            </Card>
            <Card>
              <Text style={{ fontWeight: "bold" }}>
                Contact: {this.state.receiverContact}
              </Text>
            </Card>
            <Card>
              <Text style={{ fontWeight: "bold" }}>
                Address: {this.state.receiverAddress}
              </Text>
            </Card>
          </Card>
        </View>
        <View style={styles.buttonContainer}>
          {this.state.receiverId !== this.state.userId ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.updateBookStatus();
                this.addNotifications();
                this.props.navigation.navigate("MyDonations");
              }}
            >
              <Text>I Want To Donate </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "orange",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 16,
  },
});
