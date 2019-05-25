import React from 'react';
import App from "./src/components/App/App";
import {AppRegistry} from 'react-360';

export default class TwitterVR extends React.Component {
  render() {
    return (
      <App/>
    );
  }
};

AppRegistry.registerComponent('Twitter Client VR', () => TwitterVR);
