import React from "react";
import { Text, View, StyleSheet } from "react-360";
import { VrButton, NativeModules } from "react-360";

import styles from "./app.css.js";

const stylesheet = StyleSheet.create(styles);

export default class App extends React.Component {
  onClick() {
    // 4.) show the keyboard
    NativeModules.Keyboard.startInput({
      placeholder: "Enter your name"
    }).then(input => console.log(input));
  }
  render() {
    return (
      <View style={stylesheet.panel}>
        <View style={stylesheet.greetingBox}>
          <Text style={stylesheet.greeting}>Welcome to React 360</Text>
          <VrButton onClick={this.onClick}>
            <Text>Show Keyboard</Text>
          </VrButton>
        </View>
      </View>
    );
  }
}
