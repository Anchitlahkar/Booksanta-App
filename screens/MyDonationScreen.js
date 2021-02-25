import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { MyHeader } from "../components/MyHeader";
import db from "../config";
import firebase from "firebase";
import { ListItem } from "react-native-elements";

export default class MyDonationScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      donorId: firebase.auth().currentUser.email,
      allDonations: [],
      donorName: "",
    };
    this.requestRef = null;
  }

  getDonorDetails = (donorId) => {
    db.collection("Users")
      .where("email", "==", donorId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            donorName: doc.data().name,
          });
        });
      });
  };

  getAllDonations = () => {
    this.requestRef = db
      .collection("allDonations")
      .where("DonorId", "==", this.state.donorId)
      .onSnapshot((snapshot) => {
        var allDonations = snapshot.docs.map((doc) => doc.data());
        this.setState({
          allDonations: allDonations,
        });
      });
  };

  sendBook = (BookDetails) => {
    var requestStatus = "Book Sent";

    db.collection("allDonations").doc(BookDetails.doc_id).update({
      requestStatus: requestStatus,
    });
    this.sendNotification(BookDetails, requestStatus);
  };

  sendNotification = (BookDetails, requestStatus) => {
    var requestId = BookDetails.RequestId;
    var donorId = BookDetails.DonorId;

    db.collection("Notifications")
      .where("RequestId", "==", requestId)
      .where("DonorId", "==", donorId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var message = "";
          if (requestStatus === "Book Sent") {
            message = this.state.donorName + " Sent The Book";
          } else {
            this.state.donorName + " has shown intrested in donating the book";
          }
          db.collection("Notifications").doc(doc.id).update({
            Message: message,
            NotificationStatues: "unread",
            Date: firebase.firestore.FieldValue.serverTimestamp(),
          });
        });
      });
  };

  componentDidMount() {
    this.getAllDonations();
    this.getDonorDetails(this.state.donorId);
  }
  render() {
    return (
      <View>
        <MyHeader title="My Donations" navigation={this.props.navigation}/>

        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={this.state.allDonations}
          renderItem={({ item, i }) => {
            return (
              <ListItem
                key={i}
                title={item.BookName}
                subtitle={
                  "Requested By: " +
                  item.requestedBy +
                  "\nStatus: " +
                  item.requestStatus
                }
                titleStyle={{ color: "black", fontWeight: "bold" }}
                rightElement={
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      this.sendBook(item);
                    }}
                  >
                    <Text style={{ color: "#ffff" }}>Send Book</Text>
                  </TouchableOpacity>
                }
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
  button: {
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
  },
});
