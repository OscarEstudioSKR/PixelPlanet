import { db } from './db.js';

//Devuelve una posición [x,y] a partir de una id de casilla
export function idToPos(id){
    let y = Math.floor(id/db.config.numCasillas);
    let x = Math.abs(id-(y*db.config.numCasillas));
    return [x,y];
}
export function ran(min, max){ 
    return Math.floor(Math.random()*(max-min+1) )+min;
}

//Devuelve a partir de una [x, y], la posición id de la casilla
export function posToId(pos){
    return pos[0]+(pos[1]*db.config.numCasillas);   
}

//Regresa un array con los 8 vecinos al rededor de la casilla id
export function vecinos(id){
    let arrTemp = [];
    let casillasTotales = db.config.numCasillas*db.config.numCasillas;
    let numCasillas = db.config.numCasillas;

    //Arriba
    if(id - numCasillas >= 0){arrTemp.push(id - numCasillas)}
    //Arriba-Derecha
    if(id - numCasillas +1 >= 0 && idToPos( id-numCasillas+1 )[1] === idToPos(id-numCasillas)[1]){ arrTemp.push(id - numCasillas +1)}
    //Derecha
    if(idToPos(id+1)[1] === idToPos(id)[1]){arrTemp.push(id+1);}
    //Abajo-Derecha
    if(id + numCasillas +1 < casillasTotales-1 && idToPos( id+numCasillas+1 )[1] === idToPos(id+numCasillas)[1]){ arrTemp.push(id + numCasillas +1)}
    //Abajo
    if(id + numCasillas < casillasTotales-1){arrTemp.push(id + numCasillas)}
    //Abajo-Izquierda
    if(id + numCasillas -1 < casillasTotales-1 && idToPos( id+numCasillas-1 )[1] === idToPos(id+numCasillas)[1]){ arrTemp.push(id + numCasillas -1)}
    //Izquierda
    if(idToPos(id-1)[1] === idToPos(id)[1]){arrTemp.push(id-1);}
    //Arriba-Izquierda
    if(id - numCasillas -1 >= 0 && idToPos( id-numCasillas-1 )[1] === idToPos(id-numCasillas)[1]){ arrTemp.push(id - numCasillas -1)}

    return arrTemp;
}

//Devuelve la distancia en casillas desde un punto a otro.
export function distAB(origen, destino){
    return Math.abs( idToPos( origen )[0] - idToPos( destino )[0] ) +  Math.abs(idToPos( origen )[1] - idToPos( destino )[1] )
}

//Devuelve del 1 al 8, indicando la posicion en que mira 1 = arriba, 2 = arriba-derecha, 3 = derecha...
export function direccionMirada(idOrigen, idDestino){
    let origen = idToPos(idOrigen);
    let destino = idToPos(idDestino);

    if( idDestino < idOrigen ){
        if (destino[1] === origen[1]){ return 7 }
        else if (destino[0] > origen[0]){ return 2 }
        else if (destino[0] < origen[0]){ return 8 }
        else { return 1 }

    }else if( idDestino > idOrigen ){
        if (destino[1] === origen[1]){ return 3 }
        else if (destino[0] > origen[0]){ return 4 }
        else if (destino[0] < origen[0]){ return 6 }
        else { return 5 }
    }
    return 0;
}
