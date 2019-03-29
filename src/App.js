import React, { Component } from 'react';
import './App.css';
import { db } from './js/db.js';
import { crearTabla, crearObjeto, ejecutarJuego } from './js/configMap.js';
import { idToPos, posToId, vecinos} from './js/tabla.js';
import DibujarMapa from './js/mapa.js';

  

  crearTabla(db);
  console.log('idToPos(31): '+idToPos(31));
  console.log('posToId[5,1]: '+posToId([5,1]));
  console.log('vecinos(31): '+vecinos(31));

  //console.log('DB: '+JSON.stringify(db));

class App extends Component {
  render() {
    return (
      <div className="App">
        {db.tabla.map((obj)=>{
          return <DibujarMapa db={db} obj={obj}/>
        })}    
      </div>
    );
  }
}

export default App;
