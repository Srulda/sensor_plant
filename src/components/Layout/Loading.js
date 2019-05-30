import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import "../../style/loading.css"
@inject("generalStore")
@observer
class Loading extends Component {
  render() {
    return (
      <div className="spinner">
        <div className="dot1" />
        <div className="dot2" />
      </div>
    );
  }
}

export default Loading;
