import { db } from './db.js';
import { idToPos} from './tabla.js';

export function crearTabla(){

    let i = 0;
    for( let y = 0 ; y < db.config.numCasillas ; y++ ){
        for( let x = 0 ; x < db.config.numCasillas ; x++ ){

            db.tabla.push({
                'id': i,
                'pos': [ x,y ],
                'obstaculo': Math.random()<0.75 ? false: true,
                'penalizacionMov': 0,
                'obj': {}
            });
            i++;

        }
    }
    console.log('Lucy: Tabla del juego creada');
}

export function crearObjeto(idPos){
    let listaColores = ['red', 'blue', 'green', 'yellow', 'pink', 'purple', 'orange', 'aqua', 'brown', 'coral', 'chartreuse'];

    db.seres.push(
        {
            'id': db.seres.length,
            'tipo': 'criatura',
            'pos': idToPos(idPos),
            'dest': idToPos(Math.floor(Math.random()*300)),
            'ruta': [],
            'posIntermedia': idToPos(idPos),
            'velocidad': Math.floor(Math.random()*7)+1,
            'direccionMov': 0,
            'color': listaColores[Math.floor(Math.random()*listaColores.length)],
            
        }
    )
    console.log('Lucy: Nueva criatura creada en '+idPos);
}
