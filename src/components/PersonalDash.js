import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import TempOverTime from "./TempOverTime";
import CurrentPlantData from "./CurrentPlantData";
import TempPopUp from "./TempPopUp";
import HumidPopUp from "./TempPopUp";
import MoistPopUp from "./TempPopUp";
import Loading from "./Layout/Loading";

@inject("itemStore", "plantsStore")
@observer
class PersonalDash extends Component {
  componentDidMount = async () => {
    await this.props.plantsStore.getDataFromDB();
    await this.props.itemStore.getDataFromDB();
  };

  render() {
    const loading = this.state.loading;
    return (
      <div>
        <CurrentPlantData />
        <TempOverTime />
        <TempPopUp />
        <HumidPopUp />
        <MoistPopUp />
      </div>
    );
  }
}

export default PersonalDash;
