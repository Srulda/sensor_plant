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




  classTemp = () => {
    if (this.plantCurrentTemp() < this.props.plantsStore.getBasilMinTemp) {
      return "cold";
    } else if (this.plantCurrentTemp() > this.props.plantsStore.getBasilMaxTemp) {
      return "hot";
    } else {
      return "is-fine";
    }
  };

  classHumidity = () => {
    if (this.plantCurrentHumadity() < this.props.plantsStore.getBasilMinHumid) {
      return "cold";
    } else if (
      this.plantCurrentHumadity() > this.props.plantsStore.getBasilMaxHumid
    ) {
      return "hot";
    } else {
      return "is-fine";
    }
  };

  classMoisture = () => {
    if (this.plantCurrentMoist() < this.props.plantsStore.getBasilMinMoist) {
      return "cold";
    } else if (
      this.plantCurrentMoist() > this.props.plantsStore.getBasilMaxMoist
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
