import React, { Component } from 'react';
import { observer, inject } from "mobx-react";

@inject("itemStore", "plantsStore")
@observer
class ComparisonData extends Component {


       
    
 

    makeCurrentTemp = () =>{
        let currentTemp = this.props.itemStore.plants.map(d =>(d.c))
        return (currentTemp[currentTemp.length-1])
        
    }

    


    render() { 
        let data = this.props.plantsStore.getDataFromDB().then(data => {
            console.log (data);
        })
        let planet = this.props.plantsStore
        return (
            <div>
            <h3>Max - {Math.round(planet.getBasilMaxTemp)}&deg;</h3>
            <h3>Min - {Math.round(planet.getBasilMinTemp)}&deg;</h3>
            { this.makeCurrentTemp() > planet.getBasilMaxTemp?<div className="higher">to hot</div>:
               <div className="lower">to cold</div>
        }
            </div>
          )
    }
}
 
export default ComparisonData;