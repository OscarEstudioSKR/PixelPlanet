
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
      'requisito': (ser)=>{ return ser.agotamiento >99 },
      'accion': 'Desvanecido',
      'efecto': 'Dormido'
    },
    {
      'requisito': (ser)=>{ return ser.agotamiento >75 },
      'accion': 'Agotado',
      'efecto': 'Dormido'
    }
  ],
  'listaMemorias': [
    {
      'id': 0,
      'detonante': "Agotado",
      'accion': "Yendo a dormir",
      'satisfaccionGeneral': 20,
      'satisfaccionEspecifica': [
        {
          'id': 0,
          'idPos': 503,
          'especifica': 100,
        }
      ],
      'origenDescubrimiento': 'Natal',
      'edadDescubrimiento': 0,
      'obtiene': (ser)=>{ return db.seres[ser.id].agotamiento = 5},
    }
  ]
}