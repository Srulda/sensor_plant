import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import CurrentPlantData from "./CurrentPlantData";
import Loading from "./Layout/Loading";
import "../style/personalDash.css"


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
    // await this.props.itemStore.getDataFromDB();
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
          </div>
        )}

      </div>
    );
  }
}

export default PersonalDash;
