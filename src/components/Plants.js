import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import Loading from "./Layout/Loading";
import Plant from './Plant'

@inject("itemStore", "plantsStore")
@observer
class Plants extends Component {
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
    return <div>{loading ? <Loading /> : <div>

      {this.props.plantsStore.plants.map(d=> <Plant data={d}/>)} 
    </div>}</div>;
  }
}

export default Plants;
