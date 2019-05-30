import React, { Component } from 'react';
import { observer, inject } from "mobx-react";

@inject("plantsStore")
@observer

class TempPopUp extends Component {
    render() { 
        return ( 
            <div>
                Your Room Temp Should Be Between {Math.round(this.props.plantsStore.getBasilMinTemp)}&deg;
                 - {Math.round( this.props.plantsStore.getBasilMaxTemp)}&deg;
            </div>
         )
    }
}
 
export default TempPopUp;