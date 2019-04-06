import { db } from './db.js';
import { idToPos, vecinos, direccionMirada, ran} from './tabla.js';
import spriteMapaSuelo01 from '../recurse/SpritesTerreno01.jpg';
import spriteMapaSuelo02 from '../recurse/SpritesTerreno02.jpg';
import spriteMapaSuelo03 from '../recurse/SpritesTerreno03.jpg';
import personajes01 from '../recurse/Personajes01.png';


export function crearTabla(){

    let i = 0;
    for( let y = 0 ; y < db.config.numCasillas ; y++ ){
        for( let x = 0 ; x < db.config.numCasillas ; x++ ){

            db.tabla.push({
                'id': i,
                'pos': [ x,y ],
                'obstaculo': false,
                'imagenEncadenada': false,
                'penalizacionMov': 0,
                'imgSuelo': spriteMapaSuelo01,
                'posImg': 
                    Math.random()< 0.75 ? [0,0] : 
                    Math.random() > 0.95 ? 
                        Math.random() > 0.7 ? [1000, 800] : [Math.floor(Math.random()*6)*200, 800]:
                        [Math.floor(Math.random()*7)*200, 1400-Math.floor(Math.random()*3)*200],
            });
            i++;
            if(db.tabla[db.tabla.length-1].posImg[1] === 800){
                db.tabla[db.tabla.length-1].penalizacionMov = 300;
            }
    }}

   //Generar Placa
   generarBioma('Pradera verde');
   generarBioma('Montaña');
   generarBioma('Lagos');
   generarBioma('Bosque');
   

}

function generarBioma(bioma){
    switch (bioma) {

        case 'Valle':
            generarBloques( 'expansiva', 300, 500, 2, 3, spriteMapaSuelo01, 'elevacion');
            generarBloques( 'compacta', 300, 500, 2, 5, spriteMapaSuelo01, 'elevacion');
            generarBloques( 'compacta', 1, 5, 20, 30, spriteMapaSuelo01, 'elevacion');
            break;
        case 'Montaña':
            generarBloques( 'expansiva', 300, 500, 2, 3, spriteMapaSuelo01, 'elevacion');
            generarBloques( 'compacta', 50, 200, 10, 20, spriteMapaSuelo01, 'elevacion');
            generarBloques( 'compacta', 1, 20, 20, 30, spriteMapaSuelo01, 'elevacion');
            break;
        case 'Lagos':
            generarBloques( 'expansiva', 300, 500, 2, 3, spriteMapaSuelo02, 'agua');
            generarBloques( 'compacta', 50, 200, 10, 20, spriteMapaSuelo02, 'agua');
            generarBloques( 'compacta', 20, 50, 20, 30, spriteMapaSuelo02, 'suelo');
            break;
        case 'Pradera verde':
            generarBloques( 'repartida', 1, 100, 5, 10, spriteMapaSuelo02, 'arboledaVerde');
            generarBloques( 'expansiva', 60, 150, 2, 4, spriteMapaSuelo02, 'arboledaVerde');
            generarBloques( 'expansiva',5, 10, 1, 3, spriteMapaSuelo02, 'agrupacion');
            generarBloques( 'expansiva',5, 10, 1, 3, spriteMapaSuelo02, 'agrupacion');
            generarBloques( 'expansiva',5, 10, 1, 3, spriteMapaSuelo02, 'agrupacion');
            generarBloques( 'expansiva',5, 10, 1, 3, spriteMapaSuelo02, 'agrupacion');
            generarBloques( 'expansiva',5, 10, 1, 3, spriteMapaSuelo01, 'agrupacion');
            generarBloques( 'expansiva',5, 10, 1, 3, spriteMapaSuelo01, 'agrupacion');
            break;
        case 'Bosque':
            generarBloques( 'compacta', 50, 150, 3, 8, spriteMapaSuelo03, 'interior');
            generarBloques( 'expansiva', 200, 600, 2, 4, spriteMapaSuelo03, 'interior');
            generarBloques( 'repartida', 20, 50, 2, 4, spriteMapaSuelo03, 'interior');
            break;
        default:
            break;
    }
}

function generarBloques(tipo ,tamMin, tamMax, cantMin, cantMax, imgBioma, tipoBloque){

    let numCasillasTotal = db.config.numCasillas*db.config.numCasillas;   
    let listaTemp = [];
    let listaFinal = [];

    for(let cantidad = 0; cantidad < ran(cantMin, cantMax) ; cantidad++){
        listaTemp = [ran(0, numCasillasTotal)];

        for(let i = 0; i < ran(tamMin, tamMax) ; i++){          

            if(tipo === 'expansiva'){
                listaTemp = listaTemp.concat( vecinos( listaTemp[listaTemp.length-1] ).filter(()=>{return ran(0,100)>80}));
            }
            else if(tipo === 'compacta'){
                listaTemp = listaTemp.concat( vecinos( listaTemp[listaTemp.length-1] ).filter(()=>{return ran(0,100)>30}));
                listaTemp = listaTemp.concat( vecinos( listaTemp[ran(listaTemp.length/2, listaTemp.length)] ));
            }
            else if(tipo === 'repartida'){
                listaTemp = listaTemp.concat( vecinos( listaTemp[ran(0, listaTemp.length-1)] ).filter(()=>{return ran(0,100)>90}));
                listaTemp[ran(0, listaTemp.length-1)] = ran(0, numCasillasTotal-1);
            }
            listaFinal = listaFinal.concat(listaTemp);
        }
    }

    //Añadir todos los objetos a la tabla
    let objetoBaseRandom = [ ran(0,5)*200 ,ran(4,6)*200 ];
    listaFinal.map( obj=> {
        db.tabla[obj].imgSuelo = imgBioma;

        if(tipoBloque == 'elevacion'){
            db.tabla[obj].obstaculo = true;            
            db.tabla[obj].imagenEncadenada = true;
            db.tabla[obj].penalizacionMov = 1000;
        }
        if(tipoBloque == 'agua'){
            db.tabla[obj].obstaculo = false;
            db.tabla[obj].imagenEncadenada = true;
            db.tabla[obj].penalizacionMov = 400;
        }
        if(tipoBloque == 'suelo'){
            db.tabla[obj].obstaculo = false;
            db.tabla[obj].imagenEncadenada = false;
            db.tabla[obj].penalizacionMov = 50;
        }
        if(tipoBloque == 'arboledaVerde'){
            db.tabla[obj].posImg = [ (ran(0,10)>8 ? 1000 : 1200) ,800];
            db.tabla[obj].obstaculo = false;
            db.tabla[obj].imagenEncadenada = false;
            db.tabla[obj].penalizacionMov = 300;
        }
        if(tipoBloque == 'agrupacion'){
            db.tabla[obj].posImg = objetoBaseRandom;
            db.tabla[obj].obstaculo = false;
            db.tabla[obj].imagenEncadenada = false;
            db.tabla[obj].penalizacionMov = 0;
        }
        if(tipoBloque == 'interior'){
            db.tabla[obj].imagenEncadenada = true; 
        }
        

        
    }); 

}


export function recalcularImagenes(el){

                //La imagen es encadenada
                if(el.imagenEncadenada === true){

                    let listaVecinos = vecinos(el.id).filter((vecino)=>{
                        let direccion = direccionMirada(el.id, vecino);
                        if(db.tabla[vecino].imagenEncadenada === true &&
                            db.tabla[vecino].imgSuelo === el.imgSuelo &&
                            (direccion == 1 || direccion == 3 || direccion == 5 || direccion == 7))
                        return db.tabla[vecino].imagenEncadenada === true});

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
                        
                        else{ 
                            listaVecinos = vecinos(el.id).filter((vecino)=>{
                                return db.tabla[vecino].imgSuelo === el.imgSuelo});
                                
                            //Ocho vecinos
                            if(listaVecinos.length === 8 && ran(0,10)>3){
                                if(ran(0,20)==20){db.tabla[el.id].posImg = [800, 600];}
                                else{db.tabla[el.id].posImg = [1000, 600];}
                            }else{
                                //Cuatro vecinos
                                db.tabla[el.id].posImg = [200, 200];                                
                            }
                        }
                    //Solo
                    }else{ db.tabla[el.id].posImg = [1200, 600]; }

                    //Sprites interiores
                    if(db.tabla[el.id].imgSuelo === spriteMapaSuelo03 && listaVecinos.length === 8){

                        if(ran(0,50)>42){
                            db.tabla[el.id].posImg = [ ran(0,5)*200 ,ran(4,6)*200 ];
                            db.tabla[el.id].penalizacionMov = 100;
                        }else if(ran(0,50)>25){
                            db.tabla[el.id].posImg = [ ran(4,5)*200 ,600 ];
                            db.tabla[el.id].penalizacionMov = 350;
                        }else if(ran(0,10)>5){
                            db.tabla[el.id].posImg = [ ran(0,5)*200 ,800 ];
                            db.tabla[el.id].penalizacionMov = 50;                           
                        }
                        db.tabla[el.id].obstaculo = false;
                    }
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
