const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/personas',{useNewUrlParser:true}).then(_=>console.log('Base de datos conectada'));

module.exports= mongoose;