import React, { Component } from 'react';
import Plant from './Plant';

class Plants extends Component {
    render() {
        return (
            <div>
                My Plants:
                <Plant />
            </div>
        );
    }
}

export default Plants;