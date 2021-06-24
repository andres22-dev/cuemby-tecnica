const mongoose = require('mongoose');

const url = 'mongodb://localhost/cuemby';

mongoose.connect(url,{


})
.then( ()=> console.log('CONEXION VALIDA :D HAPPY CODING!!') );
.catch( ())