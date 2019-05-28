import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Plants from './components/Plants';
import Plant from './components/Plant';
import Home from './components/Home';

class App extends Component {
  render() {
    return (
      <div>
          <Router>
        <Route path="/" component={Home} />
        <Route exact path="/Plants" component={Plants} />
        <Route exact path="/Plant" component={Plant} />
      </Router>


      </div>
    );
  }
}

export default App;
