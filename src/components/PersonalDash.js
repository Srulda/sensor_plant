import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import TempOverTime from "./TempOverTime";
import CurrentPlantData from "./CurrentPlantData";
import TempPopUp from "./TempPopUp";
import HumidPopUp from "./HumidPopUp";
import MoistPopUp from "./MoistPopUp";
import Loading from "./Layout/Loading";

@inject("itemStore", "plantsStore")
@observer
class PersonalDash extends Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }

  componentDidMount = async () => {
    await this.props.plantsStore.getDataFromDB();
    await this.props.itemStore.getDataFromDB();
    this.setState({
      loading: false
    });
  };
  render() {
    const loading = this.state.loading;
    return (
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div>
            <CurrentPlantData />
            <TempOverTime />
            <TempPopUp />
            <HumidPopUp />
            <MoistPopUp />
          </div>
        )}
      </div>
    );
  }
}

export default PersonalDash;
