import React, { Component } from "react";
import "../style/personalDash.css";

class UserPlant extends Component {
  connect = () => {
    let ID = this.props.id;
    this.props.connect(ID);
  };

  disconnect = () => {
    let ID = this.props.id;
    this.props.disconnect(ID);
  };

  render() {
    return (
      <div className="user-plant-card" id={this.props.id}>
        <div className="user-plant-name">{this.props.name}</div>
        <button className="connect-btn" onClick={this.connect}>
          Connect
        </button>
        <button className="disconnect-btn" onClick={this.disconnect}>
          Disconnect
        </button>
      </div>
    );
  }
}

export default UserPlant;
