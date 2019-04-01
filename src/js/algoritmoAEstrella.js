//import { db } from './db.js';
import { distAB, direccionMirada, posToId, vecinos} from './tabla.js';
import { db } from './db.js';

export function obtenerRuta(ser, pos, dest){
    let listaCerrada = [];
    let posTemp = posToId(pos);
    let listaCalcular = [];
    let listaFinal = [];
    
    //Numero de vueltas que dará como máximo el bucle para encontrar una ruta;
    let maximoPasosBucle = 100;
    let pasosMaximo = 0;

    let listaAbierta = [
        {
        'id': posToId(pos),
        'g': 0,
        'h': distAB( posToId( pos ),posToId( dest ) )*10,
        'f': 0+(distAB( posToId( pos ),posToId( dest ) )*10)+db.tabla[posToId(pos)].penalizacionMov,
        'padre': posToId(pos),

        }
    ];

    while (pasosMaximo < maximoPasosBucle) {
        pasosMaximo++;

        //1. Meter menor F de abierta a cerrada y eliminarlo. Cambiar posicion actual
        if( listaAbierta.length > 0 ){  
            posTemp = aCerrada( menorF( listaAbierta ), listaAbierta, listaCerrada).id;
        }

        //2. Almacenar vecinos en listaCalcular
        listaCalcular = vecinos(posTemp);

        //3 Obj es el destino?
        let idFinal = listaCalcular.filter((obj)=>{return obj == posToId(dest)});
        if( idFinal[0] == posToId(dest) ){
            let el = listaCerrada[listaCerrada.length-1];

            listaCerrada.push(
                {
                    'id': idFinal[0],
                    'g': el.g+costeBase( direccionMirada( el.id, idFinal[0] )),
                    'h': distAB( idFinal[0] ,posToId( dest ) )*10,
                    'f': el.g+costeBase( direccionMirada( el.id, idFinal[0] )) + (distAB( idFinal[0] ,posToId( dest ) )*10) + db.tabla[idFinal[0]].penalizacionMov,
                    'padre': el.id,
                });

            //Conversión final y fin del programa.
            return conversionFinal(listaCerrada, listaFinal, dest, pasosMaximo);
            
        }else{
            //4.Comprobar posiciones...
            listaCalcular.map((obj)=>{

                //Si no está en lista cerrada y no es un obstaculo
                if( listaCerrada.filter( objCerrada => objCerrada.id === obj ).length === 0 && db.tabla[obj].obstaculo === false){
          
                    let objDestino = listaAbierta.filter( objAbierta => objAbierta.id === obj );
                    let el = listaCerrada[listaCerrada.length-1];

                    if(objDestino.length>0){
                        //Si está en la lista abierta
                        if(el.g + costeBase( direccionMirada( el.id, obj )) < objDestino.g){
                            return addObj( el.g,listaAbierta, obj, dest, db, posTemp );
                        }
                    }else{
                        //Si no está en lista abierta, lo añade
                        return addObj( el.g, listaAbierta, obj, dest, db, posTemp );
                    }
                }
            });
        }
        if(pasosMaximo>maximoPasosBucle-1){
            console.log('Ruta no ha sido obtenida por completo');
            return conversionFinal(listaCerrada, listaFinal, dest, pasosMaximo);
        }
    }
}

function costeBase(direccion){
    if(direccion === 1 || direccion === 3 || direccion === 5 || direccion === 7 ){
        return 10;
    }
    if(direccion === 2 || direccion === 4 || direccion === 6 || direccion === 8 ){
        return 14;
    }
    return 0;
}

function menorF(arr){

    let idArrFinal = 0;
    let f = arr[0].f;

    arr.map((obj, i) => {
        if (f > obj.f){
            f = obj.f
            idArrFinal = i;};
    });
    return arr[idArrFinal];
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

function addObj(g, listaAbierta, obj, dest, db, posTemp){

    listaAbierta.push(
        {
            'id': obj,
            'g': g+costeBase( direccionMirada( posTemp, obj )),
            'h': distAB( obj ,posToId( dest ) )*10,
            'f': g+costeBase( direccionMirada( posTemp, obj )) +  (distAB( obj ,posToId( dest ) )*10) + db.tabla[obj].penalizacionMov,
            'padre': posTemp,
        }
    );
    return listaAbierta[listaAbierta.lenght-1];
}

function conversionFinal(listaCerrada, listaFinal, dest, pasosMaximo, rutaCompleta){

    let arrInversa = listaCerrada.reverse();
    let next = arrInversa[0].id;
    if(rutaCompleta){
        listaFinal.push(posToId( dest ));
    }else{
        listaFinal.push(next);
    }
    

    arrInversa.map((objFinal, i)=>{
        if(objFinal.id == next){ 
            listaFinal.push(objFinal.id);
            next = objFinal.padre;}
    });
    //Devuelve la ruta
    return listaFinal.reverse();
}