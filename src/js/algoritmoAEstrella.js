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
        'g': 0,
        'h': distAB( posToId( pos ),posToId( dest ) )*10,
        'f': 0+(distAB( posToId( pos ),posToId( dest ) )*10)+db.tabla[posToId(pos)].penalizacionMov,
        'padre': posToId(pos),

        }
    ];



    for(let i = 0; i < 20; i++){

        //1. Meter menor F de abierta a cerrada y eliminarlo. Cambiar posicion actual
        if( listaAbierta.length > 0 ){  
            posTemp = aCerrada( menorF( listaAbierta ), listaAbierta, listaCerrada).id;
            console.log('Lucy: Nueva posición '+posTemp+' a lista CERRADA ');
            console.log('Cerrada: '+JSON.stringify(listaCerrada));
        }

        //2. Almacenar vecinos en listaCalcular
        listaCalcular = vecinos(posTemp);
        console.log('Lucy: Nuevos vecinos de '+posTemp+' en listaCalcular: '+ JSON.stringify(listaCalcular));

        //3 Obj es el destino?

        let idFinal = listaCalcular.filter((obj)=>{return obj == posToId(dest)});

        if( idFinal[0] == posToId(dest) ){
            let el = listaCerrada[listaCerrada.length-1];
            
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            console.log('Lucy: Ruta final encontrada en '+JSON.stringify(idFinal[0]));

            listaCerrada.push(
                {
                    'id': idFinal[0],
                    'g': el.g+costeBase( direccionMirada( el.id, idFinal[0] )),
                    'h': distAB( idFinal[0] ,posToId( dest ) )*10,
                    'f': el.g+costeBase( direccionMirada( el.id, idFinal[0] )) + (distAB( idFinal[0] ,posToId( dest ) )*10) + db.tabla[idFinal[0]].penalizacionMov,
                    'padre': el.id,
                });
            
            console.log('ListaCerrada final: '+JSON.stringify(listaCerrada));

            let arrInversa = listaCerrada.reverse();
            let next = arrInversa[0].id;
            listaFinal.push(posToId( dest ));

            arrInversa.map((objFinal, i)=>{
                if(objFinal.id == next){ 
                    listaFinal.push(objFinal.id);
                    next = objFinal.padre;}
            });
            console.log('Ruta: '+listaFinal);
            console.log('Fin del programa');
            return listaFinal.reverse();


        }else{

            listaCalcular.map((obj)=>{

                console.log('Comprobando '+obj+'...');

                //2.2 Si no está en lista cerrada y no es un obstaculo
                if( listaCerrada.filter( objCerrada => objCerrada.id === obj ).length === 0 && db.tabla[obj].obstaculo === false){

                    //Está en la lista abierta
                    let objDestino = listaAbierta.filter( objAbierta => objAbierta.id === obj );
                    let el = listaCerrada[listaCerrada.length-1];

                    if(objDestino.length>0){
                        console.log(obj+' está en lista abierta: '+JSON.stringify(listaAbierta));

                        if(el.g + costeBase( direccionMirada( el.id, obj )) < objDestino.g){
                            console.log( console.log(obj+' editado como '+JSON.stringify(el)))
                            return addObj( el.g,listaAbierta, obj, dest, db, posTemp );
                        }

                    }else{
                        //No está en lista abierta, lo añade
                        addObj( el.g, listaAbierta, obj, dest, db, posTemp );
                        return console.log('Añadiendo a lista abierta ' + obj);
                        
                    }

                }console.log(obj+' descartado!');

                
            });
        }

    }
    console.log('///////////////////////////////////////////////////////////////////////');
    console.log('RESUMEN FINAL');
    console.log('Abierta: '+JSON.stringify(listaAbierta));
    console.log('Cerrada: '+JSON.stringify(listaCerrada));
    console.log('Ruta final: '+listaFinal);
    console.log('PosTemp Final: '+posTemp);
    console.log('///////////////////////////////////////////////////////////////////////');

    
    
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

    console.log('De la lista '+JSON.stringify(arr));
    let idArrFinal = 0;
    let f = arr[0].f;

    arr.map((obj, i) => {
        if (f > obj.f){
            f = obj.f
            idArrFinal = i;};
    });

    console.log('Elige con menor F '+JSON.stringify(arr[idArrFinal]));
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