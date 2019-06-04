import React, { Component } from "react";
import "../style/login.css";
import { observer, inject } from "mobx-react";
import { Route, Redirect } from "react-router";

@inject("generalStore", "user")
@observer
class Login extends Component {
  inputHandler = e => {
    this.props.user.handleInput(e.target.name, e.target.value);
  };

  userLogIn = () => {
    this.props.user.isLoggedIn(this.props.user.userName);
  };

  render() {
    const loggedIn = this.props.user.loggedIn;
    return (
      <div>
        {!loggedIn ? (
          <div id="login">
            <input
              type="text"
              value={this.props.user.userName}
              name="userName"
              onChange={this.inputHandler}
            />
            <button onClick={this.userLogIn}>Log In</button>
          </div>
        ) : (
          <Redirect to="/home" />
        )}
      </div>
    );
  }
}

export default Login;
