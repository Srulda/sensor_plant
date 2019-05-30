import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import Plant from './Plant';


@inject("generalStore", "plantsStore")
import Loading from "./Layout/Loading";
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
    return <div>{loading ? <Loading /> : <div>hi !!!</div>}</div>;
  }
}

export default Plants;
