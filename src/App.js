import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { observer, inject } from "mobx-react";
import DevTools from "mobx-react-devtools";
import "./style/App.css";
import Plants from "./components/Plants";
import Plant from "./components/Plant";
import Navbar from "./components/Layout/navbar";

@observer
class App extends Component {
  render() {
    return (
      <div className="App">
        <DevTools />
        <Router>
          <Route path="/" component={Navbar} />
          <Route exact path="/Plants" component={Plants} />
          <Route exact path="/Plant" component={Plant} />
        </Router>
      </div>
    );
  }
}

export default App;
