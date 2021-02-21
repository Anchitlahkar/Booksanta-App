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
import { MyHeader } from "../components/MyHeader";
import db from "../config";
import firebase from "firebase";

export default class SettingScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      LastName: "",
      contact: "",
      address: "",
      emailId: "",
      docId: "",
    };
  }

  getUserData = () => {
    var user = firebase.auth().currentUser;
    var email = user.email;

    db.collection("Users")
      .where("email", "==", email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          var name = data.name;
          var fullName = name.split(" ");

          console.log(fullName);

          this.setState({
            emailId: data.email,
            firstName: fullName[0],
            LastName: fullName[1],
            address: data.address,
            contact: data.contact,
            docId: doc.id,
          });
        });
      });
  };

  componentDidMount() {
    console.log("componentDidMount");
    this.getUserData();
  }
  updateUserData = () => {
    db.collection("Users")
      .doc(this.state.docId)
      .update({
        name: this.state.firstName + " " + this.state.LastName,
        contact: this.state.contact,
        address: this.state.address,
      });

    alert('User Details Updated SuccessFully')
  };
  render() {
    return (
      <View>
        <MyHeader title="Settings" />
        <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            User Info
          </Text>
          <TextInput
            style={styles.formTextInput}
            placeholder={"First Name"}
            maxLength={8}
            onChangeText={(text) => {
              this.setState({
                firstName: text,
              });
            }}
            value={this.state.firstName}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder={"Last Name"}
            maxLength={8}
            onChangeText={(text) => {
              this.setState({
                LastName: text,
              });
            }}
            value={this.state.LastName}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder={"Contact"}
            maxLength={10}
            keyboardType={"numeric"}
            onChangeText={(text) => {
              this.setState({
                contact: text,
              });
            }}
            value={this.state.contact}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder={"Address"}
            multiline={true}
            onChangeText={(text) => {
              this.setState({
                address: text,
              });
            }}
            value={this.state.address}
          />
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.updateUserData()}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  formTextInput: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    borderColor: "#ffab91",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  button: {
    width: "75%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#ff5722",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
  buttonText: {
    color: "#ff5722",
    fontSize: 15,
    fontWeight: "bold",
  },
  button: {
    width: 200,
    height: 40,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 30,
  },
});
