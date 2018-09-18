import React from "react";
import { Authentication } from "components";
import { connect } from "react-redux";
import { registerRequest } from "actions/authentication";
import { headerHomeOn, headerHomeOff } from "actions/header";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
  }

  componentDidMount() {
    this.props.handleHeaderHomeOn();
  }

  handleRegister(id, email, pw, repw) {
    return this.props.registerRequest(id, email, pw, repw).then(() => {
      if (this.props.authRegisterStatus === "SUCCESS") {
        Materialize.toast("Success! Please log in.", 2000);
        this.props.handleHeaderHomeOff();
        this.props.history.push("/");
        return true;
      } else {
        let errorMessage = [
          "Invalid username",
          "Password is too short",
          "Not Same Password",
          "Username already exists"
        ];

        let $toastContent = $(
          '<span style="color: #FFB4BA">' +
            errorMessage[this.props.authRegisterError - 1] +
            "</span>"
        );
        Materialize.toast($toastContent, 2000);
        return false;
      }
    });
  }

  render() {
    return (
      <div>
        <Authentication mode={false} onRegister={this.handleRegister} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authRegisterStatus: state.authentication.register.status,
    authRegisterError: state.authentication.register.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    registerRequest: (id, email, pw, repw) => {
      return dispatch(registerRequest(id, email, pw, repw));
    },
    handleHeaderHomeOn: () => dispatch(headerHomeOn()),
    handleHeaderHomeOff: () => dispatch(headerHomeOff())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
