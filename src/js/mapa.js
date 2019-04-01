import React, { Component } from 'react';
import { db } from './db.js';

class DibujarMapa extends Component {
    constructor(props){
        super(props);

        this.state = {
            'obj': this.props.obj,
            'tabla': db.tabla,
            'tam': db.config.tamCasilla,
        }
    }

    render() {
        let styleCasilla = {
            'position': 'absolute',
            'left': this.state.obj.pos[0]*this.state.tam,
            'top': this.state.obj.pos[1]*this.state.tam,
            'height': this.state.tam,
            'width': this.state.tam,
            'background': this.state.obj.obstaculo ? 'gray' : 'none',
            'border': '1px solid gray',
            
        }

        return (
            <div style={styleCasilla}>
            </div>
        )
    }
  }
  
  export default DibujarMapa;