const { Router } = require('express');
const { Country, Activity } = require('../db.js');
const { Op } = require('sequelize');
const router = Router();



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



//esta funcion me va a traer la info de la DB
router.get('/countries', async (req, res, next) => {              
    const { name } = req.query;

    try{  
        if (name){
            let countryN = await Country.findAll({
                where: {
                    name: {                                     
                        [Op.iLike]: `%${name}%`  
                    }
                },
        });
        //si no encuentra el pais, manda un mensaje de error
       return countryN.length ? res.status(200).send(countryN) : res.status(404).send('No se encontró el país'); 
        }
        let allCountries = await Country.findAll({                  
            include: Activity
        });
        if(allCountries){
           return res.status(200).send(allCountries)
        }
       return res.status(404).send('No se encontró nada')

    
    }catch(err){
        next(err);
    }
});

router.post('/activities', async (req, res, next) => {
    const { name, difficulty, duration, season, countries } = req.body;  //recibo los datos del body
    try{
        if(!name || !difficulty || !duration || !season || !countries.length > 0){
            return res.status(400).send('Falta información');
        }
            let newActivity = await Activity.create({             //creo la actividad en la DB
                name,
                difficulty,
                duration,                                           //guardo los datos en la DB
                season
            });
            countries.forEach(async (country) => {
                let ActCountry = await Country.findOne({            //busco el pais en la DB
                    where: {
                        name: country 
                    } 
                });
                await newActivity.addCountry(ActCountry)
            });
            res.status(200).send('Actividad creada exitosamente'); //si todo sale bien, mando un mensaje de exito
    }catch(err){
        next(err) 
        res.status(400).send('No se pudo crear la actividad')                
    }
});  

// Ruta de detalle de país: debe contener

// [ ] Los campos mostrados en la ruta principal para cada país (imagen de la bandera, nombre, código de país de 3 letras y continente)
// [ ] Código de país de 3 letras (id)
// [ ] Capital
// [ ] Subregión
// [ ] Área (Mostrarla en km2 o millones de km2)
// [ ] Población
// [ ] Actividades turísticas con toda su información asociada

router.get('/countries/:id', async (req, res, next) => {    
    const { id } = req.params;
    try{
        if(id){
            let countryId = await Country.findByPk(id.toUpperCase(), {
                attributes:["id", "name" , "flag", "continent", "subregion", "capital", "area", "population"] , 
                include: Activity
            })
            return res.status(200).send(countryId)
        }
        return res.status(404).send('El id no es valido')
    }catch(err){
        next(err)
    }
});


router.get('/activities', async (req, res,next) =>{
    try{
        const activities = await Activity.findAll({
            include: Country
        });
        res.status(200).send(activities)
    }catch(error){
        next(error)
    }
})

           
 
module.exports = router;                                       