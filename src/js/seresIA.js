import React, { Component } from 'react';
import { db } from './db.js';
import '../css/seresIA.css';
import { obtenerRuta} from './algoritmoAEstrella.js';
import { idToPos, posToId, direccionMirada, ran, distAB} from './tabla.js';

import spriteMapaSuelo01 from '../recurse/SpritesTerreno01.jpg';
import spriteMapaSuelo02 from '../recurse/SpritesTerreno02.jpg';
import spriteMapaSuelo03 from '../recurse/SpritesTerreno03.jpg';
import personajes01 from '../recurse/Personajes01.png';


export class DibujarSeres extends Component {
    constructor(props){
        super(props);

        this.state = {
            'id': this.props.ser.id,
            'tam': db.config.tamCasilla,
            'vivido': 0,
            'posIntermedia': this.props.ser.posIntermedia,
            'setStatePadre': ()=>{this.props.state.cambiarMenu(this.props.ser.id)},
        }


        function init(state){
            let ser = db.seres[state.id];
            

            //TIENE YA UN OBJETIVO
            if(ser.dest != ser.pos){

                
                //Si no está en su destino se mueve hacia el
                if( posToId(ser.pos) !== posToId(ser.dest) ){
                    //console.log('Moviendose...');
                    moverse(ser); 

                //Una vez llega a su destino    
                }else{
                    //console.log('Ha llegado a su destino');
                }            
            }
        }



        function moverse(ser){
            //console.log('Moviendo...');

            if(ser.ruta.length > 0 ){              
                //Si no esta en el paso intermedio va a el
                if(posToId(ser.pos) !== posToId(ser.posIntermedia)){
                    darPasoDireccion(ser, ser.direccionMov);
                    //Siguen quedando pasos en la ruta, lo añade como paso intermedio
                    if(ser.ruta.length>0){
                        ser.posIntermedia = idToPos(ser.ruta[0]);
                    }
                //Ha llegado al paso intermedio
                }else{                  
                    ser.ruta.shift();
                    //Siguen quedando pasos
                    if(ser.ruta.length > 0 ){
                        ser.posIntermedia = idToPos(ser.ruta[0]);
                        ser.direccionMov = direccionMirada(posToId(ser.pos), posToId(ser.posIntermedia));
                        darPasoDireccion(ser, ser.direccionMov);
                    //No quedan pasos
                    }else{
                        ser.posIntermedia = ser.pos; 
                    }                     
                }

            //NO HAY RUTA    
            }else{
                //AÑADE UNA NUEVA RUTA HACIA EL DESTINO
                //console.log(ser.nombre+' Buscando una nueva ruta a '+posToId(ser.dest));
                ser.ruta = obtenerRuta(ser, ser.pos, ser.dest);
                if(ser.ruta.length > 0 ){
                    ser.posIntermedia = idToPos(ser.ruta[0]);
                }else{
                    //No ha podido obtener una ruta, 0 pasos encontrados.
                    //console.log('No ha podido obtener una ruta, 0 pasos encontrados.')
                }
            }
        }


        function darPasoDireccion(ser, direccion){
            let vel = (db.config.tamCasilla/4)/db.config.tamCasilla;
            
            if(ran(0, db.tabla[posToId( db.seres[ser.id].posIntermedia )].penalizacionMov) < ser.velocidad ||
            ran(0,10)>7){//velocidad minima
            
            db.seres[ser.id].agotamiento += 0.1;

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
    }


        //BUCLE DEL PERSONAJE
        setInterval(() => {
            this.setState({
                'vivido': this.state.vivido++
            })
            init(this.state);

          },100 );
        
        
    }

    cambioImagenAccion(ser){
        let x = 0;
        let y = 0;
        let propor = (200*db.config.tamCasilla)/40;
        let suelo = db.tabla[posToId(ser.posIntermedia)];
        if(suelo != null && suelo.imgSuelo === spriteMapaSuelo02 && suelo.posImg[1] <= 600 &&  suelo.posImg[1] > 0){
            y= propor*3;      
        }else if(ser.estado === 'Agotado'){ x= propor*1;
        }else if(ser.estado === 'Dormido'){ x= propor*2;
        }
        return x+'px '+y+'px';;
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

            'backgroundImage': 'url('+ser.img+')',
            'backgroundPosition': this.cambioImagenAccion(ser),
            'backgroundSize': db.config.tamCasilla*6,
        }


        return (
            <a style={styleSer} className="Seres" onClick={(event)=>this.state.setStatePadre()}>
                
                {/*
                    ser.ruta.map((pos, i)=>{
                    if(pos != posToId(ser.pos)){
                        return <div style={{
                            'position': 'absolute',
                            'left': ((idToPos(pos)[0]-ser.pos[0])*this.state.tam)+this.state.tam/3,
                            'top': ((idToPos(pos)[1]-ser.pos[1])*this.state.tam)+this.state.tam/3,
                            'height': this.state.tam/8,
                            'width': this.state.tam/8,
                            'background': ser.color,
                        }} key={pos+'-'+i}></div>
                    }})
                */}
                
            </a>
        )
    }
  }
  