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

export default class SmartApp extends Component {
  render() {
    return <View style={styles.container}>
      <Text>My SmartApp</Text>
      <Button onPress={Actions.pop}>Back</Button>      
    </View>git
  }
}