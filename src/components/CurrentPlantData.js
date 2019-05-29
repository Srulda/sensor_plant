import React, { Component } from 'react';
import { observer, inject } from "mobx-react";



@inject("itemStore", "plantsStore")
@observer
class CurrentPlantData extends Component {

    componentDidMount = () =>{
        this.props.itemStore.getDataFromDB()
    }
    makeCurrentTemp = () =>{
        let currentTemp = this.props.itemStore.plants.map(d =>(d.c))
        return (currentTemp[currentTemp.length-1])
    }
    makeCurrentHumadity = () =>{
        let currentH = this.props.itemStore.plants.map(d =>(d.h))
        return (currentH[currentH.length-1])
    }
    makeCurrentMoist = () =>{
        let currentM = this.props.itemStore.plants.map(d =>(d.m))
        return (currentM[currentM.length-1])
    }
    makeCurrentTime = () =>{
        let currentT = this.props.itemStore.plants.map(d =>(d.timestamp))
        return (currentT[currentT.length-1])
    }


    render() { 
        return (
            <div id="badges-container">
                <div className={this.makeCurrentTemp() > this.props.plantsStore.getBasilMaxTemp? "hot": "cold"} >
                    <i class="fas fa-thermometer-three-quarters"></i>
              <div >TEMP</div>
              <div>{Math.round(this.makeCurrentTemp())}&deg;</div>
              </div>

              <div>
              <i class="fas fa-water"></i>
              <div>HUMIDITY</div>
                <div>{Math.round(this.makeCurrentHumadity())}%</div>
              </div>

            <div>
            <i class="fas fa-leaf"></i>
              <div>MOIST</div>      
                <div>{Math.round(this.makeCurrentMoist())}%</div>
              </div>
            </div> 
         );
    }
}
 
export default CurrentPlantData;