import React, { Component } from "react";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";
import "../style/home.css";
@inject("generalStore", "user", "plantsStore")
@observer
class Home extends Component {
  inputHandler = e => {
    this.props.generalStore.handleInput(e.target.name, e.target.value);
  };

  addPlant = () => {
    console.log(this.props.generalStore.name);
    this.props.plantsStore.addPlant(this.props.generalStore.name);
  };

  componentDidMount =  async() => {
    let userID = JSON.parse(sessionStorage.getItem("currentLogin"));
    this.props.user.getUserPlants(userID._id);
    
  };

  render() {
    return (
      <div className="home">
        <div className="search">
          <input type="text" name="name" onInput={this.inputHandler} />
          <i className="far fa-plus-square" onClick={this.addPlant} />
        </div>

        <Link to="/plants">
          <div className="plants-link">
            <i className="fab fa-pagelines" />
          </div>
        </Link>
        <Link to="/dashboard">
          <div className="dash-link">
            <i className="fas fa-tachometer-alt" />
          </div>
        </Link>
        <div className="msg">
          <div>Your Plant Needs You</div>
        </div>
      </div>
    );
  }
}

export default Home;
