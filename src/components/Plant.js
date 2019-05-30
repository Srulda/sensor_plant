import React, { Component } from "react";
import "../style/plant.css";

class Plant extends Component {
    
  render() {
    let flower = this.props.data
    return <div className="plant-container">
      <div className="plant-img"><img className="img" src={`${flower.img}`}/></div>
      <div className="plant-name">{flower.name}</div>
      <div className="plant-temp">Recomended Temp  {Math.round(flower.temperature_min)}&deg; - {Math.round(flower.temperature_max)}&deg;</div>
      
      <div className="plant-water">Water - {flower.water}</div>
       <div className="plant-fertilizer">Fertilizer - {flower.fertilizer}</div>
      {/* <div className="plant-harvest">Harvest - {flower.harvest}</div>  */}

    </div>;
  }
}

export default Plant;
