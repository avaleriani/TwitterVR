import React from "react";
import App from "./src/components/App/App";
import { AppRegistry } from "react-360";
import { registerKeyboard } from "react-360-keyboard";

export default class TwitterVR extends React.Component {
  render() {
    return <App />;
  }
}

AppRegistry.registerComponent("TwitterVR", () => TwitterVR);
AppRegistry.registerComponent(...registerKeyboard);
