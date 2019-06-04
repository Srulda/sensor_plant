import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { observer, inject } from "mobx-react";
import DevTools from "mobx-react-devtools";
import "./style/App.css";
import Plants from "./components/Plants";
import Home from "./components/Home";
import Navbar from "./components/Layout/navbar";
import PersonalDash from "./components/PersonalDash";
import Landing from "./components/Landing";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

@inject("itemStore", "plantsStore", "user")
@observer
class App extends Component {
  
  componentDidMount = async () =>{
    await this.props.plantsStore.getDataFromDB()
    // await this.props.itemStore.getDataFromDB()
 }

  render() {
    const loggedIn = this.props.user.loggedIn
    return (
      <div className="App">
        <DevTools />
      {sessionStorage.getItem("currentLogin") 
                  ? 
    (<Router>
        < Navbar />
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/plants" component={Plants} />
        <Route exact path="/dashboard" component={PersonalDash} />
        </Router>)
                   :
                (   <Router>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signUp" component={SignUp} />  
             </Router>)
    }
      </div>
    );
  }
}

export default App;

