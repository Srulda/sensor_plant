import React, { Component } from 'react';
import "../style/landing.css";
import {Link} from "react-router-dom";


class Landing extends Component {
    

render() {
        return (

            <div>
                <h1>Plan-T &deg; </h1>
            <div id="log-container">
        <div className="log-btn"><Link to = "/login">Login</Link></div>               
        <div className="log-btn"><Link to = "/signUp">Sign Up</Link></div>             
</div>
</div>
        )
    }
}

export default Landing;



