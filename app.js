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
  noombre: String,
  posicion: String,
  nacionalidad: String,
  equipo: String
})

const JugadorModel = mongoose.model('jugadores', jugadorSchema)


// trayendo datos por peticiones de la API 

const maximun = 1;
const minimun = 20;
const random = () => Math.floor(Math.random()*(maximun - minimun)+ minimun);

  async function getJugadores() {
  try {
    const response = await axios.get(urlApi);

    const jugadoresArray = [];

    for (let i = 0; i < 4; i++){

      let jugadorNombre = await response.data.items[random()].name;
      let jugadorPosicion = await response.data.items[random()].position;
      let jugadorNacionalidad = await response.data.items[random()].nation.name;
      let jugadorEquipo = await response.data.items[random()].club.name;
      jugadoresArray.push([jugadorNombre, jugadorPosicion, jugadorNacionalidad, jugadorEquipo]);
    }
    console.log(jugadoresArray);
  } catch (error) {
    console.error(error);
  }
}


// trayendo datos quemados de la bd

const mostrar = async () =>  {

  const jugadores = await JugadorModel.find()
  console.log(jugadores)
  getJugadores()
}

mostrar();