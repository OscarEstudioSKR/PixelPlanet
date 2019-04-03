import { db } from './db.js';
import { idToPos, vecinos, direccionMirada} from './tabla.js';
import spriteMapaSuelo01 from '../recurse/SpritesTerreno01.jpg';
import personajes01 from '../recurse/Personajes01.png';

export function crearTabla(){

    let i = 0;
    for( let y = 0 ; y < db.config.numCasillas ; y++ ){
        for( let x = 0 ; x < db.config.numCasillas ; x++ ){

            db.tabla.push({
                'id': i,
                'pos': [ x,y ],
                'obstaculo': false,
                'penalizacionMov': 0,
                'imgSuelo': spriteMapaSuelo01,
                'posImg': 
                    Math.random()< 0.92 ? [0,0] : 
                    Math.random() > 0.9 ? 
                        Math.random() > 0.7 ? [1000, 800] : [Math.floor(Math.random()*6)*200, 800]:
                        [Math.floor(Math.random()*7)*200, 1400-Math.floor(Math.random()*3)*200],
            });
            i++;
    }}

   //Generar Placa
   generarBloques( 'expansiva', 300, 500, 2, 3);
   generarBloques( 'compacta', 300, 500, 2, 5);
   generarBloques( 'compacta', 1, 5, 20, 30);

}

export function generarBloques(tipo ,tamMin, tamMax, cantMin, cantMax){

    let ran = (min, max)=>{ return Math.floor(Math.random()*(max-min+1) )+min; }  
    let numCasillasTotal = db.config.numCasillas*db.config.numCasillas;   
    let listaTemp = [];
    let listaObstaculos = [ran(0, numCasillasTotal)];

    for(let cantidad = 0; cantidad < ran(cantMin, cantMax) ; cantidad++){
        listaTemp = [ran(0, numCasillasTotal)];

        for(let i = 0; i < ran(tamMin, tamMax) ; i++){          

            if(tipo === 'expansiva'){
                listaTemp = listaTemp.concat( vecinos( listaTemp[listaTemp.length-1] ).filter(()=>{return ran(0,100)>80}));

            }else if(tipo === 'compacta'){
                listaTemp = listaTemp.concat( vecinos( listaTemp[listaTemp.length-1] ).filter(()=>{return ran(0,100)>30}));
                listaTemp = listaTemp.concat( vecinos( listaTemp[ran(listaTemp.length/2, listaTemp.length)] ));
            }
            listaObstaculos = listaObstaculos.concat(listaTemp);
        }
    }

    //Añadir todos los objetos a la tabla
    listaObstaculos.map( obj=> db.tabla[obj].obstaculo = true );

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
                            if (listaVecinos[0] === el.id+1) { db.tabla[el.id].posImg = [0,400] } //A la derecha
                            if (listaVecinos[0] === el.id-1){ db.tabla[el.id].posImg = [800,400] } //A la izquierda
                            if (listaVecinos[0] === el.id+db.config.numCasillas){ db.tabla[el.id].posImg = [400,600] } //Abajo
                            if (listaVecinos[0] === el.id-db.config.numCasillas){ db.tabla[el.id].posImg = [400,400] } //Arriba
                        }
                        //Dos vecinos
                        else if(listaVecinos.length==2){                      
                            if ((listaVecinos[0] === el.id+1 && listaVecinos[1] === el.id-1)||
                                (listaVecinos[1] === el.id+1 && listaVecinos[0] === el.id-1)) { 
                                db.tabla[el.id].posImg = [1000, 400];} //En medio horizontal                               
                            else if ((listaVecinos[0] === el.id+db.config.numCasillas && listaVecinos[1] === el.id-db.config.numCasillas)||
                                (listaVecinos[1] === el.id+db.config.numCasillas && listaVecinos[0] === el.id-db.config.numCasillas)) {
                                db.tabla[el.id].posImg = [400, 200];}//En medio vertical              
                            else if ((listaVecinos[0] === el.id-db.config.numCasillas && listaVecinos[1] === el.id+1)||
                            (listaVecinos[1] === el.id-db.config.numCasillas && listaVecinos[0] === el.id+1)) {
                                db.tabla[el.id].posImg = [200, 400];} //Esquina arriba-derecha          
                            else if ((listaVecinos[0] === el.id+db.config.numCasillas && listaVecinos[1] === el.id+1)||
                                (listaVecinos[1] === el.id+db.config.numCasillas && listaVecinos[0] === el.id+1)) {
                                db.tabla[el.id].posImg = [200, 600];} //Esquina abajo-derecha 
                            else if ((listaVecinos[0] === el.id+db.config.numCasillas && listaVecinos[1] === el.id-1)||
                            (listaVecinos[1] === el.id+db.config.numCasillas && listaVecinos[0] === el.id-1)) { 
                                db.tabla[el.id].posImg = [1200, 200];} //Esquina abajo-izquierda 
                            else{ db.tabla[el.id].posImg = [1000, 200]; }//Esquina arriba-izquierda                                  
                        }
                        //Tres vecinos, todos menos...
                        else if(listaVecinos.length==3){
                            if(listaVecinos.includes(el.id-1) === false){ db.tabla[el.id].posImg = [600, 200];}
                            if(listaVecinos.includes(el.id+1) === false){ db.tabla[el.id].posImg = [800, 200];}
                            if(listaVecinos.includes(el.id-db.config.numCasillas) === false){ db.tabla[el.id].posImg = [600, 600];}
                            if(listaVecinos.includes(el.id+db.config.numCasillas) === false){ db.tabla[el.id].posImg = [600, 400];}
                        }
                        //Cuatro vecinos
                        else{ db.tabla[el.id].posImg = [200, 200]; }
                    //Solo
                    }else{ db.tabla[el.id].posImg = [1200-(Math.floor(Math.random()*3)*200), 600]; }
                }
            }



export function crearObjeto(idPos){

    db.seres.push(
        {
            'id': db.seres.length,
            'tipo': 'criatura',
            'pos': idToPos(idPos),
            'dest': idToPos(Math.floor(Math.random()*300)),
            'ruta': [],
            'posIntermedia': idToPos(idPos),
            'velocidad': Math.floor(Math.random()*4)+1,
            'direccionMov': 0,
            'img': personajes01,
            'posImg': [0,1000],
        }
    )
}
