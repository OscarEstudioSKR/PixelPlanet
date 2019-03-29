import React, { Component } from 'react';
import './App.css';
import {iniciarCasillas} from './algorithmA.js';
import Casilla from './Casilla.js';
import Personaje from './Personaje.js';

var config = {
  'numCasillas': 30,
  'tamCasilla': 50
}

var casillas = iniciarCasillas(config.numCasillas);


class App extends Component {
  render() {
    return (
      <div className="App">
        {
          casillas.map((casilla)=>{
            return(
              <Casilla casilla={casilla} config={config} key= {'Casilla'+casilla.id} />
            )
          })
        }
        <Personaje casillas={casillas} config={config}/>
      </div>
    );
  }
}

export default App;
