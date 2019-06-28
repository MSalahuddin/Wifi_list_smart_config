import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { updateCounter } from "../../actions/counterAction";
import { request as register_user } from "../../actions/RegisterAction";
import { register_API } from "../../config/WebServices";
//The value that the counter will increase/decrease per click
const counterStep = 1;

class CounterComponent extends Component {
  constructor(props) {
    super(props);
  }
  increment = () => {
    this.props.updateCounter(counterStep);
  };
  decrement = () => {
    this.props.updateCounter(-counterStep);
  };

  registerUser = () => {
    let payload = {
      email: "dassasadqwqw2qewas@gmail.com",
      device_token: "string",
      device_type: "android"
    };
    this.props.register_user(register_API, payload);
  };
  render() {
    const { counter, register } = this.props;
    console.log(counter, "coooooooo");
    console.log(register, "re");

    return (
      <View>
        <Text>{this.props.counter}</Text>
        <TouchableOpacity onPress={() => this.decrement()}>
          <Text>-</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.increment()}>
          <Text>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: "red" }}
          onPress={() => this.registerUser()}
        >
          <Text>RegisterUser</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    counter: state.counterReducer,
    register: state.register
  };
};

const actions = { updateCounter, register_user };
// const mapDispatchToProps = dispatch => {
//   return {
//     increment: () => {
//       dispatch(updateCounter(counterStep));
//     },
//     decrement: () => {
//       dispatch(updateCounter(-counterStep));
//     }
//   };
// };

export default connect(
  mapStateToProps,
  actions
)(CounterComponent);
