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
            <input className="item-sign" type="text" placeholder="Name" value = {this.props.user.userName} name="userName" onChange={this.inputHandler} />
        <input className="item-sign" placeholder="Sensor Number" value = {this.props.user.sensorName} name="sensorName" onChange={this.inputHandler}/>
            <div className="item-sign" id="sign-btn" onClick={this.SignUp}>Sign Up</div>
        </div>
            </div>
        );
    }
}

export default SignUp;