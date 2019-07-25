const mongoose = require('mongoose')

mongoose.connect('mongodb://personascrud:Ba43P7J~8?sU@den1.mongo1.gear.host:27001/personascrud',{useNewUrlParser:true}).then(_=>console.log('Base de datos conectada'));

module.exports= mongoose;