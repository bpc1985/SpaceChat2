import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Keyboard
} from 'react-native';

import {save, subscribe} from './Firebase/Api';
import Header from './Header';

const NAME = 'Hung Ho';
const CHANNEL = 'AlphaCentauri';
const AVATAR = 'https://i.pinimg.com/564x/56/f0/c7/56f0c7de57fdae6d0a9ddc43448b6dff.jpg';

export default class Chat extends Component {
  state = {
    searchMessage: '',
    currentMessage: '',
    filteredMessages: [],
    messages: []
  };

  componentWillMount() {
    subscribe(CHANNEL, messages => {
      this.setState({
        messages,
        filteredMessages: messages
      });
    });
  }

  async saveMessage() {
    await save({
      avatar: AVATAR,
      channel: CHANNEL,
      sender: NAME,
      message: this.state.currentMessage
    });
  
    this.setState({
      currentMessage: '',
    });
  }

  onCancel() {
    Keyboard.dismiss();
    this.setState({
      searchMessage: '',
      filteredMessages: this.state.messages
    });
  }

  setSearchMessage(searchMessage = '') {
    let searchMessageParsed = searchMessage.toLowerCase().trim();
    const filteredMessages = this.state.messages.filter(
      msg => msg.message.toLowerCase().indexOf(searchMessageParsed) !== -1
    );
    
    this.setState({
      searchMessage,
      filteredMessages
    });
  }

  renderItem({item}) {
    return (
      <View style={styles.row}>
        <Image style={styles.avatar} source={{ uri: item.avatar }} />
        <View style={styles.rowText}>
          <Text style={styles.sender}>{item.sender}</Text>
          <Text style={styles.message}>{item.message}</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title={CHANNEL} />

        <KeyboardAvoidingView behavior="padding">
          <View style={styles.search}>
            <TextInput
              value={this.state.searchMessage}
              onChangeText={this.setSearchMessage.bind(this)}
              style={styles.searchInput}
              underlineColorAndroid="transparent"
              placeholderTextColor="#f1efef"
              placeholder="Search messages" />
            <TouchableOpacity onPress={this.onCancel.bind(this)}>
              <Text style={styles.searchCancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>

        <FlatList
          data={this.state.filteredMessages}
          renderItem={this.renderItem}
          ref={ref => this.flatListRef = ref}
          onContentSizeChange={(contentWidth, contentHeight) => {
            this.flatListRef.scrollToEnd({ animated: true });
          }}
        />

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f2e5d2',
  },
  message: {
    fontSize: 18,
  },
  sender: {
    fontWeight: 'bold',
    paddingRight: 10,
  },
  controls: {
    flexDirection: 'row',
    backgroundColor: '#f2e5d2',
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 18,
    flex: 1,
  },
  send: {
    alignSelf: 'center',
    color: '#ff7f50',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 20,
  },
  avatar: {
    borderRadius: 20,
    width: 40,
    height: 40,
    marginRight: 10
  },
  rowText: {
    flex: 1
  },
  search: {
    flexDirection: 'row',
    backgroundColor: '#92cbdb',
  },
  searchInput: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 18,
    flex: 1,
    color: '#ffffff',
  },
  searchCancel: {
    alignSelf: 'center',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 14,
  },
});
