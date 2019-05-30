import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
@inject("itemStore", "plantsStore")
@observer
class CurrentPlantData extends Component {

    componentDidMount = () =>{
        this.props.itemStore.getDataFromDB()
    }
    plantCurrentTemp = () =>{
        let currentTemp = this.props.itemStore.plants.map(d =>(d.c))
        return (currentTemp[currentTemp.length-1])
    }
    plantCurrentHumadity = () =>{
        let currentH = this.props.itemStore.plants.map(d =>(d.h))
        return (currentH[currentH.length-1])
    }
    plantCurrentMoist = () =>{
        let currentM = this.props.itemStore.plants.map(d =>(d.m))
        return (currentM[currentM.length-1])
    }
 

    classTemp = () => {
        if(this.plantCurrentTemp() < this.props.plantsStore.getBasilMinTemp){
           return "cold"
        }else if(this.plantCurrentTemp > this.props.plantsStore.getBasilMaxTemp){
            return "hot"
        }else{
            return "is-fine"
        }
    }

    classHumidity = () => {
        if(this.plantCurrentHumadity() < this.props.plantsStore.getBasilMinHumid){
           return "cold"
        }else if(this.plantCurrentHumadity() > this.props.plantsStore.getBasilMaxHumid){
            return "hot"
        }else{
            return "is-fine"
        }
    }
    
    classMoisture = () => {
        if(this.plantCurrentMoist() < this.props.plantsStore.getBasilMinMoist){
           return "hot"
        }else if(this.plantCurrentMoist() > this.props.plantsStore.getBasilMaxMoist){
            return "cold"
        }else{
            return "is-fine"
        }
    }


    render() { 
            return (
            <div id="badges-container">
                <div className={this.classTemp()} >
                    <i className="fas fa-thermometer-three-quarters"></i>
              <div >TEMP</div>
              <div>{Math.round(this.plantCurrentTemp())}&deg;</div>
              </div>

              <div className={this.classHumidity()}>
              <i className="fas fa-water"></i>
              <div>HUMIDITY</div>
                <div>{Math.round(this.plantCurrentHumadity())}%</div>
              </div>

            <div className={this.classMoisture()}>
            <i className="fas fa-leaf"></i>
              <div>MOIST</div>      
                <div>{Math.round(this.plantCurrentMoist())}%</div>
              </div>
            </div> 
         );
    }
}
 
export default CurrentPlantData;