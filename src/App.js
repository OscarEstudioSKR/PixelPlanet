import React, { Component } from 'react';
import './App.css';
import { db } from './js/db.js';
import { crearTabla, crearObjeto } from './js/configMap.js';
import { DibujarSeres } from './js/seresIA.js';
import DibujarMapa from './js/mapa.js';

//import { direccionMirada } from './js/tabla.js';

  
//MOTOR DEL JUEGO

  crearTabla();

  crearObjeto(54);


//TALLER DE PRUEBAS



//PINTAR EL JUEGO

class App extends Component {

  render() {
    return (
      <div className="App">
        {
          db.tabla.map((obj, i)=>{
            return <DibujarMapa db={db} obj={obj} key={obj+'-'+i}/>
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
