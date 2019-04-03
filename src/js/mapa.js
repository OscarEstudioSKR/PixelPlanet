import React, { Component } from 'react';
import { db } from './db.js';

class DibujarMapa extends Component {
    constructor(props){
        super(props);

        this.state = {
            'obj': this.props.obj.id
        }
    }

    render() {
        let ser = db.tabla[this.state.obj];
        let imgPos = ()=>{
            let x = (ser.posImg[0]*db.config.tamCasilla)/200;
            let y = (ser.posImg[1]*db.config.tamCasilla)/200;
            return x+'px '+y+'px';
        }

        let styleCasilla = {
            'position': 'absolute',
            'left': ser.pos[0]*db.config.tamCasilla,
            'top': ser.pos[1]*db.config.tamCasilla,
            'height': db.config.tamCasilla,
            'width': db.config.tamCasilla,

            'backgroundImage': 'url('+ser.imgSuelo+')',
            'backgroundPosition': imgPos(),
            'backgroundSize': db.config.tamCasilla*6,
            
        }

        return (
            <div style={styleCasilla}/>
        )
    }
  }
  
  export default DibujarMapa;