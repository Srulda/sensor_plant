import React, { Component } from 'react';
import "../style/signUp.css";
import { observer, inject } from "mobx-react";

@inject("generalStore", "user")
@observer
class SignUp extends Component {
    constructor(){
        super()
        this.state = {
            newUser :  ""
        }
    }
    
        handleInput = e => {
            let inputValue = e.target.value;
            this.setState({
              [e.target.id]: inputValue
            });
          };
    
      SignUp = () => {
         this.props.user.signUp(this.state.newUser) 
      };
    
    render() {
        return (
            <div>
                <div id="signUp">
          <input
            type="text"
            id="newUser"
            value = {this.state.newUser}
            onChange={this.handleInput}
          />

          <button onClick={this.SignUp}>Sign Up</button>
        </div>
            </div>
        );
    }
}

export default SignUp;