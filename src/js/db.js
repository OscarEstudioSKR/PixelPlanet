
export var db = 
{
  'config':{
    'numCasillas': 80,
    'tamCasilla': 80,
    'vista': '',  //VerPenalizacion - VerObstaculo - verIdCasillas
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
      'estado': 'Agotado',
      'accion': 'Agotado',
      'efecto': 'Dormido',
      'tiempoAccion': 50,
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
          'idPos': 33,
          'especifica': 50,
        }
      ],
      'origenDescubrimiento': 'Natal',
      'edadDescubrimiento': 0,
      'obtiene': (ser)=>{ return db.seres[ser.id].agotamiento = 10},
    }
  ]
}