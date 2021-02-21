import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from 'react-native';

import { MyHeader } from '../components/MyHeader';
import db from '../config';
import firebase from 'firebase';

export default class RequestBookScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      bookName: '',
      reasonRequest: '',
      userId: firebase.auth().currentUser.email,
    };
  }

  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }

  addRequest = (bookName, reason) => {
    var userId = this.state.userId;
    var randomRequestId = this.createUniqueId();

    if (bookName !== '') {
      if (reason !== '') {
        db.collection('BookRequest').add({
          UserId: userId,
          RequestId: randomRequestId,
          BookName: bookName,
          Reason: reason,
        });

        this.setState({
          bookName: '',
          reasonRequest: '',
        });
        alert('Book Requested Successfully');
      } else {
        alert('Please Write Your Reason');
      }
    } else {
      alert('Please Write Your Book Name');
    }
  };

  render() {
    return (
      <View>
        <MyHeader title="Request Book" />
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
            }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Request</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  keyboardAvoidingViewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputStyle: {
    width: '75%',
    height: 35,
    alignSelf: 'center',
    borderColor: '#ffab91',
    borderRadius: 30,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  requestStyle: {
    width: '50%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'gold',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: 60,
  },
});
