import React from "react";
import { connect } from "react-redux";
import { login, isAuthenticated } from "../../components/modules/users";
import { Text, View } from "react-native";
import { VrButton, NativeModules, AppRegistry } from "react-360";
import { registerKeyboard } from "react-360-keyboard";
AppRegistry.registerComponent(...registerKeyboard);

export class Login extends React.Component {
  input = null;

  onClick() {
    NativeModules.Keyboard.startInput({
      placeholder: "Enter your name"
    }).then(input => console.log(input));
  }

  onSubmit = event => {
    event.preventDefault();
    const { value } = this.input;

    if (!value.trim()) {
      return;
    }
    this.props.login(value);
    this.input.value = "";
  };

  render() {
    const { classes, isAuthenticated } = this.props;

    // if (isAuthenticated) {
    //   return <Redirect to="/" />;
    // }

    return (
      <View>
        <VrButton onClick={this.onClick}>
          <Text>Show Keyboard</Text>
        </VrButton>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticated(state.users)
});

const mapDispatchToProps = { login };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
