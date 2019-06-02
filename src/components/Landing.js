import React, { Component } from 'react';
import "../style/landing.css";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";

class Landing extends Component {

render() {
        return (
            <div>
        <Link to = "/login"><button>Login</button></Link>                 
        <Link to = "/signUp"><button>Sign Up</button></Link>                 
</div>
        )
    }
}

export default Landing;

