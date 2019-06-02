import React, { Component } from "react";
import "../style/login.css";
import { observer, inject } from "mobx-react";

@inject("generalStore")
@observer
class Login extends Component {
constructor(){
    super()
    this.state = {
        userName :  ""
    }
}

    handleInput = e => {
        let inputValue = e.target.value;
        this.setState({
          [e.target.id]: inputValue
        });
      };

  userLogIn = () => {
     this.props.generalStore.isLoggedIn(this.state.userName) 
  };

  render() {
    return (
      <div>
        <div id="login">
          <input
            type="text"
            id="userName"
            value = {this.state.userName}
            onChange={this.handleInput}
          />

          <button onClick={this.userLogIn}>Log In</button>
        </div>
      </div>
    );
  }
}

export default Login;
