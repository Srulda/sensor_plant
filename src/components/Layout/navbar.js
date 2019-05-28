import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../style/navbar.css";

class Navbar extends Component {
  render() {
    return (
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
    );
  }
}

export default Navbar;
