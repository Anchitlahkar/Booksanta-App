import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { MyHeader } from '../components/MyHeader';
import db from '../config';
import firebase from 'firebase';
import { ListItem } from 'react-native-elements';

export default class DonateBookScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      requestedBookList: '',
    };
    this.requestRef = null;
  }

  getRequestedBookList = () => {
    this.requestRef = db.collection('BookRequest').onSnapshot((snapshot) => {
      var requestedBookList = snapshot.docs.map((document) => document.data());
      this.setState({
        requestedBookList: requestedBookList,
      });
    });
  };

  componentDidMount = () => {
    this.getRequestedBookList();
  };

  render() {
    return (
      <View>
        <MyHeader title="Donate Book" />

        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={this.state.requestedBookList}
          renderItem={({ item, i }) => {
            return (
              <ListItem
                key={i}
                title={item.BookName}
                subtitle={item.Reason}
                titleStyle={{ color: 'black', fontWeight: 'bold' }}
                rightElement={
                  <TouchableOpacity style={styles.button}
                  onPress={()=>{
                    this.props.navigation.navigate("ReceiverDetails",{"details": item});
                  }}>
                    <Text style={{ color: '#ffff' }}>View</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
});
