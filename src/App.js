import React, { Component } from 'react';
import './App.css';
import { db } from './js/db.js';
import { crearTabla, crearObjeto } from './js/configMap.js';
import { DibujarSeres } from './js/seresIA.js';
import DibujarMapa from './js/mapa.js';

//import { direccionMirada } from './js/tabla.js';

  
//MOTOR DEL JUEGO

  crearTabla();


  for(let i = 0; i< 1; i++){
    crearObjeto(i);
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



//PINTAR EL JUEGO

class App extends Component {

  render() {
    return (
      <div className="App">
        {
          db.tabla.map((obj, i)=>{
            return <DibujarMapa obj={obj} key={obj+'-'+i}/>
          })
        }
        
        {
          db.seres.map((ser, i)=>{
            return <DibujarSeres db={db} ser={ser} key={ser+'-'+i}/>
          })
        }   
      </div>
    );
  }
}

export default App;
