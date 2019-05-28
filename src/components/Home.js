import React, { Component } from 'react';
import {Link} from "react-router-dom";

class Home extends Component {

login = () => console.log("logged in")

    render() {
        return (
            <div>
                <Link to="/plants" id="plants">Plants</Link>
                <Link to="/plant" id="plant">Plant</Link>
                <Link to="/information" id="information">Information</Link>
                <div id = "login" onClick = {this.login}>Log-in</div>
            </div>
        );
    }
}

export default Home;

