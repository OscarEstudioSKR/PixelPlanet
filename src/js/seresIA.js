import React, { Component } from 'react';
import { db } from './db.js';
import { obtenerRuta} from './algoritmoAEstrella.js';
import { idToPos, posToId, direccionMirada} from './tabla.js';


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

                    //Si no esta en el paso intermedio va a el
                    if(posToId(ser.pos) !== posToId(ser.posIntermedia)){


                        darPasoDireccion(ser, ser.direccionMov);
                        
                        if(ser.ruta.length>0){
                            ser.posIntermedia = idToPos(ser.ruta[0]);
                        }else{
                            ser.posIntermedia = ser.pos;
                        }
                    }else{
                        //Ha llegado al paso intermedio
                        ser.ruta.shift();
                        ser.posIntermedia = idToPos(ser.ruta[0]);
                        ser.direccionMov = direccionMirada(posToId(ser.pos), posToId(ser.posIntermedia));
                        darPasoDireccion(ser, ser.direccionMov);
                    }
                }else{
                    //Quiere una nueva ruta
                    ser.ruta = obtenerRuta(ser, ser.pos, ser.dest);
                    ser.posIntermedia = ser.ruta[0];
                }
            }else{
                //Cambio de acción
                ser.dest = idToPos(Math.floor(Math.random()*(db.config.numCasillas*db.config.numCasillas)));

            }
        }
        function darPasoDireccion(ser, direccion){
            let vel = (db.config.tamCasilla/4)/db.config.tamCasilla;
            
            switch (direccion) {
                case 1:
                    ser.pos[1] -= vel;
                    break;
                case 2:
                    ser.pos[1] -= vel;
                    ser.pos[0] += vel;
                    break;
                case 3:
                    ser.pos[0] += vel;
                    break; 
                case 4:
                    ser.pos[0] += vel;
                    ser.pos[1] += vel;
                    break; 
                case 5:
                    ser.pos[1] += vel;
                    break;   
                case 6:
                    ser.pos[1] += vel;
                    ser.pos[0] -= vel;
                    break;
                case 7:
                    ser.pos[0] -= vel;
                    break;
                case 8:
                    ser.pos[0] -= vel;
                    ser.pos[1] -= vel;
                    break;      
                default:
                    break;
            }
        }


        //BUCLE DEL PERSONAJE
        setInterval(() => {
            this.setState({
                'vivido': this.state.vivido++,
            })
            init(this.state);
          },Math.abs( 100-db.seres[this.state.id].velocidad*10) );
        
        
    }

    
    render() {
        let ser = db.seres[this.state.id];
        let styleSer = {
            'position': 'absolute',
            'zIndex': 2,
            'left': ser.pos[0]*this.state.tam,
            'top': ser.pos[1]*this.state.tam,
            'height': this.state.tam,
            'width': this.state.tam,
            'background': ser.color,
            'border': "1px solid",
            'borderColor': ser.color,
            'borderRadius': '50%',
            'textAlign': 'center',
        }


        return (
            <div style={styleSer}>
                
                {
                    ser.ruta.map((pos, i)=>{
                    if(pos != posToId(ser.pos)){
                        return <div style={{
                            'position': 'absolute',
                            'zIndex': 1,
                            'left': ((idToPos(pos)[0]-ser.pos[0])*this.state.tam)+this.state.tam/3,
                            'top': ((idToPos(pos)[1]-ser.pos[1])*this.state.tam)+this.state.tam/3,
                            'height': this.state.tam/4,
                            'width': this.state.tam/4,
                            'borderRadius': '50%',
                            'background': ser.color,
                        }} key={pos+'-'+i}></div>
                    }})
                }

                <div style={{'marginTop': '30%'}}>{ser.ruta[ser.ruta.length-1]}</div>
                
            </div>
        )
    }
  }
  