import React from 'react';
import {Text, View, StyleSheet} from "react-360";
import styles from './app.css.js';

const stylesheet = StyleSheet.create(styles);

export default class App extends React.Component {
  render() {
    return (
      <View style={stylesheet.panel}>
        <View style={stylesheet.greetingBox}>
          <Text style={stylesheet.greeting}>
            Welcome to React 360
          </Text>
        </View>
      </View>
    );
  }
};

