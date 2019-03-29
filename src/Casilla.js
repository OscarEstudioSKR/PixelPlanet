import React, { Component } from 'react';
import './Casilla.css';

class Casilla extends Component {
    constructor(props){
        super(props);

        this.state = {
            casilla: this.props.casilla,
            tam: this.props.config.tamCasilla
            
        }

    }


  render() {

    let background= 'none';
    if(this.state.casilla.obstaculo === true){
      background = 'gray';
    }
    let style={
        'left': this.state.casilla.pos[0]*this.state.tam+'px',
        'top': this.state.casilla.pos[1]*this.state.tam+'px',
        'width': this.state.tam+'px',
        'height': this.state.tam+'px',
        'background': background
      }

    return (
      <div style={style} className="contenedor-casilla">
        <p className="id">{this.state.casilla.id}</p>
        <p className="f">{this.state.casilla.f}</p>
        <p className="g">{this.state.casilla.g}</p>
        <p className="h">{this.state.casilla.h}</p>
      </div>
    );
  }
}

export default Casilla;
