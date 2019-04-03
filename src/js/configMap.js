import { db } from './db.js';
import { idToPos, vecinos, direccionMirada} from './tabla.js';
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
                    Math.random()< 0.85 ? [0,0] : 
                    Math.random() > 0.8 ? 
                        Math.random() > 0.7 ? [1000, 800] : [Math.floor(Math.random()*6)*200, 800]:
                        [Math.floor(Math.random()*7)*200, 1400-Math.floor(Math.random()*3)*200],
                'obj': {}
            });
            i++;

    }
    }
}

export function recalcularObstaculos(el){
                //Obstaculos
                if(el.obstaculo === true){

                    let listaVecinos = vecinos(el.id).filter((vecino)=>{
                        let direccion = direccionMirada(el.id, vecino);
                        if(db.tabla[vecino].obstaculo === true && (direccion == 1 || direccion == 3 || direccion == 5 || direccion == 7))
                        return db.tabla[vecino].obstaculo === true});


                    //¿Tiene vecinos?
                    if(listaVecinos.length>0){
                        
                        //Solo un vecino
                        if(listaVecinos.length==1){

                            //A la derecha
                            if (listaVecinos[0] === el.id+1) { db.tabla[el.id].posImg = [0,400] }
                            //A la izquierda
                            if (listaVecinos[0] === el.id-1){ db.tabla[el.id].posImg = [800,400] }
                            //Abajo
                            if (listaVecinos[0] === el.id+db.config.numCasillas){ db.tabla[el.id].posImg = [400,600] }
                            //Arriba
                            if (listaVecinos[0] === el.id-db.config.numCasillas){ db.tabla[el.id].posImg = [400,400] }
                        }
                        //Dos vecinos
                        else if(listaVecinos.length==2){

                            //En medio horizontal
                            if ((listaVecinos[0] === el.id+1 && listaVecinos[1] === el.id-1)||
                                (listaVecinos[1] === el.id+1 && listaVecinos[0] === el.id-1)) {
                                db.tabla[el.id].posImg = [1000, 400];
                            }
                            //En medio vertical                   
                            else if ((listaVecinos[0] === el.id+db.config.numCasillas && listaVecinos[1] === el.id-db.config.numCasillas)||
                            (listaVecinos[1] === el.id+db.config.numCasillas && listaVecinos[0] === el.id-db.config.numCasillas)) {
                            db.tabla[el.id].posImg = [400, 200];
                            }

                            //Esquina arriba-derecha                   
                            else if ((listaVecinos[0] === el.id-db.config.numCasillas && listaVecinos[1] === el.id+1)||
                            (listaVecinos[1] === el.id-db.config.numCasillas && listaVecinos[0] === el.id+1)) {
                            db.tabla[el.id].posImg = [200, 400];
                            }
                            //Esquina abajo-derecha                   
                            else if ((listaVecinos[0] === el.id+db.config.numCasillas && listaVecinos[1] === el.id+1)||
                            (listaVecinos[1] === el.id+db.config.numCasillas && listaVecinos[0] === el.id+1)) {
                            db.tabla[el.id].posImg = [200, 600];
                            }
                            //Esquina abajo-izquierda 
                            else if ((listaVecinos[0] === el.id+db.config.numCasillas && listaVecinos[1] === el.id-1)||
                            (listaVecinos[1] === el.id+db.config.numCasillas && listaVecinos[0] === el.id-1)) {
                            db.tabla[el.id].posImg = [1200, 200];
                            }
                            else{
                                //Esquina arriba-izquierda
                                db.tabla[el.id].posImg = [1000, 200];
                            } 
                                                     
                        }
                        //Tres vecinos
                        else if(listaVecinos.length==3){
                            

                            //Todos menos izquierda
                            if(listaVecinos.includes(el.id-1) === false){ db.tabla[el.id].posImg = [600, 200];}
                            //Todos menos derecha
                            if(listaVecinos.includes(el.id+1) === false){ db.tabla[el.id].posImg = [800, 200];}
                            //Todos menos arriba
                            if(listaVecinos.includes(el.id-db.config.numCasillas) === false){ db.tabla[el.id].posImg = [600, 600];}
                            //Todos menos abajo
                            if(listaVecinos.includes(el.id+db.config.numCasillas) === false){ db.tabla[el.id].posImg = [600, 400];}
                        }
                        //Cuatro vecinos
                        else{
                            db.tabla[el.id].posImg = [200, 200];
                        }
                    }else{
                        //Solo
                        db.tabla[el.id].posImg = [1200-(Math.floor(Math.random()*3)*200), 600];
                    }
    
                }
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
}
