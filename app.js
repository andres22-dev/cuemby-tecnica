const mongoose = require('mongoose');
const axios = require('axios');
const url = 'mongodb://localhost/cuemby';
const urlApi = "https://www.easports.com/fifa/ultimate-team/api/fut/item";

mongoose.connect(url,{

  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true

})
.then( () => console.log('CONEXION VALIDA :D HAPPY CODING!!') )
.catch( (e) => console.log('El error de conexion es : '+e))

//Creando schema


const jugadorSchema = mongoose.Schema({
  nombre: String,
  posicion: String,
  nacionalidad: String,
  equipo: String
}, {versionKey: false})

const JugadorModel = mongoose.model('jugadores', jugadorSchema)


// trayendo datos por peticiones de la API 

const maximun = 1;
const minimun = 20;
const minimun2 = 4;
const random = () => Math.floor(Math.random()*(maximun - minimun)+ minimun);
const random2 = () => Math.floor(Math.random()*(maximun - minimun2)+ minimun2);

  async function getJugadores() {
  try {
    const response = await axios.get(urlApi);

    const jugadoresArray = [];

    for (let i = 0; i < 4; i++){

      let jugadorNombre = await response.data.items[random()].name;
      let jugadorPosicion = await response.data.items[random()].position;
      let jugadorNacionalidad = await response.data.items[random()].nation.name;
      let jugadorEquipo = await response.data.items[random()].club.name;
      jugadoresArray.push({nombre: jugadorNombre, posicion: jugadorPosicion, nacionalidad: jugadorNacionalidad, equipo: jugadorEquipo});
    }
    return jugadoresArray[random2()];
  } catch (error) {
    console.error(error);
  }
}

// Obteniendo id del jugador 


// trayendo datos quemados de la bd

const mostrar = async () =>  {

  const jugadores = await JugadorModel.find();
  console.log(jugadores);
  console.log('Consulta de jugadores fue exitosa !!');
}

//creando jugadores 

const crear = async () => {

  const datosJugador = await getJugadores()
  const jugador = new JugadorModel(datosJugador)
  const resultado = await jugador.save()
  console.log(resultado)
  console.log('Has creado un nuevo jugador :D!')
}

//Actualizar jugadores

const actualizar = async () => {
  const persona = await JugadorModel.updateOne({_id:id},
  {
    $set: await getJugadores()
  })

  console.log('Has actualizado a el jugador :D!, el id es');
}
//mostrar();
//crear();
actualizar();