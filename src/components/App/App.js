import React from "react";
import { Text, View, StyleSheet } from "react-360";
import styles from "./app.css.js";
import Login from "../../containers/Login/Login";

const stylesheet = StyleSheet.create(styles);

class App extends React.Component {
  render() {
    return (
      <View style={stylesheet.panel}>
        <View style={stylesheet.greetingBox}>
          <Text> Login </Text>
          <Login />
        </View>
      </View>
    );
  }
}

export default App;
