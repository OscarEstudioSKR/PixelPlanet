import React, { Component } from 'react';
import { db } from './db.js';
import menuSeresIma from '../recurse/menuSeresIma.png';


class MenuSer extends Component {
    constructor(props){
        super(props);

        this.state = {
            'id': this.props.ser.id,
            'setStatePadre': ()=>{this.props.state.cambiarMenu(-1)},
        }

    }

righ
    
    render() {
        let ser = db.seres[this.state.id]; 
        let style = {
            'position': 'fixed',
            'zIndex': 10,
            'top': '7%',
            'right': '0',
            'height': '85vh',
            'width': '51vh',
            'color': 'white',
            'fontSize': '1em',
            'textAlign': 'center',

            'backgroundImage': 'url('+menuSeresIma+')',
            'backgroundSize': '100%',
        }


        return (
            <div style={style}>     
                <a onClick={(event)=>this.state.setStatePadre()}>CERRAR</a><br/><br/>
                {ser.nombre +' (Familia '+ser.familia+')' }<br/>
                {'Hogar '+ser.hogar}

            </div>
        )
    }
  }

  export default MenuSer;