import React, { Component } from 'react';


class DibujarMapa extends Component {
    constructor(props){
        super(props);

        this.state = {
            'obj': this.props.obj,
            'tabla': this.props.db.tabla,
            'tam': this.props.db.config.tamCasilla,
        }
    }

    render() {
        let styleCasilla = {
            'position': 'fixed',
            'left': this.state.obj.pos[0]*this.state.tam,
            'top': this.state.obj.pos[1]*this.state.tam,
            'height': this.state.tam,
            'width': this.state.tam,
            'background': this.state.obj.obstaculo ? 'gray' : 'white',
            'border': '1px solid gray',
        }

        return (
            <div style={styleCasilla}>
                <div>{this.state.obj.id}</div>
            </div>
        )
    }
  }
  
  export default DibujarMapa;