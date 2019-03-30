import React, { Component } from 'react';
import { db } from './db.js';

export class DibujarSeres extends Component {
    constructor(props){
        super(props);

        this.state = {
            'ser': this.props.ser,
            'tam': db.config.tamCasilla,
        }
    }

    render() {
        let styleSer = {
            'position': 'fixed',
            'zIndex': 2,
            'left': this.state.ser.pos[0]*this.state.tam,
            'top': this.state.ser.pos[1]*this.state.tam,
            'height': this.state.tam,
            'width': this.state.tam,
            'background': 'green',
            'border': '1px solid gray',
            'borderRadius': '50%',
        }
        return (
            <div style={styleSer}>
                <div></div>
            </div>
        )
    }
  }
  