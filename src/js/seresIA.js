import React, { Component } from 'react';
import { db } from './db.js';
import { obtenerRuta} from './algoritmoAEstrella.js';
import { idToPos, posToId, direccionMirada, ran, distAB} from './tabla.js';



export class DibujarSeres extends Component {
    constructor(props){
        super(props);

        this.state = {
            'id': this.props.ser.id,
            'tam': db.config.tamCasilla,
            'vivido': 0,
            'posIntermedia': this.props.ser.posIntermedia,
        }


        function mejorValoracion(arr, dest){
            let calcular = (obj, mem)=>{ return (obj.especifica + mem.satisfaccionGeneral + distAB( obj.idPos , posToId( dest )))/3;};         
            let memFinal = {
                'id': 0,
                'mejorIdEspecifica': 0,
                'valorFinal': 0,
            }
            arr.map((mem)=>{
                mem.satisfaccionEspecifica.map((obj)=>{
                    if( calcular( obj, mem) > memFinal.valorFinal ){
                        memFinal = {
                            'id': mem.id,
                            'mejorIdEspecifica': obj.id,
                            'valorFinal': calcular( obj, mem ),
                        }
                    }
                });
            });
            return memFinal;
        }


        function init(state){
            let ser = db.seres[state.id];


            //Estado iniciada?
            if(ser.estado != "" && ser.objetivoEnMarcha === false){
                console.log(ser.nombre+' esta '+ser.estado);

                //Buscar la mejor tarea posible
                if(ser.tareaCalculada === false){
                    let listaMemoriasCompatibles = ser.memoria.filter((memCal)=>{      
                        return memCal.detonante === ser.estado;
                    });
                    let memFinal = mejorValoracion(listaMemoriasCompatibles, ser.dest);

                    if( memFinal.valorFinal > 0 ){
                        db.seres[state.id].memoriActiva = memFinal;
                        db.seres[state.id].tareaCalculada = true;
                        db.seres[state.id].accion = ser.memoria[ser.memoriActiva.id].accion;
                        console.log('Sabe que hacer '+ser.accion);
                    }else{

                        //No hay memoria posible
                        console.log('No tiene en memoria una solución - Buscar');

                    }           
                }                
                    //Realizando acciones calculadas de la memoria  
                db.seres[state.id].dest = idToPos(ser.memoria[ser.memoriActiva.id].satisfaccionEspecifica[ser.memoriActiva.mejorIdEspecifica].idPos);
                db.seres[state.id].objetivoEnMarcha = true;
                console.log('Iniciando accion, nuevo destino en '+posToId(ser.dest));

            }else if(ser.estado === ""){

                console.log('Comprobando necesidades');
                //Comprobar necesidades
                db.seres[state.id].necesidad = db.listaNecesidades.filter((necesidad)=>{
                    return necesidad.requisito(ser);
                })
                //Tiene necesidades
                if( ser.necesidad.length>0){
                    console.log('Tiene necesidades');
                    ser.estado =  ser.necesidad[0].accion;
                }
                //No tiene necesidades -> Deseos?
                else{
                    console.log('Cumpliendo deseos');
                }
                
            }


            //Esta en su destino
            if(posToId(ser.pos) !== posToId(ser.dest) ){
                //Hay ruta?
                if(ser.ruta.length > 0 ){
                    
                    //Si no esta en el paso intermedio va a el
                    if(posToId(ser.pos) !== posToId(ser.posIntermedia)){

                        darPasoDireccion(ser, ser.direccionMov);
                        console.log(ser.accion+' a '+ posToId(ser.dest)+'...');
                        if(ser.ruta.length>0){
                            ser.posIntermedia = idToPos(ser.ruta[0]);
                        }
                    }else{
                        //Ha llegado al paso intermedio
                        ser.ruta.shift();
                        if(ser.ruta.length > 0 ){
                            ser.posIntermedia = idToPos(ser.ruta[0]);
                            ser.direccionMov = direccionMirada(posToId(ser.pos), posToId(ser.posIntermedia));
                            darPasoDireccion(ser, ser.direccionMov);
                        }else{
                            ser.posIntermedia = ser.pos;
                        }
                        
                    }
                }else{
                    //Quiere una nueva ruta
                    console.log(ser.nombre+' Buscando una nueva ruta');
                    ser.ruta = obtenerRuta(ser, ser.pos, ser.dest);
                    if(ser.ruta.length > 0 ){
                        ser.posIntermedia = idToPos(ser.ruta[0]);
                    }
                }
            }else{
                //Ha llegado a su destino
                console.log(ser.nombre+ ' ha llegado a su destino '+ posToId(ser.dest)+ ' para '+ ser.accion);
                
                
            }
        }
        function darPasoDireccion(ser, direccion){
            let vel = (db.config.tamCasilla/4)/db.config.tamCasilla;

            if(ran(0, db.tabla[posToId( db.seres[ser.id].posIntermedia )].penalizacionMov) < ser.velocidad ||
            ran(0,10)>7){//velocidad minima
            
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
            'backgroundPosition': ser.posImg,
            'backgroundSize': db.config.tamCasilla*6,
        }


        return (
            <div style={styleSer}>
                {ser.estado}
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
                
            </div>
        )
    }
  }
  