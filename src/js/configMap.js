import { db } from './db.js';
import { idToPos} from './tabla.js';
import spriteMapaSuelo01 from '../recurse/spriteMapaSuelo01.png';
import personajes01 from '../recurse/Personajes01.png';

export function crearTabla(){

    let i = 0;
    for( let y = 0 ; y < db.config.numCasillas ; y++ ){
        for( let x = 0 ; x < db.config.numCasillas ; x++ ){

            db.tabla.push({
                'id': i,
                'pos': [ x,y ],
                'obstaculo': Math.random()<0.75 ? false: true,
                'penalizacionMov': 0,
                'imgSuelo': spriteMapaSuelo01,
                'posImg': 
                    Math.random()< 0.75 ? [0,0] : 
                    Math.random() > 0.9 ? 
                    Math.random() > 0.9 ? [1000, 600] :
                    [Math.floor(Math.random()*6)*200, 600]:
                    [Math.floor(Math.random()*7)*200, 1200-Math.floor(Math.random()*3)*200],
                'obj': {}
            });
            i++;
            if(db.tabla[db.tabla.length-1].obstaculo === true){
                db.tabla[db.tabla.length-1].posImg = [0, 200];
            }
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
            'img': personajes01,
            'posImg': [0,1000],
        }
    )
    console.log('Lucy: Nueva criatura creada en '+idPos);
}
