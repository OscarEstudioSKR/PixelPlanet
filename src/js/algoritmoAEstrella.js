//import { db } from './db.js';
import { distAB, direccionMirada, posToId} from './tabla.js';
import { db } from './db.js';

export function obtenerRuta(ser, idPos, idDest){
    //return [Math.floor(Math.random()*300),Math.floor(Math.random()*300),Math.floor(Math.random()*300),Math.floor(Math.random()*300)];
    let listaFinal = [];
    let listaAbierta = [
        {
        'id': posToId(idPos),
        'g': costeBase( direccionMirada( idDest, idPos )),
        'h': distAB( posToId( idPos ),posToId( idDest ) )*10,
        'f': costeBase( direccionMirada( idDest, idPos ))+(distAB( posToId( idPos ),posToId( idDest ) )*10)+ser.penalizacionMov,
        'padre': idPos,

        }
    ];
    let listaCerrada = [];
    let pos = idPos;


    //1. Meter menor F de abierta a cerrada y eliminarlo. Cambiar posicion actual
    if( listaAbierta.length > 0 ){  
        pos = aCerrada( menorF( listaAbierta ), listaAbierta, listaCerrada);
    }



    console.log('Abierta: '+JSON.stringify(listaAbierta));
    console.log('Cerrada: '+JSON.stringify(listaCerrada));

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