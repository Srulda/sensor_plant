import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import "../style/currentPlantData.css";

@inject("itemStore", "plantsStore")
@observer
class CurrentPlantData extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  plantCurrentTemp = () => {
    let currentTemp = this.props.itemStore.liveStats.c;
    return currentTemp;
  };
  plantCurrentHumadity = () => {
    let currentH = this.props.itemStore.liveStats;
    return currentH;
  };
  plantCurrentMoist = () => {
    let currentM = this.props.itemStore.liveStats.m;
    return currentM;
  };

  classTemp = async () => {
    if (
      this.plantCurrentTemp() < (await this.props.plantsStore.getPlantMinTemp())
    ) {
      console.log("cold");
    } else if (
      this.plantCurrentTemp() > (await this.props.plantsStore.getPlantMaxTemp())
    ) {
      console.log("hot");
      return "hot";
    } else {
      return "is-fine";
    }
  };

  classHumidity = () => {
    if (
      this.plantCurrentHumadity() < this.props.plantsStore.getPlantMinHumid()
    ) {
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
        <div id="badges-container">

              <div id = "temp" className={this.classTemp()}>
                <div id = "tempText">Good Air Temprature</div>
                <div className = "nums">
                <i className="fas fa-thermometer-three-quarters" />
               <div>{this.props.statsistics.c}&deg;</div>
                </div>
              
             </div>

             <div id = "moist"  className={this.classMoisture()}>
             <div id = "moistTextText">Your Plant Need WATER</div>
              <div className = "nums">
              <i className="fas fa-water" />
              <div>{this.props.statsistics.m}%</div>
              </div>
           </div>
           

           <div id = "humid" className={this.classHumidity()}>
             <div id = "humidText">Comfort Zone Humidity</div>
              <div className = "nums">
              <i className="fas fa-leaf" />
              <div>{this.props.statsistics.h}%</div>
              </div>
           </div>    
         </div>
    );
  }
}

export default CurrentPlantData;
