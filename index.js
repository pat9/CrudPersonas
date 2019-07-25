const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer')

require('./models/dbconexion')
app.set('PORT', process.env.PORT || 3000)
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended:false}))
app.set('view engine', 'pug')

const storage = multer.diskStorage({
    destination:path.join(__dirname,'public/img'),
    filename:(req,file,callback) =>{
        callback(null, path.basename(file.originalname))
    }
})
const upload = multer({storage})

const Personas=require('./models/personas')

app.get('/', async(req, res) =>{
    const personas = await Personas.find();
    res.render('Index',{personas})
})

app.get('/Nuevo', async(req, res) =>{
    res.render('Nuevo')
})

app.post('/Nuevo',upload.single('foto'), async(req, res) =>{
    const {nombre,apellidos,direccion,sexo} = req.body
    const Persona = new Personas({nombre, apellidos, direccion, sexo, foto:req.file.filename})
    await Persona.save();
    res.redirect('/')
})

app.get('/Editar/:id', async(req, res) =>{
    const persona = await Personas.findById(req.params.id)
    res.render('Editar',{persona})
})

app.post('/Editar/:id',upload.single('foto'), async(req, res)=>{
    const {nombre,apellidos,direccion,sexo} = req.body

    if(req.file){
        await Personas.updateOne({_id:req.params.id},{nombre, apellidos, direccion,sexo, foto:req.file.filename})
    }else{
        await Personas.updateOne({_id:req.params.id},{nombre, apellidos, direccion,sexo})
    }

    res.redirect('/')
})

app.get('/Eliminar/:id', async(req, res)=>{
    await Personas.deleteOne({_id:req.params.id})
    res.redirect('/')
})


app.listen(app.get('PORT'), ()=> console.log('Servidor corriendo en el puerto 3000'))