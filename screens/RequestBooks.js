import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from "react-native";

import MyHeader from "../components/MyHeader";
import db from "../config";
import firebase from "firebase";

export default class RequestBookScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      bookName: "",
      reasonRequest: "",
      userId: firebase.auth().currentUser.email,
      isBookRequestActive: "",
      requestedBookName: "",
      requestedBookStatus: "",
      requestId: "",
      docId: "",
    };
  }

  getBookRequest = () => {
    db.collection("BookRequest")
      .where("UserId", "==", this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.data().book_Status !== "received") {
            this.setState({
              requestedBookName: doc.data().BookName,
              requestedBookStatus: doc.data().book_Status,
              docId: doc.id,
              requestId: doc.data().RequestId,
            });
          }
        });
      });
  };

  sendNotification = () => {
    db.collection("Users")
      .where("email", "==", this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var name = doc.data().name;

          db.collection("Notifications")
            .where("RequestId", "==", this.state.requestId)
            .get()
            .then((snapshot) => {
              snapshot.forEach((doc) => {
                var donorId = doc.data().DonorId;
                var bookName = doc.data().BookName;

                db.collection("Notifications").add({
                  TargetedUserID: donorId,
                  BookName: bookName,
                  Message: name + " has recived the book: " + bookName,
                  NotificationStatues: "unread",
                });
              });
            });
        });
      });
  };

  getIsBookRequestActive = () => {
    db.collection("Users")
      .where("email", "==", this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            isBookRequestActive: doc.data().isBookRequestActive,
          });
        });
      });
  };

  updateBookRequestStatus = () => {
    db.collection("BookRequest").doc(this.state.docId).update({
      book_Status: "received",
    });

    db.collection("Users")
      .where("email", "==", this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          db.collection("Users").doc(doc.id).update({
            isBookRequestActive: false,
          });
        });
      });
  };

  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }

  addRequest = (bookName, reason) => {
    var userId = this.state.userId;
    var randomRequestId = this.createUniqueId();

    if (bookName !== "") {
      if (reason !== "") {
        db.collection("BookRequest").add({
          UserId: userId,
          RequestId: randomRequestId,
          BookName: bookName,
          Reason: reason,
          book_Status: "requested",
          date: firebase.firestore.FieldValue.serverTimestamp(),
        });

        db.collection("Users")
          .where("email", "==", this.state.userId)
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              db.collection("Users").doc(doc.id).update({
                isBookRequestActive: true,
              });
            });
          });

        this.setState({
          bookName: "",
          reasonRequest: "",
        });
        alert("Book Requested Successfully");
      } else {
        alert("Please Write Your Reason");
      }
    } else {
      alert("Please Write Your Book Name");
    }
  };

  componentDidMount() {
    this.getIsBookRequestActive();
    this.getBookRequest();
  }

  render() {
    console.log(this.state.isBookRequestActive);
    if (this.state.isBookRequestActive === true) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View
            style={{
              borderColor: "orange",
              borderWidth: 2,
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              margin: 10,
            }}
          >
            <Text>Book Name:</Text>
            <Text> {this.state.requestedBookName}</Text>
          </View>
          <View
            style={{
              borderColor: "orange",
              borderWidth: 2,
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              margin: 10,
            }}
          >
            <Text>Book Status:</Text>
            <Text>{this.state.requestedBookStatus}</Text>
          </View>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: "orange",
              backgroundColor: "orange",
              width: 300,
              alignSelf: "center",
              alignItems: "center",
              height: 30,
              marginTop: 30,
            }}
            onPress={() => {
              this.updateBookRequestStatus();
              this.sendNotification();
            }}
          >
            <Text>I Received the Book</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View>
          <MyHeader title="Request Book" navigation={this.props.navigation} />
          <KeyboardAvoidingView style={styles.keyboardAvoidingViewStyle}>
            <TextInput
              style={styles.textInputStyle}
              placeholder="Enter Book Name"
              onChangeText={(text) => {
                this.setState({ bookName: text });
              }}
              value={this.state.bookName}
            />

            <TextInput
              style={[styles.textInputStyle, { height: 300 }]}
              placeholder="Why Do You Need The Book??"
              onChangeText={(text) => {
                this.setState({ reasonRequest: text });
              }}
              value={this.state.reasonRequest}
              multiline={true}
              numberOfLines={10}
            />

            <TouchableOpacity
              style={styles.requestStyle}
              onPress={() => {
                this.addRequest(this.state.bookName, this.state.reasonRequest);
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>Request</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  keyboardAvoidingViewStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textInputStyle: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    borderColor: "#ffab91",
    borderRadius: 30,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  requestStyle: {
    width: "50%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "gold",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: 60,
  },
});
