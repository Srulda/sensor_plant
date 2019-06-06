import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import "../style/currentPlantData.css";
import Axios from "axios";

@inject("itemStore", "plantsStore")
@observer
class CurrentPlantData extends Component {
constructor(){
  super()
  this.state = {
    statsistics : {}
  }
}


  componentDidMount = () => {
setInterval(async () => {
    await this.renderLiveStats()
}, 2000);
     }

 
  renderLiveStats = async () => {
    let currentStats = await Axios.get(`http://localhost:2805/sensorLive/5cf7e63635cbb321047ceff6`);
    this.setState({
      statsistics : currentStats.data[0]
    })
    console.log(currentStats.data[0]);
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
            <div>{this.state.statsistics.m}%</div>
            
          </div>

          <div id = "tempAndHumid">
            <div className = "tempBadge" id={this.classTemp()}>
              <i className="fas fa-thermometer-three-quarters" />
              <div>TEMP</div>
              <div>{this.state.statsistics.c}&deg;</div>

            </div>

            <div className = "humidBadge" id={this.classHumidity()}>
              <i className="fas fa-water" />
              <div>HUMIDITY</div>
              <div>{this.state.statsistics.h}%</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CurrentPlantData;
