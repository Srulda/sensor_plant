import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { observer, inject } from "mobx-react";
import DevTools from "mobx-react-devtools";
import "./style/App.css";
import Plants from "./components/Plants";
import Plant from "./components/Plant";
import Navbar from "./components/Layout/navbar";
import Home from "./components/Home";
import Analytics from "./components/Analytics";

@observer
class App extends Component {
  render() {
    return (
      <div className="App">
        <DevTools />
        <Router>
        < Navbar />
          <Route exact path="/" component={Home} />
          <Route exact path="/plants" component={Plants} />
          <Route exact path="/analytics" component={Analytics} />
          <Route exact path="/plant" component={Plant} />
        </Router>
      </div>
    );
  }
}

export default App;
