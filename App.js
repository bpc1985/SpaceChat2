import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';

import {save, subscribe} from './Firebase/Api';
import styles from './Styles';

const NAME = 'Hung Ho';
const CHANNEL = 'AlphaCentauri';

export default class App extends Component {
  state = {
    currentMessage: '',
    messages: []
  };

  componentWillMount() {
    subscribe(CHANNEL, messages => {
      console.log('messages: ', messages);
      this.setState({messages});
    });
  }

  async saveMessage() {
    await save({
      channel: CHANNEL,
      sender: NAME,
      message: this.state.currentMessage
    });
  
    this.setState({
      currentMessage: '',
    });
  }

  renderItem({item}) {
    return (
      <View style={styles.row}>
        <Text style={styles.sender}>{item.sender}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>The space chat is preparing for take off</Text>

        <FlatList data={this.state.messages} renderItem={this.renderItem} />

        <KeyboardAvoidingView behavior="padding">
          <View style={styles.controls}>
            <TextInput
              value={this.state.currentMessage}
              onChangeText={text => this.setState({ currentMessage: text })}
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Type a nice message" />
            <TouchableOpacity onPress={this.saveMessage.bind(this)}>
              <Text style={styles.send}>Send</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
