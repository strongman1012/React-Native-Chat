import React, {
  Component,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

const Chat = require('./Chat');

class Main extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }
  }

  handleChange(e) {
    this.setState({
      username: e.nativeEvent.text
    })
  }

  handleSubmit() {
    this.props.navigator.push({
      component: Chat,
      passProps: { user: this.state.username }
    })
  }

  render() {
    return (
      <View
        style={styles.mainContainer}>
        <Text>Enter a chat username.</Text>
        <TextInput
          style={styles.searchInput}
          value={this.state.username}
          onChange={this.handleChange.bind(this)} />
        <TouchableHighlight
          onPress={this.handleSubmit.bind(this)}>
           <Text
            style={styles.enterButton}
            underlayColor="white">ENTER
          </Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 30,
    marginTop: 65,
    backgroundColor: '#19CAB6'
  },
  searchInput: {
    height: 45,
    padding: 4,
    marginRight: 5,
    fontSize: 20,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    backgroundColor: 'white'
  },
  enterButton: {
    backgroundColor: 'grey',
    height: 40,
    borderRadius: 4
  }
})

module.exports = Main;
