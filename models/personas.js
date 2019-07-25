const mongoose = require('mongoose')

const PersonaSchema = new mongoose.Schema({
    nombre:{type:String, required:true},
    apellidos:{type:String, required:true},
    direccion:{type:String, required:true},
    sexo:{type:String, required:true},
    foto:{type:String, required:true}
})

module.exports = mongoose.model('personas', PersonaSchema)
