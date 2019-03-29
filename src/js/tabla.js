import { db } from './db.js';

//Devuelve una posición [x,y] a partir de una id de casilla
export function idToPos(id){
    let y = Math.floor(id/db.config.numCasillas);
    let x = Math.abs(id-(y*db.config.numCasillas));
    return [x,y];
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
    if(id - numCasillas +1 >= 0 && idToPos( id-numCasillas+1 )[1] === idToPos(id)[1]-1){ arrTemp.push(id - numCasillas +1)}
    //Derecha
    if(idToPos(id+1)[1] === idToPos(id)[1]){arrTemp.push(id+1);}
    //Abajo-Derecha
    if(id + numCasillas +1 >= 0 && idToPos( id+numCasillas+1 )[1] === idToPos(id)[1]+1){ arrTemp.push(id + numCasillas +1)}
    //Abajo
    if(id + numCasillas < casillasTotales){arrTemp.push(id + numCasillas)}
    //Abajo-Izquierda
    if(id + numCasillas -1 >= 0 && idToPos( id+numCasillas-1 )[1] === idToPos(id)[1]+1){ arrTemp.push(id + numCasillas -1)}
    //Izquierda
    if(idToPos(id-1)[1] === idToPos(id)[1]){arrTemp.push(id-1);}
    //Arriba-Izquierda
    if(id - numCasillas -1 >= 0 && idToPos( id-numCasillas-1 )[1] === idToPos(id)[1]-1){ arrTemp.push(id - numCasillas -1)}

    return arrTemp;
}

