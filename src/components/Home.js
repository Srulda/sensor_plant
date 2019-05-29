import React, { Component } from 'react';
import {Link} from "react-router-dom";

class Home extends Component {

login = () => console.log("logged in")

    render() {
        return (
            <div>
               <div className="navbar">
        <Link to="/">
          <span>Home</span>
        </Link>
        <Link to="/plants">
          <span>My Plants</span>
        </Link>
        <Link to="/analytics">
          <span>Analytics</span>
        </Link>
      </div>
            </div>
        );
    }
}

export default Home;

