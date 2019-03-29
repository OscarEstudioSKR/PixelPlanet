
export function crearTabla(db){

    let i = 0;
    for( let y = 0 ; y < db.config.numCasillas ; y++ ){
        for( let x = 0 ; x < db.config.numCasillas ; x++ ){

            db.tabla.push({
                'id': i,
                'pos': [ x,y ],
                'obstaculo': Math.random()<0.8 ? false: true,
                'obj': {}
            });
            i++;

        }
    }
    console.log('Lucy: Tabla del juego creada');
}

export function crearObjeto(db){
    console.log('Lucy: Aun no tengo nada programado para crearObjeto()');
}

export function ejecutarJuego(db){
    console.log('Lucy: Aun no se como ejecutar el juego');
}
