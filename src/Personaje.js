import React, { Component } from 'react';
import './Personaje.css';

class Personaje extends Component {
    constructor(props){
        super(props);
        let pos = [3,10];
        let dest = [5,3];

        this.state = {
          'id': 0,
          'pos': pos,
          'dest': dest,
          'casillas': this.props.casillas,
          'tam': this.props.config.tamCasilla,
          'numCasillas': this.props.config.numCasillas,
          'posId': pos[0]+(pos[1]*this.props.config.numCasillas),
          'posIdDest': dest[0]+(dest[1]*this.props.config.numCasillas),

          'listaAbierta': [],
          'listaCerrada': [
            {
              'id': pos[0]+(pos[1]*this.props.config.numCasillas),
              'f': 0,
              'padre': pos[0]+(pos[1]*this.props.config.numCasillas),
              'pos': pos,
            }
          ],
          'posTemp': pos[0]+(pos[1]*this.props.config.numCasillas),
          'idListaCerradaTemp': 0,
        }

    }


  render() {

    if(this.state.pos !== this.state.dest){this.mover()}

    let style={
      'position': 'absolute',
      'left': this.state.pos[0]*this.state.tam+'px',
      'top': this.state.pos[1]*this.state.tam+'px',
      'width': this.state.tam+'px',
      'height': this.state.tam+'px',
      'background': 'greenyellow',
      'display': 'block',
      'borderRadius': '50%',
      'textAlign': 'center',
      
    }
    let styleDest={
      'position': 'absolute',
      'left': this.state.dest[0]*this.state.tam+'px',
      'top': this.state.dest[1]*this.state.tam+'px',
      'width': this.state.tam+'px',
      'height': this.state.tam+'px',
      'background': 'blue',
      'display': 'block',
      'borderRadius': '50%',
      'textAlign': 'center',
      'color': 'white'
  }

    return (
      <div>
        <div style={style} className="Personaje">{this.state.posId}</div>
        <div style={styleDest}>{this.state.posIdDest}</div>
      </div>
      
    );
  }

  mover(){
    console.log('Lucy: Quiero moverme');
    
    //Añadir a lista abierta vecinos
    this.comprobarVecinos();

    //Comprobar menor coste de movimiento en vecinos y añadir a cerrada
    this.comprobarCostePasoVecinos();



    console.log('ListaAbierta: '+JSON.stringify(this.state.listaAbierta));
    console.log('ListaCerrada: '+JSON.stringify(this.state.listaCerrada));
    console.log('Posición actual: '+this.state.posId);
    console.log('posTemp: '+this.state.posTemp);
  }

  comprobarVecinos(){

    this.state.casillas.map((casilla)=>{

      if(this.state.listaAbierta.length<=0){
        this.mirarAlrededor(casilla); 
      }
      else{

        this.state.listaAbierta.some((obj)=>{
          if(obj.id === casilla.id){console.log('Cumplen');}
        });

        console.log('NO cumple los requisitos')
        return this.mirarAlrededor(casilla);
        
        
      }
      
      
      

    });

  }

  mirarAlrededor(casilla){

    let posY = this.state.listaCerrada[this.state.idListaCerradaTemp].pos[1];
    let coste = 10;

    if(casilla.obstaculo === false && casilla.id >= 0 && casilla.id < this.state.numCasillas*this.state.numCasillas){

      //Arriba
      if(casilla.id === this.state.posTemp-this.state.numCasillas){ coste = 10;}
      //Arriba-Derecha
      else if(casilla.id === this.state.posTemp-this.state.numCasillas+1 && casilla.pos[1] === posY-1){ coste = 14;}
      //Derecha
      else if(casilla.id === this.state.posTemp+1 && casilla.pos[1] === posY){ coste = 10;}
      //Abajo-Derecha
      else if(casilla.id === this.state.posTemp+this.state.numCasillas+1  && casilla.pos[1] === posY+1){ coste = 14;}
      //Abajo
      else if(casilla.id === this.state.posTemp+this.state.numCasillas){ coste = 10;}
      //Abajo-Izquierda
      else if(casilla.id === this.state.posTemp+this.state.numCasillas-1 && casilla.pos[1] === posY+1){ coste = 14;}
      //Izquierda
      else if(casilla.id === this.state.posTemp-1 && casilla.pos[1] === posY){ coste = 10}
      //Arriba-Izquierda
      else if(casilla.id === this.state.posTemp-this.state.numCasillas-1 && casilla.pos[1] === posY-1){ coste = 14;}
      else{ return false;}

    } else{ return false;}

    this.state.listaAbierta.push({
      'id': casilla.id,
      'g': coste + casilla.dificultadPaso,
      'h': this.distanciaDestino(casilla.id),
      'f': coste + casilla.dificultadPaso + this.distanciaDestino(casilla.id)
    })

  }

  //Devuelve la distancia de una casilla[id] hasta el destino (H)
  distanciaDestino(id){

    let dest = this.state.dest;
    let pos = this.state.casillas[id].pos;
    let distancia = 0;

    if(dest[0] > pos[0]){
      distancia = dest[0]-pos[0];
    }else{
      distancia = pos[0]-dest[0];
    }
    if(dest[1] > pos[1]){
      distancia += dest[1]-pos[1];
    }else{
      distancia += pos[1]-dest[1];
    }
    return distancia;
  }

  //Comprueba de la lista abierta que sumas de G y H son la mejor opción por ser inferiores en coste y añade el obj a la lista cerrada
  //Cambia la posTemp

  comprobarCostePasoVecinos(){

    if(this.state.listaAbierta.length>0){
      
      let mejorPos = this.state.listaAbierta[0].g + this.state.listaAbierta[0].h;
      let idDestinoTemp = this.state.listaAbierta[0].id;
      let idListaAbiertaAEliminar = 0;
  
      this.state.listaAbierta.map((obj, i)=>{
  
          if(obj.g + obj.h < mejorPos){
            mejorPos = obj.g + obj.h;
            idDestinoTemp = obj.id;
            idListaAbiertaAEliminar = i;
          }
      });
      this.state.listaCerrada.push({
        'id': idDestinoTemp,
        'f': mejorPos,
        'padre': this.state.posTemp,
        'pos': this.state.casillas[idDestinoTemp].pos,
      });
      this.state.posTemp = idDestinoTemp;
      this.state.idListaCerradaTemp++;
      this.state.listaAbierta.splice(idListaAbiertaAEliminar,1);

    }
    
  }

}

export default Personaje;
