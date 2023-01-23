import React from 'react';
import { searchCountries } from '../../actions';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './SearchBar.module.css'


export default function SearchBar(){
    const dispatch = useDispatch()
    const[name, setName] = useState('')
    

    function handleInputChange(e){ //lo que entre al input se va guardando
        e.preventDefault() //el value del input va a tomar el value del state
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(searchCountries(name))//el name va a ser mi estado local -- lo que esta escribiendo el usuario
        setName('')
    }


    return(
        <header className={styles.header}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Mundo_hecho_de_Banderas.gif" alt="fuente" width="100px"/>
            <div className={styles.div}>
                <input className={styles.input} placeholder="Buscar..." value={name} onChange={(e) => handleInputChange(e)} type="text"/>
                <button className={styles.submit} type="submit" onClick={(e) => handleSubmit(e)}>Buscar</button>     
            </div>
            <div className={styles.countries}>
            <img src="https://fontmeme.com/permalink/221119/e0caa11a764533702e5d154541a69b59.png" alt="fuente-de-cuphead" border="0" className={styles.imgCountry}/>
            </div>
            <div>
                <Link to='/activities'>
                  <button className={styles.input1}>Crear Actividad</button>
                </Link>
            </div>
        </header>
    );
}