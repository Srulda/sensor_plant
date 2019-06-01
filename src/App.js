import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { observer, inject } from "mobx-react";
import DevTools from "mobx-react-devtools";
import "./style/App.css";
import Plants from "./components/Plants";
import Home from "./components/Home";
import Navbar from "./components/Layout/navbar";
import PersonalDash from "./components/PersonalDash";

@inject("itemStore", "plantsStore")
@observer
class App extends Component {
  
  componentDidMount = async () =>{
    await this.props.plantsStore.getDataFromDB()
    // await this.props.itemStore.getDataFromDB()
 }

  render() {
    return (
      <div className="App">
        <DevTools />

        <Router>
        < Navbar />
          <Route exact path="/" component={Home} />
          <Route exact path="/plants" component={Plants} />
          <Route exact path="/dashboard" component={PersonalDash} />

        </Router>
      </div>
    );
  }
}

export default App;
