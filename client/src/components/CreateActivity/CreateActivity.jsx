import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {postActivity,getCountries,getActivity } from '../../actions/index'
import styles from './CreateActivity.module.css'

export default function CreateActivity(){
    const dispatch = useDispatch();
    const acts = useSelector((state) => state.activity);
    const countries = useSelector((state) => state.countries).sort((a, b) =>{
        if(a.name < b.name){
            return -1;
        }
        if(a.name > b.name){
            return 1;
        }
        return 0;
    });
const [errors, setErrors] = useState({});

function validate(input){
    let errors = {};

    if (!input.name){
        errors.name = 'Este campo es obligatorio.';
    }else if (!/^(?!.*[ ]{2})[a-zA-Z0-9._\s-#!~@%^()]+$/g.test(input.name)) {
        errors.name = 'Nombre inválido: Debería tener letras y/o numeros.';
    }
    if (!input.difficulty){
        errors.difficulty = 'Debe seleccionar el nivel de dificultad.';
    }else if(parseInt(input.difficulty) > 5 || parseInt(input.difficulty) < 1){
        errors.duration = 'El nivel de dificulad es inválido. Elija un numero del 1 al 5.';
    }
    if(!input.duration){
        errors.duration = 'Coloca duración de 24hs.';
    }else if(parseInt(input.duration) < 0 || parseInt(input.duration) > 24){
        errors.duration = 'Duración inválida. Debe ser de 1h a 24h.';
    }
    if (!input.season){
        errors.season  = 'Este campo es obligatorio';
    }else if (!["Verano", "Primavera", "Invierno", "Otoño"].includes(input.season)){
        errors.season = 'Debe incluir una Estación correcta.';
    }
    if (!input.countries.length){
        errors.countries = 'Debe seleccionar al menos un país.';
    } 
    setErrors(errors)
    return errors;
}

    const [input, setInput] = useState({
        name: "",
        difficulty:"",
        duration:"",
        season: "",
        countries: []
    })

    useEffect(()=>{
        dispatch(getCountries())
        dispatch(getActivity())
    },[dispatch]);


    function handleChange(e){
        const {name, value} = e.target;
        setInput({
            ...input,
            [name] : value
        })
        setErrors(validate({
            ...input,
            [name]: value
        }));
        console.log(input)
    }

    
    function handleSelect(e){
        setInput({
            ...input,
            countries: [...input.countries, e.target.value]
        })
    }

    function handleDelete(e){
        setInput({
            ...input,
            countries: input.countries.filter(c => c !== e) 
        })
    }

    function handleSubmit(e){
        if (input.countries.length <= 0 || !input.name || !input.difficulty || !input.duration || !input.season){
            e.preventDefault();
            alert('Debe completar todos los campos.')
        }else if(acts.includes(input.name)){
            alert('Esta actividad ya ha sido creada.')
        }else{
            e.preventDefault();
            console.log(input);
            dispatch(postActivity(input))
            alert('¡La actividad se creó correctamente!')
            setInput({
                name: "",
                difficulty: "",
                duration: "",
                season: "",
                countries: [],
            }); 
        }
      
    }


    return(
        <div className={styles.all}>
             <h1 className={styles.create}>Crear actividad</h1>
                <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
                    <div className={styles.container}>
                        <label className={styles.labelName}>Nombre:</label>
                            <input type="text" className={styles.textInput} placeholder='Nombre' value={input.name} name="name" onChange={handleChange}/>
                        {errors.name && (<p className={styles.errors}>{errors.name}</p>)}
                    </div>
                    <div className={styles.container2}>
                        <label className={styles.labelName}>Dificultad:</label>
                             <div className={styles.circle}>
                                <label className={styles.labelName}>
                                    <input type="radio" className={styles.circle} value='1' name="difficulty" onChange={handleChange}/> 1
                                </label>
                                <label className={styles.labelName}>
                                    <input type="radio" className={styles.circle} value='2' name="difficulty" onChange={handleChange}/> 2
                                </label>
                                <label className={styles.labelName}>
                                    <input type="radio" className={styles.circle} value='3' name="difficulty" onChange={handleChange}/> 3
                                </label>
                                <label className={styles.labelName}>
                                    <input type="radio" className={styles.circle} value='4' name="difficulty" onChange={handleChange}/> 4
                                </label>
                                <label className={styles.labelName}>
                                    <input type="radio" className={styles.circle} value='5' name="difficulty" onChange={handleChange}/> 5
                                </label>
                             </div>
                    </div>
                    <div className={styles.container2}>
                         <label className={styles.labelName}>Duración:</label>
                            <div className={styles.circle}>
                              <input type="text" className={styles.texIinput} placeholder='Duración' value={input.duration} name="duration" onChange={handleChange}/>
                            {errors.duration && (<p className={styles.errors}>{errors.duration}</p>)}
                            </div>
                    </div>
                        <div className={styles.container2}>
                            <label className={styles.labelName}>Estación:</label>
                                 <div className={styles.circle}>
                                    <label className={styles.labelName}>
                                        <input type="radio" className={styles.circle} value='Verano' name="season" onChange={handleChange}/> Verano
                                    </label>
                                    <label className={styles.labelName}>
                                        <input type="radio" className={styles.circle} value='Primavera' name="season" onChange={handleChange}/> Primavera
                                    </label>
                                    <label className={styles.labelName}>
                                        <input type="radio" className={styles.circle} value='Invierno' name="season" onChange={handleChange}/> Invierno
                                    </label>
                                    <label className={styles.labelName}>
                                        <input type="radio" className={styles.circle} value='Otoño' name="season" onChange={handleChange}/> Otoño
                                    </label>
                                </div>   
                    </div>
                    <div className={styles.containe2}>
                        <label className={styles.labelName}>Paises: </label>
                            <select onChange={handleSelect} className={styles.select}>
                                <option className={styles.option} disabled>Selecciona Pais</option>
                                {countries.map((countries) =>(
                                    <option className={styles.option} key={countries.name} value={countries.name} onChange={handleChange}>{countries.name}</option>
                                ))}
                            </select>
                    </div>
                    <div className={styles.btnContainer}>
                        <div className={styles.loadContainer}>
                            <button className={styles.btnSubmit} type="submit">Crear Actividad</button>
                            <Link to='/home'>
                                <button className={styles.btnV}>Volver atras</button>
                            </Link>
                        </div>
                    </div>
            </form>
            <div className={styles.final}>
            {
                input.countries.map(e => {
                    return <div className={styles.miniCard}>
                                <div className={styles.containerCountry}>
                                <p className={styles.nameCountry}>{e}</p>
                                <button className={styles.btnDelete} onClick={() => handleDelete(e)}>X</button>
                                </div>
                           </div>
                })
            }
            </div>
        </div>
    )
}



