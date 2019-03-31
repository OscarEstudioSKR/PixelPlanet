import { db } from './db.js';
import { idToPos} from './tabla.js';

export function crearTabla(){

    let i = 0;
    for( let y = 0 ; y < db.config.numCasillas ; y++ ){
        for( let x = 0 ; x < db.config.numCasillas ; x++ ){

            db.tabla.push({
                'id': i,
                'pos': [ x,y ],
                'obstaculo': Math.random()<0.7 ? false: true,
                'obj': {}
            });
            i++;

        }
    }
    console.log('Lucy: Tabla del juego creada');
}

export function crearObjeto(idPos){
    db.seres.push(
        {
            'id': db.seres.length,
            'tipo': 'criatura',
            'pos': idToPos(idPos),
            'dest': [6,3],
            'ruta': [],
            'posIntermedia': idToPos(idPos),
            'velocidad': 1,
            'penalizacionMov': 0,
        }
    )
    console.log('Lucy: Nueva criatura creada en '+idPos);
}
