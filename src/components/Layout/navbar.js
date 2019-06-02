import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../style/navbar.css";

class Navbar extends Component {
  render() {
    return (
      <div>
        <div className="navbar">
          <Link to="/home">
            <span>
              <i className="fas fa-home" />
            </span>
          </Link>
          <Link to="/plants">
            <span>
              <i className="fab fa-pagelines" />
            </span>
          </Link>
          <Link to="/dashboard">
            <span>
              <i className="fas fa-tachometer-alt" />
            </span>
          </Link>
        </div>
      </div>
    );
  }
}

export default Navbar;
