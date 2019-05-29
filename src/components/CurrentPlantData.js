import React, { Component } from 'react';
import { observer, inject } from "mobx-react";



@inject("itemStore")
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
            <div>
              <div>  CURRENT TEMP == {this.makeCurrentTemp()}</div>
              <div>CURRENT HUMADITY == {this.makeCurrentHumadity()}</div>
              <div>CURRENT HUMADITY == {this.makeCurrentMoist()}</div>      
              <div>CURRENT Time== {this. makeCurrentTime()}</div>      

                        </div> 
         );
    }
}
 
export default CurrentPlantData;