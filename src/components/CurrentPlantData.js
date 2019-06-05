import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import "../style/currentPlantData.css";

@inject("itemStore", "plantsStore")
@observer
class CurrentPlantData extends Component {
  componentDidMount = () => {
    this.props.itemStore.getLiveStats();
  };
  plantCurrentTemp = () => {
    let currentTemp = this.props.itemStore.liveStats.c;
    return currentTemp;
  };
  plantCurrentHumadity = () => {
    let currentH = this.props.itemStore.liveStats.h;
    return currentH;
  };
  plantCurrentMoist = () => {
    let currentM = this.props.itemStore.liveStats.m;
    return currentM;
  };




  classTemp =  async () => {
      if (this.plantCurrentTemp() < await this.props.plantsStore.getPlantMinTemp()) {
        console.log("cold")
      } else if (this.plantCurrentTemp() >await  this.props.plantsStore.getPlantMaxTemp()) {
        console.log("hot")
        return "hot";
      } else {
        console.log("isFine")
        console.log(this.plantCurrentTemp());
        console.log( await this.props.plantsStore.getPlantMaxTemp()); 
        return "is-fine";
    }
  };

  classHumidity = () => {

    if (this.plantCurrentHumadity() < this.props.plantsStore.getPlantMinHumid()) {
      return "cold";
    } else if (
      this.plantCurrentHumadity() > this.props.plantsStore.getPlantMaxHumid()
    ) {
      return "hot";
    } else {
      return "is-fine";
    }
  };

  classMoisture = () => {

    if (this.plantCurrentMoist() < this.props.plantsStore.getPlantMinMoist()) {
      return "cold";
    } else if (
      this.plantCurrentMoist() > this.props.plantsStore.getPlantMaxMoist()
    ) {
      return "hot";
    } else {
      return "is-fine";
    }
  };

  render() {
    return (
      <div>
        <div id="badges-container">
          <div className = "moistureBadge" id={this.classMoisture()}>
            <i className="fas fa-leaf" />
            <div>MOIST</div>
            <div>{Math.round(this.plantCurrentMoist())}%</div>
          </div>

          <div id = "tempAndHumid">
            <div className = "tempBadge" id={this.classTemp()}>
              <i className="fas fa-thermometer-three-quarters" />
              <div>TEMP</div>
              <div>{Math.round(this.plantCurrentTemp())}&deg;</div>
            </div>

            <div className = "humidBadge" id={this.classHumidity()}>
              <i className="fas fa-water" />
              <div>HUMIDITY</div>
              <div>{Math.round(this.plantCurrentHumadity())}%</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CurrentPlantData;
