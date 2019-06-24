import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import "../style/currentPlantData.css";

@inject("plantsStore")
@observer
class CurrentPlantData extends Component {
  plantCurrentCondition = () => {
    let { currentStats } = this.props;
    let currentT = currentStats.c;
    let currentH = currentStats.h;
    let currentM = currentStats.m;
    let currentObj = {
      c: currentT,
      h: currentH,
      m: currentM
    };
    return currentObj;
  };

  calculateDifference = (curr, min, max) => {
    let setClass = "";
    if (curr < min) {
      setClass = "cold";
    } else if (curr > max) {
      setClass = "cold";
    } else {
      setClass = "is-fine";
    }
    return setClass;
  };

  classTemp = () => {
    let { plantsStore } = this.props;
    let { plantName } = this.props;
    let current = this.plantCurrentCondition();
    let min = plantsStore.getPlantMinTemp(plantName);
    let max = plantsStore.getPlantMaxTemp(plantName);
    return this.calculateDifference(current.c, min, max);
  };

  classHumidity = () => {
    let { plantsStore } = this.props;
    let { plantName } = this.props;
    let current = this.plantCurrentCondition();
    let min = plantsStore.getPlantMinHumid(plantName);
    let max = plantsStore.getPlantMaxHumid(plantName);
    return this.calculateDifference(current.h, min, max);
  };

  classMoisture = () => {
    let { plantsStore } = this.props;
    let { plantName } = this.props;
    let current = this.plantCurrentCondition();
    let min = plantsStore.getPlantMinMoist(plantName);
    let max = plantsStore.getPlantMaxMoist(plantName);
    return this.calculateDifference(current.m, max, min);
  };

  render() {
    return (
      <div id="badges-container">
        <div id="temp" className={this.classTemp()}>
          <div id="tempText" />
          <div className="nums">
            <i className="fas fa-thermometer-three-quarters" />
            <div>{this.props.currentStats.c}&deg;</div>
          </div>
        </div>

        <div id="moist" className={this.classMoisture()}>
          <div id="moistTextText" />
          <div className="nums">
            <i className="fas fa-water" />
            <div>{this.props.currentStats.m}%</div>
          </div>
        </div>

        <div id="humid" className={this.classHumidity()}>
          <div id="humidText" />
          <div className="nums">
            <i className="fas fa-leaf" />
            <div>{this.props.currentStats.h}%</div>
          </div>
        </div>
      </div>
    );
  }
}

export default CurrentPlantData;
