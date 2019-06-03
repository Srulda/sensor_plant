import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import "../style/plant.css";

@inject("itemStore", "user", "plantsStore", "generalStore")
@observer
class Plant extends Component {
  addPlant = () => {
    this.props.user.addPlant(this.props.data.name);
    console.log(this.props.data.name);
  };

  render() {
    let flower = this.props.data;
    return (
      <div className="plant-container" onClick={this.addPlant}>
        <div className="plant-img">
          <img className="img" alt="plant" src={`${flower.img}`} />
        </div>
        <div className="plant-name">{flower.name}</div>
        <div className="plant-temp">
          Recomended Temp {Math.round(flower.temperature_min)}&deg; -{" "}
          {Math.round(flower.temperature_max)}&deg;
        </div>

        <div className="plant-water">Water - {flower.water}</div>
        <div className="plant-fertilizer">Fertilizer - {flower.fertilizer}</div>
        {/* <div className="plant-harvest">Harvest - {flower.harvest}</div>  */}
      </div>
    );
  }
}

export default Plant;
