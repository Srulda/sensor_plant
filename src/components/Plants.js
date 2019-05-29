import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import "../style/App.css";
@inject("generalStore", "plantsStore")
@observer
class Plants extends Component {
  inputHandler = e => {
    this.props.generalStore.handleInput(e.target.name, e.target.value);
  };

  addPlant = () => {
    this.props.plantsStore.addPlant(this.props.generalStore.name);
  };

  render() {
    let data = this.props.plantsStore.getDataFromDB().then(data => {
      console.log(data);
    });

    return (
      <div className="plants-section">
        <input
          type="text"
          name="plants"
          placeholder="Search plants"
          onInput={this.inputHandler}
        />
      </div>
    );
  }
}

export default Plants;
