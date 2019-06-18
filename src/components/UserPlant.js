import React, { Component } from "react";
import "../style/personalDash.css";

class UserPlant extends Component {
  constructor() {
    super();
    this.state = {
      isActive: false
    };
  }
  connect = async e => {
    await this.props.connect(e);
    this.setState({
      isActive: true
    });
    this.checkIfActive();
  };

  checkIfActive = () => {
    let classActive = "off";
    if (this.state.isActive === true) {
      classActive = "heartbeat";
    }
    return classActive;
  };

  render() {
    return (
      <div className="myPlant-card" onClick={this.connect}>
        <div id={this.props.id}> {this.props.name} </div>
        <div className={`status ${this.checkIfActive()}`} />
      </div>
    );
  }
}

export default UserPlant;
