import React, { Component } from 'react';
import { db } from './db.js';
import { obtenerRuta} from './algoritmoAEstrella.js';
import { idToPos, posToId} from './tabla.js';


export class DibujarSeres extends Component {
    constructor(props){
        super(props);

        this.state = {
            'id': this.props.ser.id,
            'tam': db.config.tamCasilla,
            'vivido': 0,
            'posIntermedia': this.props.ser.posIntermedia,
        }

        function init(state){
            let ser = db.seres[state.id];
            
            //Esta en su destino
            if(posToId(ser.pos) !== posToId(ser.dest) ){
                //Hay ruta?
                if(ser.ruta.length > 0 ){
                    //Hay un paso intermedio. Se usará para mover pixel a pixel y no por cuadrícula.
                    if(state.pos !== state.posIntermedia){
                        ser.pos = ser.posIntermedia; //Cambiar por movimiento en pixeles y no en cuadrícula pos[0] this.state.velocidad/100

                        ser.ruta.shift();
                        if(ser.ruta.length>0){
                            ser.posIntermedia = idToPos(ser.ruta[0]);
                        }else{
                            ser.posIntermedia = ser.dest;
                        }
                    }
                }else{
                    //Quiere una nueva ruta
                    ser.ruta = obtenerRuta(ser, ser.pos, ser.dest);
                    ser.posIntermedia = ser.ruta[1];
                }
            }else{
                //Cambio de acción
                ser.dest = [Math.floor(Math.random()*29), Math.floor(Math.random()*29)];

            }
        }



        //BUCLE DEL PERSONAJE
        setInterval(() => {
            this.setState({
                'vivido': this.state.vivido++,
            })
            init(this.state);
          }, 548);
        
        
    }

    
    render() {
        let ser = db.seres[this.state.id];
        let styleSer = {
            'position': 'fixed',
            'zIndex': 2,
            'left': ser.pos[0]*this.state.tam,
            'top': ser.pos[1]*this.state.tam,
            'height': this.state.tam,
            'width': this.state.tam,
            'background': ser.color,
            'border': "1px solid",
            'borderColor': ser.color,
            'borderRadius': '50%',
        }


        return (
            <div style={styleSer}>
                <div>{this.state.id}</div>

                {ser.ruta.map((pos)=>{
                    return <div style={{
                        'position': 'fixed',
                        'zIndex': 1,
                        'left': (idToPos(pos)[0]*this.state.tam)+this.state.tam/3,
                        'top': (idToPos(pos)[1]*this.state.tam)+this.state.tam/3,
                        'height': this.state.tam/4,
                        'width': this.state.tam/4,
                        'borderRadius': '50%',
                        'background': ser.color,
                    }}></div>
                })}

                
            </div>
        )
    }
  }
  