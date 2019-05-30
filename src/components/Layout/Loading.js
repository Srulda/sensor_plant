import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import "../../style/loading.css"
@inject("generalStore")
@observer
class Loading extends Component {
  render() {
    return (
      <div class="spinner">
        <div class="dot1" />
        <div class="dot2" />
      </div>
    );
  }
}

export default Loading;
