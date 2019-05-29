import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import "../style/home.css";
@inject("generalStore")
@observer
class Home extends Component {
  inputHandler = e => {
    this.props.generalStore.handleInput(e.target.name, e.target.value);
  };

  addPlant = () => {
    console.log(this.props.generalStore.name);
    this.props.plantsStore.addPlant(this.props.generalStore.name);
  };

  render() {
    return (
      <div className="home">
        <div className="search">
          <input type="text" name="name" onInput={this.inputHandler} />
          <button onClick={this.addPlant}>Add</button>
        </div>
      </div>
    );
  }
}

export default Home;
