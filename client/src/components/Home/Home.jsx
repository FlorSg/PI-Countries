import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { byContinent, byPopulation, byOrder, byActivity, getActivity, getCountries } from '../../actions/index';
import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination'
import styles from './Home.module.css'



export default function Home(){
const dispatch = useDispatch()
const allCountries = useSelector((state) => state.countries);
const allActivities = useSelector((state)=> state.activity)

const activities = [];
allActivities.map(a => !activities.includes(a.name) && activities.push(a.name));

const [currentPage, setCurrentPage] = useState(1);
const [countriesPerPage] = useState(10);
const indexOfLastCountry = currentPage * countriesPerPage;
const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry);

const pagination = (pageNumbber) => {
    setCurrentPage(pageNumbber);
}

useEffect (() =>{
    dispatch(getCountries())
    dispatch(getActivity())
},[dispatch])

function handlerByOrder(e){
    dispatch(byOrder(e.target.value))
  }

  function handlerByContinent(e){
    dispatch(byContinent(e.target.value))
  }

  function handlerByPopulation(e){
    dispatch(byPopulation(e.target.value))
  }

  function handlerByActivity(e){
    dispatch(byActivity(e.target.value))
  }

     return (
        <div>
            <div className={styles.containerFilters}>
                <select onChange={(e) => handlerByOrder(e)} className={styles.select}>
                    <option className={styles.option} disabled>Nombre</option>
                    <option value='asc' className={styles.option}>A-Z</option>
                    <option value='desc' className={styles.option}>Z-A</option>
                </select>
                <select onChange={(e) => handlerByContinent(e)} className={styles.select}>
                    <option value='All' className={styles.option} disabled>Continentes</option>
                    <option value='Asia' className={styles.option}>Ásia</option>
                    <option value='Africa' className={styles.option}>África</option>
                    <option value='Americas' className={styles.option}>Américas</option>
                    <option value='Antarctic' className={styles.option}>Antartic</option>
                    <option value='Europe' className={styles.option}>Europe</option>
                    <option value='Oceania' className={styles.option}>Oceanía</option>
                 </select>
                <select onChange={(e) => handlerByPopulation(e)} className={styles.select}>
                    <option className={styles.option} disabled>Poblacion</option>
                    <option value='Max' className={styles.option}>Mayor poblacion</option>
                    <option value='Min' className={styles.option}>Menor poblacion</option>
                </select>       
                <select onChange={(e) => handlerByActivity(e)} name='' className={styles.select}>
                    <option value='All' disabled>Todas las actividades</option>
                    {activities && activities.map((activity) =>(
                    <option value={activity} key={activity}>{activity}</option>
                    ))}
                </select> 
                </div>
                        <div>
                        <Pagination countriesPerPage= {countriesPerPage} allCountries={allCountries.length} pagination = {pagination}/>
                        </div>
                        <div className={styles.container}>
                            <div className={styles.cards}>
                            {
                            currentCountries && currentCountries.map(e =>{
                                return <Card key={e.id} id={e.id} name={e.name} flag={e.flag} continent={e.continent}/>
                                })
                            }
                            </div>
                        </div>
                </div>
     );
 }