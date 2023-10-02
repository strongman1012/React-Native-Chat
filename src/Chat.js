import React, {
  Component,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  ListView
} from 'react-native';

const Firebase = require('firebase');
const MessageItem = require('./MessageItem');
const moment = require('moment');
const InvertibleScrollView = require('react-native-invertible-scroll-view');

const FIREBASE_URL = 'https://rn-notetaker.firebaseio.com';

class Chat extends React.Component{
  constructor(props) {
    super(props);
    this.messagesRef = new Firebase(FIREBASE_URL);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      message: ''
    }
  }

  componentDidMount() {
    this._listenForMesssages();
  }

  componentWillUnmount() {
     this.messagesRef.off();
  }

  _listenForMesssages() {
    this.messagesRef.on('value', (snapshot) => {
      let messages = [];
      snapshot.forEach((child) => {
        messages.push({
          message: child.val().message,
          username: child.val().user,
          time: child.val().time,
          id: child.key()
        })
      })
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(messages.reverse())
      })
    })
  }

  _sendMessage() {
    let message = this.state.message;
    let time = moment().format('h:mm')
    if (message) {
      this.messagesRef.push({
        message: message,
        user: this.props.user,
        time: time
      })
      this.setState({
        message: ''
      })
    }
  }

  _renderItem(message) {
    return (
      <MessageItem
        message={message} />
    )
  }

  _handleChange(e) {
    this.setState({
      message: e.nativeEvent.text
    })
  }

  _renderMessages() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderItem.bind(this)}
        renderScrollComponent={props => <InvertibleScrollView {...props} inverted />} />
    )
  }

  _renderFooter() {
    return (
      <View style={styles.footerContainer}>
        <TextInput
          style={styles.searchInput}
          value={this.state.message}
          onChange={this._handleChange.bind(this)}
          placeHolder="Enter a chat message." />
        <TouchableHighlight
          style={styles.button}
          onPress={this._sendMessage.bind(this)}>
          <Text
            style={styles.buttonText}
            underlayColor="#88D4F5">
            Send
          </Text>
        </TouchableHighlight>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        {this._renderMessages()}
        {this._renderFooter()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    backgroundColor: '#19CAB6',
    flexDirection: 'column',
    flex: 1,
    padding: 30,
    marginTop: 20
  },
  button: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    backgroundColor: '#48BBEC'
  },
  buttonText: {
    fontSize: 18,
    color: 'white'
  },
  searchInput: {
    height: 60,
    padding: 10,
    fontSize: 18,
    flex: 10,
    color: '#111'
  },
  footerContainer: {
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    flexDirection: 'row'
  }
})

module.exports = Chat;
