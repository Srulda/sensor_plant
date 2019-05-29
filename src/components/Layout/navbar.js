import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../style/navbar.css";

class Navbar extends Component {
  render() {
    return (
      <div>
         <div className="navbar">
        <Link to="/">
          <span>Home</span>
        </Link>
        <Link to="/plants">
          <span>Plants</span>
        </Link>
        <Link to="/dashboard">
          <span>Analytics</span>
        </Link>
        
      </div>
      </div>
    );
  }
}

export default Navbar;
