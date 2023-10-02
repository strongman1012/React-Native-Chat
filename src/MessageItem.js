import React, {
  Component,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  ListView
} from 'react-native';

class MessageItem extends React.Component{

  render() {
    return (
      <TouchableHighlight>
        <View style={styles.li}>
          <Text>{this.props.message.username}</Text>
          <Text>{this.props.message.message}</Text>
          <Text style={styles.time}>{this.props.message.time}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  time: {
    alignItems: 'flex-end'
  }
})


module.exports = MessageItem;
