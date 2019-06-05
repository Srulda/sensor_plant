import React, { Component } from 'react';
import "../style/signUp.css";
import { observer, inject } from "mobx-react";

@inject("generalStore", "user")
@observer
class SignUp extends Component {
    inputHandler = e => {
        this.props.user.handleInput(e.target.name, e.target.value);
      };
    SignUp = () => {
         this.props.user.signUp(this.props.user.userName) 
      };
    
    render() {
        return (
            <div>
       <div id="signUp">
            <input type="text"  value = {this.props.user.userName} name="userName" onChange={this.inputHandler} />
            <button onClick={this.SignUp}>Sign Up</button>
        </div>
        <input placeholder="Sensor Number" value = {this.props.user.sensorName} name="sensorName" onChange={this.inputHandler}/>
            </div>
        );
    }
}

export default SignUp;