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

  classTemp = () => {
    let {plantsStore} = this.props
    let { plantName } = this.props;
    let current = this.plantCurrentCondition();
    if (current.c < plantsStore.getPlantMinTemp(plantName)) {
      console.log("cold");
    } else if (current.c > plantsStore.getPlantMaxTemp(plantName)) {
      console.log("hot");
      return "hot";
    } else {
      return "is-fine";
    }
  };

  classHumidity = () => {
    let {plantsStore} = this.props
    let { plantName } = this.props;
    let current = this.plantCurrentCondition();
    if (current.h < plantsStore.getPlantMinHumid(plantName)) {
      return "cold";
    } else if (current.h > plantsStore.getPlantMaxHumid(plantName)) {
      return "hot";
    } else {
      return "is-fine";
    }
  };

  classMoisture = () => {
    let {plantsStore} = this.props
    let { plantName } = this.props;
    let current = this.plantCurrentCondition();
    if (current.m < plantsStore.getPlantMinMoist(plantName)) {
      return "cold";
    } else if (current.m > plantsStore.getPlantMaxMoist(plantName)) {
      return "hot";
    } else {
      return "is-fine";
    }
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
