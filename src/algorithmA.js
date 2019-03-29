
export function iniciarCasillas(numCasillas){

    var casillas = [];
    let id = 0;
    let obstaculo = false;
    
    for( let y = 0; y < numCasillas; y++){
        for( let x = 0; x < numCasillas; x++){
            if(Math.random()>0.7){obstaculo = true} else{obstaculo = false}
            casillas.push(
                {
                    "id": id,
                    "g": 0,
                    "h": 0,
                    "f": 0,
                    "pos": [x,y],
                    'obstaculo': obstaculo,
                    'dificultadPaso': 0,
                }
            );
            id++;
        }
    }
    return casillas;
    
}
