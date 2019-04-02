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
        let imgPos = ()=>{
            let x = (this.state.obj.posImg[0]*db.config.tamCasilla)/200;
            let y = (this.state.obj.posImg[1]*db.config.tamCasilla)/200;
            return x+'px '+y+'px';
        }

        let styleCasilla = {
            'position': 'absolute',
            'left': this.state.obj.pos[0]*this.state.tam,
            'top': this.state.obj.pos[1]*this.state.tam,
            'height': this.state.tam,
            'width': this.state.tam,

            'backgroundImage': 'url('+this.state.obj.imgSuelo+')',
            'backgroundPosition': imgPos(),
            'backgroundSize': db.config.tamCasilla*6,
            
        }

        return (
            <div style={styleCasilla}/>
        )
    }
  }
  
  export default DibujarMapa;