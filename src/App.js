import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { observer, inject } from "mobx-react";
import DevTools from "mobx-react-devtools";
import "./style/App.css";
import Plants from "./components/Plants";
import Home from "./components/Home";
import Navbar from "./components/Layout/navbar";
import Backgrund from "./components/Layout/Background";
import PersonalDash from "./components/PersonalDash";
@observer
class App extends Component {
  render() {
    return (
      <div className="App">
        <DevTools />

        <Router>
          <Route path="/" component={Navbar} />
          <Route path="/" component={Backgrund} />
          <Route exact path="/dashboard" component={PersonalDash}/>
          <Route exact path="/Home" component={Home} />
          <Route exact path="/Plants" component={Plants} />
        </Router>
      </div>
    );
  }
}

export default App;
