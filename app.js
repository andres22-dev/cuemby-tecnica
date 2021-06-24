const mongoose = require('mongoose');

const url = 'mongodb://localhost/cuemby';

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

const JugadorModel = mongoose.model('jugadores', jugadoresSchema)

// 

const mostrar = async () =>  {

  const jugadores = await PersonaModel.find()
  console.log(personas)
}

mostrar();