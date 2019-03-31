//import { db } from './db.js';
import { distAB, direccionMirada, posToId, vecinos} from './tabla.js';
import { db } from './db.js';

export function obtenerRuta(ser, pos, dest){
    let listaCerrada = [];
    let posTemp = posToId(pos);
    let listaCalcular = [];
    let listaFinal = [];
    let listaAbierta = [
        {
        'id': posToId(pos),
        'g': costeBase( direccionMirada( posToId(pos), posToId(dest) )),
        'h': distAB( posToId( pos ),posToId( dest ) )*10,
        'f': costeBase( direccionMirada( dest, pos ))+(distAB( posToId( pos ),posToId( dest ) )*10)+ser.penalizacionMov,
        'padre': posToId(pos),

        }
    ];



    for(let i = 0; i < 10; i++){
        //1. Meter menor F de abierta a cerrada y eliminarlo. Cambiar posicion actual
        if( listaAbierta.length > 0 ){  
            posTemp = aCerrada( menorF( listaAbierta ), listaAbierta, listaCerrada).id;
            console.log('Lucy: Nueva posición '+posTemp+' a lista CERRADA ');
            console.log('Cerrada: '+JSON.stringify(listaCerrada));
        }

        //2. Almacenar vecinos en listaCalcular
        listaCalcular = vecinos(posTemp);
        console.log('Lucy: Nuevos vecinos de '+posTemp+' en listaCalcular: '+ JSON.stringify(listaCalcular));

        listaCalcular.map((obj)=>{
            console.log('Comprobando '+obj+'...');
            //2.1 Obj es el destino?
            if( obj === posToId( dest ) ){ 
                return console.log('Lucy: destino FINAL encontrado en '+obj);
            }
            //2.2 Si no está en lista cerrada y no es un obstaculo
            else if( listaCerrada.filter((objCerrada)=>{return objCerrada.id !== obj}) && db.tabla[obj].obstaculo === false){

                    //Está en la lista abierta
                    if(listaAbierta.filter( objAbierta => objAbierta.id === obj ).length>0){
                        return console.log(obj+' está en lista abierta: '+JSON.stringify(listaAbierta));


                    }else{
                        //No está en lista abierta, lo añade
                        
                        listaAbierta.push(
                            {
                                'id': obj,
                                'g': costeBase( direccionMirada( posToId(pos), obj )),
                                'h': distAB( obj ,posToId( dest ) )*10,
                                'f': costeBase( direccionMirada( posToId(pos), obj )) +  distAB( obj ,posToId( dest ) )*10 + db.tabla[obj].penalizacionMov,
                                'padre': posTemp,
                            }
                        );
                        return console.log('Añadiendo a lista abierta ' + obj);
                        
                    }

            }console.log(obj+' descartado!');

            
        });

    }
    console.log('///////////////////////////////////////////////////////////////////////');
    console.log('RESUMEN FINAL');
    console.log('Abierta: '+JSON.stringify(listaAbierta));
    console.log('Cerrada: '+JSON.stringify(listaCerrada));
    console.log('Ruta final: '+listaFinal);
    console.log('PosTemp Final: '+posTemp);
    console.log('///////////////////////////////////////////////////////////////////////');

    
    return listaFinal;
}

function costeBase(direccion){
    if(direccion === 1 || direccion === 3 || direccion === 5 || direccion === 7 ){
        return 10;
    }else{
        return 14;
    }
}

function menorF(arr){

    return arr.sort(function (a, b){
        return a - b;
    })[0];
}

function aCerrada(id, abierta, cerrada){
    abierta.map((obj, i)=>{
        if(obj === id) {
            cerrada.push(obj);
            abierta.splice(i, 1);
        }
    });
    return id;
}