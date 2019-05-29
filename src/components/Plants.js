
import React, { Component } from "react";
import { observer, inject } from "mobx-react";
@inject("generalStore", "plantsStore")
@observer
class Plants extends Component {
  render() {
    let data = this.props.plantsStore.getDataFromDB().then(data => {
      console.log(data);
    });

    return <div>many rows of Plants</div>;
  }
}

export default Plants;
