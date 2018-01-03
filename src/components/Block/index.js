import React, { Component } from 'react';
import './index.css'

export default class Block extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.marginLeft = Math.ceil(Math.random() * 10) * 10
    }
    render() {
        return (
            <div className='block' style={{ marginLeft: this.marginLeft }}>

            </div>
        )
    }
}