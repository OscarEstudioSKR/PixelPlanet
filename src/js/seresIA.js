import React, { Component } from 'react';
import { db } from './db.js';
import '../css/seresIA.css';
import { obtenerRuta} from './algoritmoAEstrella.js';
import { idToPos, posToId, direccionMirada, ran, distAB} from './tabla.js';
import { isNullOrUndefined } from 'util';



export class DibujarSeres extends Component {
    constructor(props){
        super(props);

        this.state = {
            'id': this.props.ser.id,
            'tam': db.config.tamCasilla,
            'vivido': 0,
            'posIntermedia': this.props.ser.posIntermedia,
        }


        //Calcula cual es la mejor valoración de una array de memorias
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
            let comprobarNecesidades = [];
            let listaMemoriasCompatibles = [];
            let memFinal = {};

            //NO TIENE NECESIDADES ACTIVAS
            if(ser.necesidadActivada === false){

                console.log('Comprobando necesidades');
                comprobarNecesidades = db.listaNecesidades.filter((necesidad)=>{ return necesidad.requisito(ser); })
    
                //Si tiene necesidades
                if( comprobarNecesidades.length > 0){
                    console.log('Necesidad detectada '+comprobarNecesidades[0].estado);
                    db.seres[state.id].estado = comprobarNecesidades[0].estado;
    
                    //Ha CALCULADO UNA SOLUCIÓN
                    if(ser.tareaCalculada === false){
                        //NO, NO LO HA CALCULADO AUN
                        console.log('Calculando tarea...');
                        
                        //Bloquear siguiente paso
                        db.seres[state.id].objetivoEnMarcha = false;
    
                        //Calcula si tiene en memoria una solución
                        listaMemoriasCompatibles = ser.memoria.filter((memCal)=>{ return memCal.detonante === ser.estado;});
                        if( listaMemoriasCompatibles.length > 0){
    
                            //Si, tiene una solución
                            memFinal = mejorValoracion(listaMemoriasCompatibles, ser.dest);
    
                            //La solución es satisfactoria?
                            if( memFinal.valorFinal > 0 ){
    
                                //Si, es una solución váida.
                                db.seres[state.id].memoriActiva = memFinal;
                                db.seres[state.id].tareaCalculada = true;
                                db.seres[state.id].objetivoEnMarcha = true;
                                db.seres[state.id].necesidad = db.listaNecesidades.filter((necesidad)=>{ return necesidad.requisito(ser)})[0];
                                db.seres[state.id].estado = ser.necesidad.estado;
                                db.seres[state.id].accion = ser.necesidad.accion;
                                console.log('Sabe que hacer '+ser.estado);
                                db.seres[state.id].necesidadActivada = true;
    
                                //La solución encontrada no es satisfactoria
                            }else{
                                console.log('La solución encontrada no es satisfactoria');
                            }
    
                            //No tiene una solución
                        }else{
                            console.log('No conoce una solución');
                            //db.seres[state.id].estado = 'Explorando';
                        }
    
                        //SI, YA A CALCULADO UNA SOLUCIÓN
                    }else{
                        console.log('Tarea calculada con exito!');
                    }
    
                //No tiene necesidades
                }else{
                    console.log('No tiene necesidades');
                    db.seres[state.id].dest = idToPos(ran(0,500));
                    db.seres[state.id].objetivoEnMarcha = true;
                }
            }else{
                //tIENE ACTIVADA LA NECESIDAD

            }
           

            //TIENE YA UN OBJETIVO
            if(ser.objetivoEnMarcha === true){

                
                //Si no está en su destino se mueve hacia el
                if( posToId(ser.pos) !== posToId(ser.dest) ){
                    console.log('Moviendose...');
                    moverse(ser); 

                //Una vez llega a su destino    
                }else{
                    //HAY UN TIEMPO DE ACCIÓN DE LA TAREA EN MARCHA?
                    if(db.seres[state.id].tiempoAccion > 0){
                        console.log('Tick-tack: '+ser.tiempoAccion);
                        db.seres[state.id].tiempoAccion --;

                        //TIEMPO CUMPLIDO - CUMPLE LA ACCION Y CAMIBA A ESTADO NORMAL
                        if(db.seres[state.id].tiempoAccion === 0){
                            console.log(' y fin');
                            //Falta valorar si el lugar ha ofrecido lo que prometia
            
                            db.seres[state.id].objetivoEnMarcha = false;
                            db.seres[state.id].tareaCalculada = false;
                            db.seres[state.id].ruta = [];
                            db.seres[state.id].estado = '';
                            db.seres[state.id].accion = '';
                            db.seres[state.id].necesidad = {};
                            db.seres[state.id].necesidadActivada = false;
                        }
                    
                    //NO HAY TIEMPO DE ACCIÓN PERO SI UNA NECESIDAD QUE LO ACTIVA
                    }else if(ser.necesidadActivada){
                        
                        ser.memoria[ser.memoriActiva.id].obtiene(ser);
                        db.seres[state.id].estado = ser.necesidad.efecto;
                        db.seres[state.id].tiempoAccion = ser.necesidad.tiempoAccion;
                        db.seres[state.id].ruta = [];
                        db.seres[state.id].necesidad = {};
                        console.log(ser.nombre+ ' ha llegado a su destino '+ posToId(ser.dest)+ ' y esta '+ ser.estado);
                    }
                    else{
                        //RUTA ALCANZADA Y SIN NECESIDADES DE ACCIÓN
                        db.seres[state.id].tiempoAccion = ran(1,50);
                    }
                }            
            }
        }



        function moverse(ser){
            console.log('Moviendo...');

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
                console.log(ser.nombre+' Buscando una nueva ruta a '+posToId(ser.dest));
                ser.ruta = obtenerRuta(ser, ser.pos, ser.dest);
                if(ser.ruta.length > 0 ){
                    ser.posIntermedia = idToPos(ser.ruta[0]);
                }else{
                    //No ha podido obtener una ruta, 0 pasos encontrados.
                    console.log('No ha podido obtener una ruta, 0 pasos encontrados.')
                }
            }
        }


        function darPasoDireccion(ser, direccion){
            let vel = (db.config.tamCasilla/4)/db.config.tamCasilla;
            
            if(ran(0, db.tabla[posToId( db.seres[ser.id].posIntermedia )].penalizacionMov) < ser.velocidad ||
            ran(0,10)>7){//velocidad minima
            
            db.seres[ser.id].agotamiento += 1;

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
        if(ser.estado === 'Agotado'){ x = 400;
        }else if(ser.estado === 'Dormido'){ x = 800;
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
            <div style={styleSer} className="Seres">
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
  