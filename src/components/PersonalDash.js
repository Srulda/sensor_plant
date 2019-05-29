import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import TempOverTime from './TempOverTime';
import CurrentPlantData from './CurrentPlantData';
import ComparisonData from './ComparisonData'
import TempPopUp from './TempPopUp'

@inject("itemStore", "plantsStore")
@observer
class PersonalDash extends Component {
  componentDidMount = async () =>{
    await this.props.plantsStore.getDataFromDB()
    await this.props.itemStore.getDataFromDB()
 }
        


    render() {
        
        
        return (
      <div>
          <CurrentPlantData />
        <TempOverTime />  
        <ComparisonData />
        <TempPopUp />
      </div>
            
        )
    }
}


export default PersonalDash;