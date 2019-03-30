import React, { Component } from 'react';
import './App.css';
import { db } from './js/db.js';
import { crearTabla, crearObjeto } from './js/configMap.js';
import { idToPos, posToId, vecinos} from './js/tabla.js';
import { DibujarSeres } from './js/seresIA.js';
import DibujarMapa from './js/mapa.js';

  

  crearTabla();
  console.log('idToPos(45): '+idToPos(45));
  console.log('posToId[5,1]: '+posToId([15,1]));
  console.log('vecinos(45): '+vecinos(45));
  
  crearObjeto(45);


  setInterval(() => {
   
  }, 1000);


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
