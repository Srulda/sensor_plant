import React, { Component } from "react";
import { Link } from "react-router-dom";
import { inject } from "mobx-react";
import "../../style/navbar.css";

@inject("user")
class Navbar extends Component {

logOut = () =>{
  sessionStorage.removeItem('currentLogin')
  sessionStorage.removeItem('plantId')
  window.location = `http://localhost:3000/`;
}

  render() {
    let user =JSON.parse(sessionStorage.getItem('currentLogin'))
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
          <div className = "helloAndLogout">
          <div><span id = "hello">Hello {user.userName} !</span>
            </div>
            <div> <span id = "logOut" onClick = {this.logOut}>
            <i className="fas fa-sign-out-alt" />
            </span>
              </div>  
          
          </div>
           
        </div>
      </div>
    );
  }
}

export default Navbar;
