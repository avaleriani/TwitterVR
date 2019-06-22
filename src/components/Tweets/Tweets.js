import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-360";
import { VrButton, NativeModules } from "react-360";
import styles from "../Tweets/Tweets.css.js";

const stylesheet = StyleSheet.create(styles);

const keyboardConfig = {
  placeholder: "Twitter handle",
  sound: true,
  emoji: true,
  tintColor: "#FFFFFF"
};

export default class Tweets extends Component {
  constructor() {
    super();
    this.state = { tweets: undefined };
  }

  onClick = () => {
    NativeModules.Keyboard.startInput(keyboardConfig).then(input =>
      this.fetchUserTweets(input)
    );
  };

  fetchUserTweets = (input: string) => {
    fetch(`http://localhost:3001/v1/get?name=${input}`)
      .then(res => res.json())
      .then(json => {
        this.setState({ tweets: json });
        console.log(json);
      });
  };

  render() {
    const { tweets } = this.state;

    return tweets === undefined ? (
      <View style={stylesheet.panel}>
        <View style={stylesheet.greetingBox}>
          <Text style={stylesheet.greeting}>Welcome to Twitter in VR</Text>
          <VrButton onClick={this.onClick}>
            <Text>Show Keyboard</Text>
          </VrButton>
        </View>
      </View>
    ) : (
      <View style={stylesheet.panel}>
        <View style={stylesheet.greetingBox}>
          {tweets.map((tweet, i) => (
            <Text key={`tweet-${i}`} style={stylesheet.greeting}>
              {tweet.text}
            </Text>
          ))}
        </View>
      </View>
    );
  }
}
