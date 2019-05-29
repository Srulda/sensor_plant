import React, { Component } from "react";
import { observer, inject } from "mobx-react";
@inject("PlantsStore")
@observer
class Plant extends Component {
    
  render() {
    return <div>each plant(item)</div>;
  }
}

export default Plant;
