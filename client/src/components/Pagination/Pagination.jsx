import React from 'react';
import styles from './Pagination.module.css';


export default function Pagination({allCountries, countriesPerPage, pagination}) {
    const pageNumbers = []

    for (let i=1; i<=Math.ceil(allCountries/countriesPerPage); i++){
    pageNumbers.push(i)
    }

  return (
    <nav className={styles.pageNumbers}>
        <ul className={styles.pagination}>
            { pageNumbers &&
             pageNumbers.map(number =>{
               return <li className={styles.numbers} key={number}>
                <a onClick={() => pagination(number)} className={styles.number}>{number}</a>
                </li>
              })
            }
        </ul>
    </nav>
  )
}
