import React, { Component } from 'react';
import { db } from './db.js';
import { obtenerRuta} from './algoritmoAEstrella.js';
import { idToPos} from './tabla.js';


export class DibujarSeres extends Component {
    constructor(props){
        super(props);

        this.state = {
            'id': this.props.ser.id,
            'pos': this.props.ser.pos,
            'ser': this.props.ser,
            'tam': db.config.tamCasilla,
            'velocidad': this.props.ser.velocidad,
            'vivido': 0,
            'dest': this.props.ser.dest,
            'ruta': this.props.ser.ruta,
            'posIntermedia': this.props.ser.posIntermedia,
        }

        function init(state){
            let ser = db.seres[state.id];
            
            //Esta en su destino
            if(ser.pos !== ser.dest ){
                //Hay ruta?
                if(ser.ruta.length > 0 ){
                    //Hay un paso intermedio. Se usará para mover pixel a pixel y no por cuadrícula.
                    if(state.pos !== state.posIntermedia){
                        ser.pos = ser.posIntermedia; //Cambiar por movimiento en pixeles y no en cuadrícula pos[0]+(velocidad)

                        ser.ruta.shift();
                        if(ser.ruta.length>0){
                            ser.posIntermedia = idToPos(ser.ruta[0]);
                        }else{
                            ser.posIntermedia = ser.dest;
                        }
                    }
                }else{
                    //Quiere una nueva ruta
                    ser.ruta = obtenerRuta(state.pos, state.dest);
                    ser.posIntermedia = ser.ruta[0];
                }
            }else{
                //Cambio de acción
                ser.dest = [Math.floor(Math.random()*30), Math.floor(Math.random()*30)];
                
                console.log('Lucy: Nuevo destino '+ser.dest+'<');
            }
        }



        //BUCLE DEL PERSONAJE
        setInterval(() => {
            this.setState({
                'vivido': this.state.vivido++,
            })
            init(this.state);
            //db.seres[this.state.id].pos[0] += this.state.velocidad/100;
          }, 548);
        
        
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
                <div>{this.state.id}</div>
            </div>
        )
    }
  }
  