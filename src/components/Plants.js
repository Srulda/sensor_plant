import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import Plant from './Plant';


@inject("generalStore", "plantsStore")
@observer
class Plants extends Component {
  render() {
    let data = this.props.plantsStore.getDataFromDB().then(data => {
      console.log(data);
    });

    return (
    <div>
      sfsd
  </div>
)
  }
}

export default Plants;
