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
    

        <input
            placeholder="Active Sensor"
            id="sensors"
            list="sensors"
            type="text"
            // onChange={this.handleInput}
          />
          <datalist id="sensors">
            {this.props.sensors.map((o,i) =>(
               <option value={o} key={i} />
            ))}
          </datalist>
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
