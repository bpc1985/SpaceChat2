import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default class Main extends Component {
  render() {
    return <View style={styles.container}>
      <Text>Main Page</Text>
      <Button onPress={Actions.smartApp}>Go SmartApp</Button>
      <Button onPress={Actions.chat}>Go Chat</Button>
      <Button onPress={Actions.pop}>Back</Button>
    </View>
  }
}