import React, { Component } from "react";
import "../style/login.css";
import { observer, inject } from "mobx-react";

@inject("generalStore", "user")
@observer
class Login extends Component {
  inputHandler = e => {
    this.props.user.handleInput(e.target.name, e.target.value);
    console.log(e);
  };

  userLogIn = () => {
    this.props.user.isLoggedIn(this.props.user.userName);
  };

  render() {
    return (
      <div>
        <div id="login">
          <input type="text" name="userName" onChange={this.inputHandler} />

          <button onClick={this.userLogIn}>Log In</button>
        </div>
      </div>
    );
  }
}

export default Login;
