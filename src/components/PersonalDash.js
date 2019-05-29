import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import TempOverTime from './TempOverTime';
import CurrentPlantData from './CurrentPlantData';
import ComparisonData from './ComparisonData'

@inject("itemStore")
@observer
class PersonalDash extends Component {
   
        


    render() {
        
        
        return (
      <div>
          <CurrentPlantData />
        <TempOverTime />  
        <ComparisonData />
        
      </div>
            
        )
    }
}


export default PersonalDash;