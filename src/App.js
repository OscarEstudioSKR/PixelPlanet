import React, { Component } from 'react';
import './App.css';
import { db } from './js/db.js';
import { crearTabla, generarPlaca, crearSer, recalcularImagenes } from './js/configMap.js';
import { DibujarSeres } from './js/seresIA.js';
import DibujarMapa from './js/mapa.js';
import MenuSer from './js/MenuSer.js';


//import { ran } from './js/tabla.js';

  
//MOTOR DEL JUEGO

  crearTabla();
  db.tabla.map( obj => recalcularImagenes(obj) );

  crearSer(0, 'Pixeliano', 'Hembra', 'Halem');
  for(let i = 1; i< 5; i++){
    crearSer(i,'Pixeliano', 'Hembra', 'Olgran');
  }
  
    

//TALLER DE PRUEBAS


const times = [];
let fps;

function refreshLoop() {
  console.log('FPS: '+fps);
  window.requestAnimationFrame(() => {
    const now = performance.now();
    while (times.length > 0 && times[0] <= now - 1000) {
      times.shift();
    }
    times.push(now);
    fps = times.length;
    refreshLoop();
  });
}

//refreshLoop();

//Detectar entradas del teclado
let tecla = 0;
document.onkeypress = (event)=>{
  console.log("Tecla: " +event.keyCode);

  if(event.keyCode === 101 && db.config.tamCasilla+10 < 150){ db.config.tamCasilla += 10;}
  if(event.keyCode === 113 && db.config.tamCasilla-10 > 0){ db.config.tamCasilla -= 10;}
  if(event.keyCode === 100){ window.scrollTo(window.scrollX+25, window.scrollY);}
  if(event.keyCode === 97){ window.scrollTo(window.scrollX-25, window.scrollY);}
  if(event.keyCode === 119){ window.scrollTo(window.scrollX, window.scrollY-25);}
  if(event.keyCode === 115){ window.scrollTo(window.scrollX, window.scrollY+25);}
  tecla = event.keyCode;
}
document.onkeyup = (event)=>{
  if(event.keyCode === tecla){
    tecla = 0;
  }
}

//Detectar entradas del ratón
document.onmousedown = (event)=>{
  console.log("Codigo ratón: " +event.button);

}

//PINTAR EL JUEGO

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      'tamCasilla': db.config.tamCasilla,
      'menuPersonajes': -1,
      'cambiarMenu': (id)=>{this.setState({'menuPersonajes': id,})},
    }
  }

  render() {
    return (
      <div className="App" >
        {
          db.tabla.map((obj, i)=>{
            return <DibujarMapa obj={obj} key={obj+'-'+i}/>
          })
        }
        
        {
          db.seres.map((ser, i)=>{
            return <DibujarSeres db = {db} ser ={ser} key={ser+'-'+i} state = {this.state}/>
          })
        } 
        {
          this.state.menuPersonajes != -1 &&
          <MenuSer ser={db.seres[this.state.menuPersonajes]} state = {this.state}/>
        }
      </div>
    );
  }
}

export default App;
