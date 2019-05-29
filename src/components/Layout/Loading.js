import React, { Component } from "react";
import { observer, inject } from "mobx-react";
@inject("generalStore")
@obeserver
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
