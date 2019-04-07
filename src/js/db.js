
export var db = 
{
  'config':{
    'numCasillas': 100,
    'tamCasilla': 80,
    'vista': 'verIdCasillas',  //VerPenalizacion - VerObstaculo - verIdCasillas
    'tablaVacia': {
      'id': 0,
      'pos': [0,0],
      'obstaculo': false,
      'penalizacionMov': 0,
      'imagenEncadenada': false,
      'imgSuelo': '',
      'posImg': [0,0],
    },
    'listaNombresF': ['Lara', 'Eva', 'Clara', 'Marta', 'Fatima', 'Anna', 'Lucia', 'Carmen'],
  },
  'tabla':[],
  'seres':[],

  'listaNecesidades': [
    {
      'requisito': (ser)=>{ return ser.agotamiento >75 },
      'accion': 'Agotado',
      'efecto': 'Dormido',
      'tiempoAccion': 100,
    }
  ],
  'listaMemorias': [
    {
      'id': 0,
      'nombre': 'Dormir en el suelo',
      'detonante': "Agotado",
      'accion': "Yendo a dormir",
      'satisfaccionGeneral': 5,
      'satisfaccionEspecifica': [
        {
          'id': 0,
          'idPos': 503,
          'especifica': 50,
        }
      ],
      'origenDescubrimiento': 'Natal',
      'edadDescubrimiento': 0,
      'obtiene': (ser)=>{ return db.seres[ser.id].agotamiento = 10},
    }
  ]
}